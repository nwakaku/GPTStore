import React, { createContext, useContext } from 'react';
import { getContract, getWalletClient } from '@wagmi/core';
import contractStuff from "../../contract/contract.json";

// Create a context with default values
const ContractContext = createContext({
  contractAbi: [],
  contractAddress: '',
  contract: null,
});

// Custom hook to use the context
export const useContract = () => useContext(ContractContext);

// Context provider component
export const ContractProvider = ({ children }) => {
  const contractAbi = contractStuff;
  const contractAddress = "0xD53820D58F7363614ee9D7c253a8Dda3f195A8E9";
  const walletClient = getWalletClient();

  // Create the contract instance
  const contract = getContract({
    address: contractAddress,
    abi: contractAbi,
    walletClient,
  });

  // Create the context value
  const contextValue = {
    contractAbi,
    contractAddress,
    contract,
  };

  return (
    <ContractContext.Provider value={contextValue}>
      {children}
    </ContractContext.Provider>
  );
};
