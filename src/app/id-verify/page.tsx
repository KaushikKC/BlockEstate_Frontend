"use client";
import Link from "next/link";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useWallet } from "../../context/WallectProvider";
import axios from "axios";
import { useRouter } from "next/navigation";

function IdentityVerificationForm() {
  const router = useRouter();
  const { walletAddress } = useWallet();
  const [formData, setFormData] = useState({
    country: "",
    streetAddress: "",
    state: "",
    postcode: "",
    issueCountry: "",
    documentType: "",
    documentFile: null,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documentFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taxResidency = {
      country: formData.country,
      streetAddress: formData.streetAddress,
      state: formData.state,
      postcode: formData.postcode,
    };

    const identityDocument = {
      issueCountry: formData.issueCountry,
      documentType: formData.documentType,
      // documentFile: formData.documentFile,
    };

    const data = {
      walletAddress,
      taxResidency,
      identityDocument,
    };

    try {
      // Make an API request to submit the data
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        data
      );
      router.push("/");
      alert("Information submitted successfully!");
    } catch (error) {
      console.error("Error submitting information:", error);
    }
  };

  return (
    <div className="font-montserrat bg-[#11111C]">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen mt-[30px]">
        <div className="bg-gray-800 text-white p-10 rounded-lg shadow-md max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">You are almost there!</h1>
          <p className="text-gray-400 mb-8">
            To start buying, selling, and leasing on BlockEstate, you will need
            to verify your document for compliance.
          </p>

          <div className="relative flex items-center mb-8 justify-center">
            <div className="relative flex items-center space-x-0.5 bg-white rounded-md">
              <Link
                href="/connect-wallet"
                className="text-black py-2 px-4 rounded-r-md font-medium"
              >
                {walletAddress ? "Wallet Connected" : "Connect Wallet"}
              </Link>
              <Link
                href="/id-verify"
                className="text-gray-700 py-2 px-4 font-medium"
              >
                Verify Identity
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Tax Residency Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-gray-400 text-sm font-bold mb-2"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                    placeholder="E.g India"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-400 text-sm font-bold mb-2"
                    htmlFor="streetAddress"
                  >
                    Street Address
                  </label>
                  <input
                    id="streetAddress"
                    type="text"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                    placeholder="Enter your address"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-400 text-sm font-bold mb-2"
                    htmlFor="state"
                  >
                    State / Province / Region
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                    placeholder="E.g California"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-400 text-sm font-bold mb-2"
                    htmlFor="postcode"
                  >
                    Postcode / Zip
                  </label>
                  <input
                    id="postcode"
                    type="text"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                    placeholder="Enter code"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Identity Document</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-gray-400 text-sm font-bold mb-2"
                    htmlFor="issueCountry"
                  >
                    Issuing Country
                  </label>
                  <input
                    id="issueCountry"
                    type="text"
                    value={formData.issueCountry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                    placeholder="Issuing Country"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-400 text-sm font-bold mb-2"
                    htmlFor="documentType"
                  >
                    Type of Document
                  </label>
                  <select
                    id="documentType"
                    value={formData.documentType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                  >
                    <option value="">Select document</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="PAN">PAN</option>
                    <option value="Licence">Licence</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 text-gray-400">
                <p className="mb-2">Take a photo of your document:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>The document should be clear</li>
                  <li>All corners must be visible</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="border border-[#96EA63] p-4 rounded-md flex items-center justify-center">
                  <button className="text-[#96EA63] flex flex-col items-center">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="mt-2 block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-[#212429]
                       hover:file:bg-gray-200"
                    />
                    <p className="mt-2">Upload Document</p>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-[#96EA63] text-black py-2 px-4 rounded-md font-medium hover:bg-[#86d456] focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                type="submit"
              >
                Submit Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IdentityVerificationForm;
