"use client";

import Link from "next/link";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";

function SellProperty() {
  const [propertyType, setPropertyType] = useState(""); // State to manage the selected property type

  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
  };

  return (
    <div className="font-montserrat bg-[#11111C]">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-800 text-white p-10 rounded-lg shadow-md max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">Sell your Property</h1>

          <form>
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
              />
            </div>

            {propertyType === "Rent" && (
              <div className="mt-6 text-gray-400">
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="collateral"
                >
                  Collateral
                </label>
                <p className="mb-2">Take a photo of your document:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>The document should be clear</li>
                  <li>All corners must be visible</li>
                </ul>

                <div className="grid grid-cols-1 gap-4 my-4">
                  <div className="border border-[#96EA63] p-4 rounded-md flex items-center justify-center">
                    <button className="text-[#96EA63] flex flex-col items-center">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
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
            )}

            <div className="flex justify-center">
              <Link
                href="/marketplace"
                className="bg-[#96EA63] text-black py-2 px-4 rounded-md font-medium hover:bg-[#86d456] focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                type="submit"
              >
                Submit
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellProperty;
