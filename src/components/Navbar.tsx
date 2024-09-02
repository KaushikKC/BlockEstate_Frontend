"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useWallet } from "../context/WallectProvider";
import { coreKitInstance, evmProvider } from "../app/connect-wallet/page";
import { makeEthereumSigner } from "@web3auth/mpc-core-kit";
import Web3 from "web3";

function Navbar() {
  const [isActive, setIsActive] = useState("");
  const [balance, setBalance] = useState(null);
  const { walletAddress } = useWallet();

  useEffect(() => {
    const fetchBalance = async () => {
      if (walletAddress) {
        evmProvider.setupProvider(makeEthereumSigner(coreKitInstance));
        const web3 = new Web3(evmProvider);
        try {
          const weiBalance = await web3.eth.getBalance(walletAddress); // Balance is in wei
          const ethBalance = web3.utils.fromWei(weiBalance, "ether"); // Convert to ether
          setBalance(ethBalance);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchBalance();
  }, [walletAddress]); // Trigger effect whenever walletAddress changes

  const handleActiveState = (type: string) => {
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
              href="/connect-wallet"
              onClick={() => handleActiveState("Get Started")}
              className={`${
                isActive === "Get Started"
                  ? "bg-[#86d456] text-[#11111C]"
                  : "text-[#11111C] bg-[#96EA63]"
              } hover:bg-[#86d456] px-4 py-2 rounded-md text-sm font-medium`}
            >
              Get Started
            </Link>
            {walletAddress && (
              <p className="text-gray-400">
                Wallet: {walletAddress} | Balance: {balance} ETH
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
