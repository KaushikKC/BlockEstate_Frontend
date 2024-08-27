import Link from "next/link";
import React from "react";
import Navbar from "../../components/Navbar";

function IdentityVerificationForm() {
  return (
    <div className="font-montserrat bg-[#11111C]">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen mt-[30px]">
        <div className="bg-gray-800 text-white p-10 rounded-lg shadow-md max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">You are almost there!</h1>
          <p className="text-gray-400 mb-8">
            To start buying, selling and leasing on BlockEstate, you will need
            to create an account and verify your document for compliance.
          </p>

          <div className="relative flex items-center mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#96EA63] to-white rounded-md p-[2px]"></div>
            <div className="relative flex items-center space-x-0.5 bg-white rounded-md">
              <button className="text-gray-700 py-2 px-4 rounded-l-md font-medium">
                Create account
              </button>
              <button className="text-black py-2 px-4 font-medium">
                Verify Identity
              </button>
              <button className="text-gray-700 py-2 px-4 rounded-r-md font-medium">
                Connect Wallet
              </button>
            </div>
          </div>

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
                  className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                  placeholder="E.g India"
                />
              </div>
              <div>
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Street Address
                </label>
                <input
                  id="address"
                  type="text"
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
                  className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                  placeholder="E.g Lagos"
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
                  htmlFor="issue-country"
                >
                  Issuing Country
                </label>
                <input
                  id="issue-country"
                  type="text"
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
                  className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                >
                  <option>Select document</option>
                  <option>Aadhar</option>
                  <option>PAN</option>
                  <option>Licence</option>
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
              <div className="border border-[#96EA63] p-4 rounded-md flex items-center justify-center w-[500px]">
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

          <div className="flex justify-center">
            <Link
              href="/connect-wallet"
              className="bg-[#96EA63] text-black py-2 px-4 rounded-md font-medium hover:bg-[#86d456] focus:outline-none focus:ring-2 focus:ring-[#96EA63] "
              type="submit"
            >
              Submit Information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentityVerificationForm;
