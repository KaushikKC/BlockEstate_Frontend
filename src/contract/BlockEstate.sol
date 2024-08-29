// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LandManagement is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct LandToken {
        string name;
        string propertyType; // Buy, Lease, Both
        string propertyAddress;
        uint256 area;
        string[] images;
        address owner;
        uint256 totalShares;
        uint256 sharesAvailable;
        uint256 pricePerShare;
        bool forSale;
        bool forLease;
        uint256 leasePricePerSharePerDay;
        uint256 leaseDuration; // in days
    }

    mapping(uint256 => LandToken) public landTokens;
    mapping(uint256 => mapping(address => uint256)) public landShares; // tokenId => (owner => shares)

    struct Lease {
        address lessee;
        uint256 sharesLeased;
        uint256 start;
        uint256 end;
        uint256 collateral;
        bool active;
    }

    mapping(uint256 => Lease) public leases;

    constructor() ERC721("LandManagementToken", "LMT") Ownable(msg.sender) {}

    // Sell property and mint the land token with property details
    function sellProperty(
        string memory _propertyType,
        string memory _name,
        string memory _propertyAddress,
        uint256 _area,
        uint256 _totalShares,
        uint256 _pricePerShare,
        string[] memory _images
    ) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);

        landTokens[tokenId] = LandToken({
            propertyType: _propertyType,
            name: _name,
            propertyAddress: _propertyAddress,
            area: _area,
            images: _images,
            owner: msg.sender,
            totalShares: _totalShares,
            sharesAvailable: _totalShares,
            pricePerShare: _pricePerShare,
            forSale: true,
            forLease: false,
            leasePricePerSharePerDay: 0,
            leaseDuration: 0
        });

        // Initially, the landowner owns all shares
        landShares[tokenId][msg.sender] = _totalShares;
    }

    // Buy shares of land
    function buyLandShares(uint256 tokenId, uint256 sharesToBuy) public payable {
        require(landTokens[tokenId].forSale, "This land is not for sale.");
        require(sharesToBuy <= landTokens[tokenId].sharesAvailable, "Not enough shares available.");
        require(msg.value >= sharesToBuy * landTokens[tokenId].pricePerShare, "Insufficient funds.");

        // Transfer ownership of the shares to the buyer
        landShares[tokenId][msg.sender] += sharesToBuy;
        landShares[tokenId][landTokens[tokenId].owner] -= sharesToBuy;

        // Transfer payment to the original landowner
        payable(landTokens[tokenId].owner).transfer(msg.value);

        // Update available shares
        landTokens[tokenId].sharesAvailable -= sharesToBuy;

        // If all shares are sold, mark as no longer for sale
        if (landTokens[tokenId].sharesAvailable == 0) {
            landTokens[tokenId].forSale = false;
        }
    }

    // Lease shares of land based on duration and with collateral
    function leaseLandShares(uint256 tokenId, uint256 sharesToLease, uint256 leaseDurationInDays, uint256 collateralAmount) public payable {
        require(landTokens[tokenId].forLease, "Land is not available for lease.");
        require(sharesToLease <= landTokens[tokenId].sharesAvailable, "Not enough shares available to lease.");
        
        uint256 totalLeaseCost = landTokens[tokenId].leasePricePerSharePerDay * sharesToLease * leaseDurationInDays;
        require(msg.value >= totalLeaseCost + collateralAmount, "Insufficient funds for leasing.");

        // Record the lease with collateral
        leases[tokenId] = Lease({
            lessee: msg.sender,
            sharesLeased: sharesToLease,
            start: block.timestamp,
            end: block.timestamp + (leaseDurationInDays * 1 days),
            collateral: collateralAmount,
            active: true
        });

        // Transfer the lease payment to the landowner, but keep collateral in contract
        payable(landTokens[tokenId].owner).transfer(msg.value);

        landTokens[tokenId].sharesAvailable -= sharesToLease; // Update available shares
    }

    // Set the land for lease with price per share per day and lease duration
    function setForLease(uint256 tokenId, uint256 _leasePricePerSharePerDay, uint256 _leaseDuration) public {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can set the land for lease.");

        landTokens[tokenId].forLease = true;
        landTokens[tokenId].leasePricePerSharePerDay = _leasePricePerSharePerDay;
        landTokens[tokenId].leaseDuration = _leaseDuration;
    }

    // Stop leasing and make shares available again when the lease ends
    function checkLeaseExpiration(uint256 tokenId) public {
        require(leases[tokenId].active, "No active lease.");
        if (block.timestamp >= leases[tokenId].end) {
            leases[tokenId].active = false;
            landTokens[tokenId].sharesAvailable += leases[tokenId].sharesLeased; // Return leased shares
        }
    }

    // Retrieve land details
    function getLandDetails(uint256 tokenId) public view returns (LandToken memory) {
        return landTokens[tokenId];
    }
}
