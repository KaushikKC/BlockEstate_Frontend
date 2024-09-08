"use client";

import Link from "next/link";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useWallet } from "../../context/WallectProvider";
import { makeEthereumSigner } from "@web3auth/mpc-core-kit";
import Web3 from "web3";
import { contractABI, contractAddress } from "../../data/config";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { coreKitInstance, evmProvider } from "../../config/coreKitConfig";

interface PropertyPayload {
  propertyName: string;
  propertyAddress: string;
  propertyTokens: string;
  tokenPrice: string;
  propertyType: string;
  propertyArea: string;
  ownerId: string;
  tokenId: string;
  leaseAmount?: string; // Optional field
  images: string[]; // Array of image URLs
  documentUrl: string; // Single document URL
}

function SellProperty() {
  const [propertyType, setPropertyType] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [tokens, setTokens] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [area, setArea] = useState("");
  const [leaseAmount, setLeaseAmount] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const { walletAddress } = useWallet();
  const [landDocument, setLandDocument] = useState<File | null>(null);

  const handlePropertyTypeChange = (e) => setPropertyType(e.target.value);
  const handlePropertyNameChange = (e) => setPropertyName(e.target.value);
  const handlePropertyAddressChange = (e) => setPropertyAddress(e.target.value);
  const handleTokensChange = (e) => setTokens(e.target.value);
  const handleTokenPriceChange = (e) => setTokenPrice(e.target.value);
  const handleAreaChange = (e) => setArea(e.target.value);
  const handleLeaseChange = (e) => setLeaseAmount(e.target.value);
  const handleImageChange = (e) => setImages(Array.from(e.target.files));
  const handleLandDocumentChange = (e) => setLandDocument(e.target.files[0]);

  const uploadImagesToCloudinary = async () => {
    const uploadedImages = [];

    toast.info("Uploading images...");
    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ml_default");
      formData.append("cloud_name", "dv0frgqvj");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dv0frgqvj/image/upload`,
          formData
        );
        uploadedImages.push(response.data.secure_url);
      } catch (error) {
        toast.error("Image upload failed!");
        console.error("Image upload failed:", error);
      }
    }

    let landDocumentUrl = null;
    if (landDocument) {
      toast.info("Uploading land document...");
      const formData = new FormData();
      formData.append("file", landDocument);
      formData.append("upload_preset", "ml_default");
      formData.append("cloud_name", "dv0frgqvj");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dv0frgqvj/image/upload`,
          formData
        );
        landDocumentUrl = response.data.secure_url;
      } catch (error) {
        toast.error("Land document upload failed!");
        console.error("Land document upload failed:", error);
      }
    }

    toast.success("Upload successful!");
    return { uploadedImages, landDocumentUrl };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { uploadedImages, landDocumentUrl } =
        await uploadImagesToCloudinary();
      evmProvider.setupProvider(makeEthereumSigner(coreKitInstance));
      const web3 = new Web3(evmProvider);
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      const receipt = await contract.methods
        .sellProperty(
          propertyType,
          propertyName,
          propertyAddress,
          area,
          tokens,
          tokenPrice,
          uploadedImages
        )
        .send({ from: (await web3.eth.getAccounts())[0] });

      const tokenId = receipt.events.Transfer.returnValues.tokenId.toString();

      const payload: PropertyPayload = {
        propertyName,
        propertyAddress,
        propertyTokens: tokens,
        tokenPrice,
        propertyType,
        propertyArea: area,
        ownerId: walletAddress,
        tokenId,
        images: uploadedImages,
        documentUrl: landDocumentUrl,
      };

      if (propertyType === "Lease" || propertyType === "Both") {
        payload.leaseAmount = leaseAmount;

        await contract.methods
          .setForLease(tokenId, leaseAmount, 30)
          .send({ from: walletAddress });
      }

      const response = await axios.post(
        "https://block-estate-backend.vercel.app/api/land/sell",
        payload
      );

      if (response.status === 200) {
        toast.success("Property saved successfully!");
        console.log("Property saved:", response);
      } else {
        toast.error("Failed to save property!");
        console.error("Failed to save property:", response);
      }
    } catch (error) {
      toast.error("Error selling property!");
      console.error("Error selling property:", error);
    }
  };

  return (
    <div className="font-montserrat bg-[#11111C]">
      <ToastContainer />
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
            <div className="mt-6 text-gray-400">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="images"
              >
                Upload Photos
              </label>
              <p className="mb-2">Take a photo of your document:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>The document should be clear</li>
                <li>All corners must be visible</li>
              </ul>

              <div className="mt-6 text-gray-400">
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="images"
                >
                  Upload Property Images
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  onChange={handleImageChange}
                  className="mt-2 block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-[#212429]
      hover:file:bg-gray-200"
                />
              </div>

              <div className="mt-6 text-gray-400">
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="land-document"
                >
                  Upload Land Document (Proof of Ownership)
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleLandDocumentChange}
                  className="mt-2 block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-[#212429]
      hover:file:bg-gray-200"
                />
              </div>
            </div>
            {(propertyType === "Lease" || propertyType === "Both") && (
              <div className="mb-4">
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="token-price"
                >
                  Lease Price
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                  id="lease-price"
                  type="number"
                  placeholder="Enter Lease Price"
                  onChange={handleLeaseChange}
                />
              </div>
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

export default SellProperty;
