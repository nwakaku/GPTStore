import { http, createPublicClient, stringify } from 'viem'
import { mainnet, optimism, polygon, polygonZkEvmTestnet } from 'viem/chains'
import contractStuff from "../contract/contract.json";
// import { useState, createContext, useContext } from "react";

export const contractAbi = contractStuff;


export const contractAddress_ZKEvm = "0xcECC5592c69E4bb06deDCfe9c0C280B95Cb8E7D6";

const client = createPublicClient({ 
    chain: polygonZkEvmTestnet,
    transport: http()
  })

  const contract = getContract({
    address: contractAddress_ZKEvm,
    abi: contractStuff,
    client,
  })