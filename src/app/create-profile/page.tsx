import Link from "next/link";
import React from "react";
import Navbar from "../../components/Navbar";

function createProfile() {
  return (
    <div className="font-montserrat bg-[#11111C]">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen ">
        <div className="bg-gray-800 text-white p-10 rounded-lg shadow-md max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">Let's get you started</h1>
          <p className="text-gray-400 mb-8">
            To start buying, selling and leasing on BlockEstate, you will need
            to create an account and verify your document for compliance.
          </p>

          <div className="relative flex items-center mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#96EA63] to-white rounded-md p-[2px]"></div>
            <div className="relative flex items-center space-x-0.5 bg-white rounded-md">
              <button className="text-black py-2 px-4 rounded-l-md font-medium">
                Create account
              </button>
              <button className="text-gray-700 py-2 px-4 font-medium">
                Verify Identity
              </button>
              <button className="text-gray-700 py-2 px-4 rounded-r-md font-medium">
                Connect Wallet
              </button>
            </div>
          </div>

          <form>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                id="fullName"
                type="text"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                id="email"
                type="email"
                placeholder="example@gmail.com"
              />
            </div>

            <div className="flex justify-center">
              <Link
                href="/id-verify"
                className="bg-[#96EA63] text-black py-2 px-4 rounded-md font-medium hover:bg-[#86d456] focus:outline-none focus:ring-2 focus:ring-[#96EA63] "
                type="submit"
              >
                Create an Account
              </Link>
            </div>
          </form>
          <Link href="/connect-wallet">
            <p className="mt-6 text-center text-gray-400">
              Already have an account?{" "}
              <a href="#" className="text-[#96EA63] underline">
                Login
              </a>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default createProfile;
