import { createWalletClient, custom } from 'viem';
import { mainnet, polygonZkEvmTestnet } from 'viem/chains';
import contractStuff from "../../contract/contract.json";
// import { useState, createContext, useContext } from "react";

export const contractAbi = contractStuff;

export const contractAddress_ZKEvm = "0xcECC5592c69E4bb06deDCfe9c0C280B95Cb8E7D6";


// export const publicClient = createPublicClient({
//     chain: polygonZkEvmTestnet,
//     transport: http()
//   })
  
export const walletClient = createWalletClient({
    chain: polygonZkEvmTestnet,
    transport: custom(window.ethereum)
  })
  
  // JSON-RPC Account
// export const [account] = await walletClient.getAddresses()
