/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { useWallet } from "../../context/WallectProvider";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Web3 from "web3";
import { parseToken } from "@web3auth/mpc-core-kit";
import Link from "next/link";
import { coreKitInstance, evmProvider } from "../../config/coreKitConfig";

const firebaseConfig = {
  apiKey: "AIzaSyB0nd9YsPLu-tpdCrsXn8wgsWVAiYEpQ_E",
  authDomain: "web3auth-oauth-logins.firebaseapp.com",
  projectId: "web3auth-oauth-logins",
  storageBucket: "web3auth-oauth-logins.appspot.com",
  messagingSenderId: "461819774167",
  appId: "1:461819774167:web:e74addfb6cc88f3b5b9c92",
};

function ConnectWallet() {
  const [coreKitStatus, setCoreKitStatus] = useState("NOT_INITIALIZED");
  const { walletAddress, setWalletAddress } = useWallet();
  const router = useRouter();

  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    const init = async () => {
      await coreKitInstance.init();
      setCoreKitStatus(coreKitInstance.status);
    };
    init();
  }, []);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);
    return res;
  };

  const login = async () => {
    try {
      const loginRes = await signInWithGoogle();
      const idToken = await loginRes.user.getIdToken(true);
      const parsedToken = parseToken(idToken);

      const idTokenLoginParams = {
        verifier: "w3a-sfa-web-demo",
        verifierId: parsedToken.user_id,
        idToken,
      };

      await coreKitInstance.loginWithJWT(idTokenLoginParams);

      if (coreKitInstance.status === "LOGGED_IN") {
        await coreKitInstance.commitChanges();
        const web3 = new Web3(evmProvider);
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];

        setWalletAddress(address);
        router.push("/id-verify");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="font-montserrat bg-[#11111C]">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-800 text-white p-10 rounded-lg shadow-md max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">Let's get you started</h1>
          <p className="text-gray-400 mb-8">
            To start buying, selling, and leasing on BlockEstate, you will need
            to create an account and verify your document for compliance.
          </p>

          <div className="relative flex items-center mb-8 justify-center">
            <div className="relative flex items-center space-x-0.5 bg-white rounded-md">
              <button
                onClick={login}
                className="text-black py-2 px-4 rounded-r-md font-medium"
              >
                Connect Wallet
              </button>
              <Link
                href="/id-verify"
                className="text-gray-700 py-2 px-4 font-medium"
              >
                Verify Identity
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={login}
              className="bg-[#96EA63] text-black py-2 px-4 rounded-md font-medium hover:bg-[#86d456] focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
            >
              Connect Wallet
            </button>
          </div>

          {walletAddress && (
            <div className="mt-8 text-center">
              <p className="text-xl">Connected Wallet Address:</p>
              <p className="text-[#96EA63] break-words">{walletAddress}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet;
