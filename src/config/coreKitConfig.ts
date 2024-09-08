// coreKitConfig.ts
"use client";
import { Web3AuthMPCCoreKit, makeEthereumSigner } from "@web3auth/mpc-core-kit";
import { EthereumSigningProvider } from "@web3auth/ethereum-mpc-provider";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { tssLib } from "@toruslabs/tss-dkls-lib";

const web3AuthClientId =
  "BCibJ22kQqPF8mBQvdkMuHQ96gVJyKHG5wrOoWBGoLHcxEXHJs9SHLq56gri8-zp22WH5Q66EHaOgPQkZPQJsFs";
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x128",
  rpcTarget: "https://testnet.hashio.io/api",
  displayName: "Hedera Testnet",
  blockExplorerUrl: "https://hashscan.io/testnet/",
  ticker: "HBAR",
  tickerName: "HBAR",
  logo: "https://cryptologos.cc/logos/hedera-hbar-logo.png?v=033",
};

export const coreKitInstance = new Web3AuthMPCCoreKit({
  web3AuthClientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  storage: window.localStorage,
  manualSync: true,
  tssLib: tssLib,
});

export const evmProvider = new EthereumSigningProvider({
  config: { chainConfig },
});

evmProvider.setupProvider(makeEthereumSigner(coreKitInstance));
