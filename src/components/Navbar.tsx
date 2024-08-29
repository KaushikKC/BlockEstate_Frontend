"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const [isActive, setIsActive] = useState("");

  const handleActiveState = (type: React.SetStateAction<string>) => {
    setIsActive(type);
  };

  return (
    <div className="bg-[#11111C] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image src="/assets/logo1.png" height={50} width={200} alt="logo" />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              onClick={() => handleActiveState("Home")}
              className={`${
                isActive === "Home" ? "text-[#96EA63]" : "text-gray-400"
              } hover:text-[#96EA63] px-3 py-2 rounded-md text-md font-medium`}
            >
              Home
            </Link>
            <Link
              href="/marketplace"
              onClick={() => handleActiveState("Marketplace")}
              className={`${
                isActive === "Marketplace" ? "text-[#96EA63]" : "text-gray-400"
              } hover:text-[#96EA63] px-3 py-2 rounded-md text-md font-medium`}
            >
              Marketplace
            </Link>
            {/* <Link
              href="/buy-property"
              onClick={() => handleActiveState("Buy Property")}
              className={`${
                isActive === "Buy Property" ? "text-[#96EA63]" : "text-gray-400"
              } hover:text-[#96EA63] px-3 py-2 rounded-md text-md font-medium`}
            >
              Buy Property
            </Link> */}
            <Link
              href="/sell-property"
              onClick={() => handleActiveState("Sell Property")}
              className={`${
                isActive === "Sell Property"
                  ? "text-[#96EA63]"
                  : "text-gray-400"
              } hover:text-[#96EA63] px-3 py-2 rounded-md text-md font-medium`}
            >
              Sell Property
            </Link>
            <Link
              href="/create-profile"
              onClick={() => handleActiveState("Get Started")}
              className={`${
                isActive === "Get Started"
                  ? "bg-[#86d456] text-[#11111C]"
                  : "text-[#11111C] bg-[#96EA63]"
              } hover:bg-[#86d456] px-4 py-2 rounded-md text-sm font-medium`}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
