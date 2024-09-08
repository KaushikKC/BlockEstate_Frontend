/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { properties } from "../../../data/Properties";
import Navbar from "../../../components/Navbar";
import { makeEthereumSigner } from "@web3auth/mpc-core-kit";
import Web3 from "web3";
import { contractABI, contractAddress } from "../../../data/config";
import { ethers } from "ethers";
import axios from "axios";
import { useWallet } from "../../../context/WallectProvider";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { coreKitInstance, evmProvider } from "../../../config/coreKitConfig";

function BuyProperty() {
  const searchParams = useSearchParams();
  const tokenId = searchParams.get("id");
  const [tokensCount, setTokensCount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [property, setProperty] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [collateralAmount, setCollateralAmount] = useState(0);
  const [leaseDurationInDays, setLeaseDurationInDays] = useState(0);
  const { walletAddress } = useWallet();
  const router = useRouter();

  evmProvider.setupProvider(makeEthereumSigner(coreKitInstance));
  const web3 = new Web3(evmProvider);
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const handleTokensChange = (e: { target: { value: any } }) => {
    const count = Number(e.target.value);
    const tokenPrice = String(property.tokenPrice || "0"); // Ensure tokenPrice is a string
    const formattedTokenPrice = parseFloat(
      tokenPrice.replace(/[^0-9.-]+/g, "")
    );
    const collateralAmount = totalInvestment * 0.5;
    setTokensCount(count);
    setTotalInvestment(count * formattedTokenPrice);
    const adjustedInvestment = totalInvestment.toString() + "0";
    console.log("Collateral", ethers.parseEther(collateralAmount.toString()));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    calculateLeaseDuration(e.target.value, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    calculateLeaseDuration(startDate, e.target.value);
  };

  const calculateLeaseDuration = (start: string, end: string) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const days = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
      setLeaseDurationInDays(days);
    } else {
      setLeaseDurationInDays(0);
    }
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(
          `https://block-estate-backend.vercel.app/api/land/lands/${tokenId}`
        );
        const data = await response.json();
        setProperty(data);
        if (data.propertyType == "Buy") {
          setPropertyType("Buy");
        } else if (data.propertyType == "Lease") {
          setPropertyType("Lease");
        } else {
          setPropertyType("Both");
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    if (tokenId) {
      fetchPropertyDetails();
    }
  }, [tokenId]);

  const [propertyType, setPropertyType] = useState("");

  const handlePropertyTypeChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPropertyType(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let adjustedInvestment: ethers.BigNumberish;

    try {
      if (propertyType === "Buy") {
        adjustedInvestment = Number(totalInvestment.toString() + "0");
        const transaction = await contract.methods
          .buyLandShares(property.tokenId, tokensCount)
          .send({
            from: walletAddress,
            value: ethers
              .parseUnits(adjustedInvestment.toString(), "gwei")
              .toString(),
          });

        toast.success("Property bought successfully!"); // Success toast
        await axios.post(
          "https://block-estate-backend.vercel.app/api/land/buy",
          {
            landId: property.tokenId,
            buyerId: walletAddress, // replace with actual buyer ID
            tokenCount: tokensCount,
          }
        );
        router.push("/marketplace");
      } else if (propertyType === "Lease") {
        const collateralAmount = (totalInvestment * 0.5).toString();

        // Calculate total lease amount based on lease duration
        const totalLeaseAmount = ethers.parseUnits(
          (property.leaseAmount * tokensCount * leaseDurationInDays).toString(),
          "gwei"
        );
        // Adjusted investment includes total lease amount + collateral
        adjustedInvestment =
          ethers.parseUnits(collateralAmount, "gwei") + totalLeaseAmount;
        adjustedInvestment = Number(adjustedInvestment.toString() + "0");
        const transaction = await contract.methods
          .leaseLandShares(
            property.tokenId,
            tokensCount,
            leaseDurationInDays,
            collateralAmount
          )
          .send({
            from: walletAddress,
            value: adjustedInvestment.toString(),
          });

        toast.success("Property leased successfully!"); // Success toast
        await axios.post(
          "https://block-estate-backend.vercel.app/api/land/lease",
          {
            landId: property.tokenId,
            tokenCount: tokensCount,
            leaseDuration: leaseDurationInDays,
          }
        );
        router.push("/marketplace");
      }
    } catch (error) {
      toast.error("Error processing transaction!"); // Error toast
      console.error("Error processing transaction:", error);
    }
  };

  return (
    <div className="font-montserrat bg-[#11111C]">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-800 text-white p-10 rounded-lg shadow-md max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">Buy this Property</h1>

          <form onSubmit={handleSubmit}>
            {propertyType === "Both" && (
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
                  <option value="">Select Buying Type</option>
                  <option value="Buy">Buy</option>
                  <option value="Lease">Lease</option>
                </select>
              </div>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="tokens"
              >
                Tokens Count (Shares)
              </label>
              <input
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                id="tokens"
                type="number"
                value={tokensCount}
                onChange={handleTokensChange}
                placeholder="Enter Tokens"
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
                value={
                  property
                    ? `$${parseFloat(String(property.tokenPrice || "0").replace(/[^0-9.-]+/g, "")).toFixed(2)}`
                    : ""
                }
                readOnly
                placeholder="Token Price"
                disabled={propertyType === "Lease"}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="total-investment"
              >
                Total Investment
              </label>
              <input
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                id="total-investment"
                type="text"
                value={`$${totalInvestment.toFixed(2)}`}
                readOnly
                placeholder="Total Investment"
              />
            </div>

            {propertyType === "Lease" && (
              <>
                <div className="mb-4">
                  <label
                    className="block text-gray-400 text-sm font-bold mb-2"
                    htmlFor="lease-price"
                  >
                    Lease Price
                  </label>
                  <input
                    className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                    id="lease-price"
                    type="text"
                    value={`$${parseFloat(
                      (property.leasePrice || "0").replace(/[^0-9.-]+/g, "")
                    ).toFixed(2)}`}
                    readOnly
                    placeholder="Lease Price"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-400 text-sm font-bold mb-2"
                    htmlFor="start-date"
                  >
                    Start Date
                  </label>
                  <input
                    className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-400 text-sm font-bold mb-2"
                    htmlFor="end-date"
                  >
                    End Date
                  </label>
                  <input
                    className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-400 text-sm font-bold mb-2"
                    htmlFor="collateral-amount"
                  >
                    Collateral Amount
                  </label>
                  <input
                    className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                    id="collateral-amount"
                    type="number"
                    value={collateralAmount.toFixed(2)}
                    readOnly
                  />
                </div>
              </>
            )}

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

export default BuyProperty;
