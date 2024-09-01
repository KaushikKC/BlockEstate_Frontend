import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface WalletContextType {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
}

// Create the context with an initial value of undefined for both walletAddress and setWalletAddress
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Create a provider component
export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string>("");

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
}

// Create a hook to use the WalletContext
export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
