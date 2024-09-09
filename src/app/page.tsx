"use client";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

const clientId =
  "BNY58MKP_5LECFxClx-gwvMr-XPZKjLXtI6j1U8ZIRkeOpNcQtXXOGDv9t0ue-9ZkpdnrliuDhcmxPpdS3kWnbU";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Specify the font weights you need
});

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1",
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

function Page() {
  const [transactionType, setTransactionType] = useState("Buy");
  const [propertyToken, setPropertyToken] = useState("0");
  const [propertyType, setPropertyType] = useState("Land");
  const [priceRange, setPriceRange] = useState("Less than $200");

  const handleTransactionToggle = (type: React.SetStateAction<string>) => {
    setTransactionType(type);
  };
  return (
    <div className={montserrat.className}>
      <div className="bg-[#11111C] h-[1500px]">
        <Navbar />
        <div className="mx-[30px]">
          <div className="mx-[80px] my-[80px]">
            <p className="text-[70px] font-bold">
              <span className="text-[#96EA63]">Decentralized</span> Real Estate
            </p>
            <p className="text-[25px] font-small">
              Buy, Sell & Lease Real Estate with Web 3
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/assets/img1.png"
              width={1300}
              height={400}
              alt="display"
            />
          </div>
          <div className="flex justify-end mx-[230px]">
            <div className="bg-white text-[#11111C] p-[10px] flex items-center space-x-2 mx-[50px] m-[-25px]">
              <p className="text-[40px] font-bold">300+</p>
              <p className="font-medium w-[100px] font-[22px]">Property Sale</p>
              <p className="text-[40px] font-bold">550+</p>
              <p className="font-medium w-[100px] font-[22px]">Property Rent</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg max-w-4xl mx-auto mt-16">
          <div className="flex justify-between items-center">
            <div className="flex">
              <button
                onClick={() => handleTransactionToggle("Buy")}
                className={`px-8 py-2 text-lg font-semibold ${
                  transactionType === "Buy"
                    ? "bg-[#96EA63] text-[#11111C]"
                    : "bg-gray-100 text-gray-700"
                } rounded-tl-md rounded-bl-md border-r-2 border-[#96EA63]`}
              >
                Buy
              </button>
              <button
                onClick={() => handleTransactionToggle("Sell")}
                className={`px-8 py-2 text-lg font-semibold ${
                  transactionType === "Sell"
                    ? "bg-[#96EA63] text-[#11111C]"
                    : "bg-gray-100 text-gray-700"
                } rounded-tr-md rounded-br-md`}
              >
                Sell
              </button>
            </div>

            <div className="flex items-center space-x-8">
              <div>
                <label className="text-gray-500 block mb-1 font-semibold">
                  Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md text-gray-700"
                >
                  <option value="Land">Land</option>
                  <option value="Building">Building</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 block mb-1 font-semibold">
                  Tokens
                </label>
                <input
                  value={propertyToken}
                  onChange={(e) => setPropertyToken(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md text-gray-700 w-[100px]"
                ></input>
              </div>
              <div>
                <label className="text-gray-500 block mb-1 font-semibold">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md text-gray-700"
                >
                  <option value="$200">Less than $200</option>
                  <option value="$200 - $350">$200 - $350</option>
                  <option value="$350 - $500">$350 - $500</option>
                  <option value="$500 - $1000">$500 - $1000</option>
                  <option value="$1000+">$1000+</option>
                </select>
              </div>
            </div>

            <button className="px-6 py-2 bg-white text-[#96EA63] border-2 border-[#96EA63] font-semibold rounded-md hover:bg-[#96EA63] hover:text-[#11111C]">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
