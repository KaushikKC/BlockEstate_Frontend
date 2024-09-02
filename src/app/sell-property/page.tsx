"use client";

import Link from "next/link";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useWallet } from "../../context/WallectProvider";
import { coreKitInstance, evmProvider } from "../connect-wallet/page";
import { makeEthereumSigner } from "@web3auth/mpc-core-kit";
import Web3 from "web3";
import { contractABI, contractAddress } from "../../data/config";
import axios from "axios";

function SellProperty() {
  const [propertyType, setPropertyType] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [tokens, setTokens] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [area, setArea] = useState("");
  const [images, setImages] = useState([]); // Assuming you have a way to upload and set images
  const { walletAddress } = useWallet();

  const handlePropertyTypeChange = (e) => setPropertyType(e.target.value);
  const handlePropertyNameChange = (e) => setPropertyName(e.target.value);
  const handlePropertyAddressChange = (e) => setPropertyAddress(e.target.value);
  const handleTokensChange = (e) => setTokens(e.target.value);
  const handleTokenPriceChange = (e) => setTokenPrice(e.target.value);
  const handleAreaChange = (e) => setArea(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      evmProvider.setupProvider(makeEthereumSigner(coreKitInstance));
      const web3 = new Web3(evmProvider);
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log(
        propertyType,
        propertyName,
        propertyAddress,
        area,
        web3.utils.toWei(tokens, "ether"),
        web3.utils.toWei(tokenPrice, "ether")
      );
      const receipt = await contract.methods
        .sellProperty(
          propertyType,
          propertyName,
          propertyAddress,
          area,
          web3.utils.toWei(tokens, "ether"),
          web3.utils.toWei(tokenPrice, "ether"),
          images // This should be an array of image URLs or IPFS hashes
        )
        .send({ from: (await web3.eth.getAccounts())[0] });

      const tokenId = receipt.events.Transfer.returnValues.tokenId.toString();

      // Create the payload for the backend
      const payload = {
        propertyName: propertyName,
        propertyAddress: propertyAddress,
        propertyTokens: tokens,
        tokenPrice: tokenPrice,
        propertyType: propertyType,
        propertyArea: area,
        ownerId: walletAddress, // Assuming walletAddress is the owner's ID
        tokenId: tokenId,
      };

      // Send a POST request to the backend to store the property details
      const response = await axios.post(
        "http://localhost:3000/api/land/sell",
        payload
      );
      if (response) {
        console.log("Property saved:", response);
        // Redirect or show success message
      } else {
        console.error("Failed to save property:", response);
      }
    } catch (error) {
      console.error("Error selling property:", error);
    }
  };

  return (
    <div className="font-montserrat bg-[#11111C]">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-800 text-white p-10 rounded-lg shadow-md max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">Sell your Property</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="propertyType"
              >
                Property Type
              </label>
              <select
                id="propertyType"
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                value={propertyType}
                onChange={handlePropertyTypeChange}
              >
                <option value="">Select Property Type</option>
                <option value="Buy">Buy</option>
                <option value="Lease">Lease</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="propertyname"
              >
                Property Name
              </label>
              <input
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                id="propertyname"
                type="text"
                placeholder="Enter property name"
                value={propertyName}
                onChange={handlePropertyNameChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="property-address"
              >
                Property Address
              </label>
              <input
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                id="property-address"
                type="text"
                placeholder="Enter Address"
                value={propertyAddress}
                onChange={handlePropertyAddressChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="tokens"
              >
                Property Tokens (Shares)
              </label>
              <input
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                id="tokens"
                type="number"
                placeholder="Enter Tokens"
                value={tokens}
                onChange={handleTokensChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="token-price"
              >
                Token Price
              </label>
              <input
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                id="token-price"
                type="text"
                placeholder="Enter Token Price"
                value={tokenPrice}
                onChange={handleTokenPriceChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="area"
              >
                Property Area (in sq ft)
              </label>
              <input
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                id="area"
                type="text"
                placeholder="Area"
                value={area}
                onChange={handleAreaChange}
              />
            </div>
            {/* Add image upload handling here */}

            <div className="flex justify-center">
              <button
                className="bg-[#96EA63] text-black py-2 px-4 rounded-md font-medium hover:bg-[#86d456] focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellProperty;
