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
  const contractAddress = "0x547C2F4d5153c17a98747628C1087C52f6322dFF";
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
