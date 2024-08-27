import Link from "next/link";
import React from "react";
import Navbar from "../../components/Navbar";

function connectWallet() {
  return (
    <div className="font-montserrat bg-[#11111C]">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen ">
        <div className="bg-gray-800 text-white p-10 rounded-lg shadow-md max-w-lg w-full">
          {/* Header */}
          <h1 className="text-3xl font-bold mb-4">Let's get you started</h1>
          <p className="text-gray-400 mb-8">
            To start buying, selling and leasing on BlockEstate, you will need
            to create an account and verify your document for compliance.
          </p>

          {/* <div className="flex items-center mb-8">
            <button className="bg-[#96EA63] text-black py-2 px-4 rounded-l-md font-medium">
              Create account
            </button>
            <button className="bg-[#96EA63] text-black py-2 px-4 font-medium">
              Verify Identity
            </button>
            <button className="bg-[#96EA63] text-black py-2 px-4 rounded-r-md font-medium">
              Connect Wallet
            </button>
          </div> */}
          <div className="relative flex items-center mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#96EA63] to-white rounded-md p-[2px]"></div>
            <div className="relative flex items-center space-x-0.5 bg-white rounded-md">
              <button className="text-gray-700 py-2 px-4 rounded-l-md font-medium">
                Create account
              </button>
              <button className="text-gray-700 py-2 px-4 font-medium">
                Verify Identity
              </button>
              <button className="text-black py-2 px-4 rounded-r-md font-medium">
                Connect Wallet
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              href="/"
              className="bg-[#96EA63] text-black py-2 px-4 rounded-md font-medium hover:bg-[#86d456] focus:outline-none focus:ring-2 focus:ring-[#96EA63] "
              type="submit"
            >
              Connect Wallet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connectWallet;
