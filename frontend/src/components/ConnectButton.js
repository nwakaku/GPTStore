"use client"
// ConnectButton.js
import React, { useEffect, useState } from 'react';
import Onboard from "@web3-onboard/core";
import luksoModule from "@lukso/web3-onboard-config";
import injectedModule from '@web3-onboard/injected-wallets';

const ConnectButton = ({ onConnect }) => {
  const [onboard, setOnboard] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    const initOnboard = async () => {
      const lukso = luksoModule();

      const injected = injectedModule({
        custom: [lukso],
        sort: (wallets) => {
          const sorted = wallets.reduce((sorted, wallet) => {
            if (wallet.label === "Universal Profiles") {
              sorted.unshift(wallet);
            } else {
              sorted.push(wallet);
            }
            return sorted;
          }, []);
          return sorted;
        },
        displayUnavailable: ["Universal Profiles"],
      });

      const chains = [
        {
          id: 1,
          token: "LYXt",
          label: "LUKSO Testnet",
          rpcUrl: "https://rpc.testnet.lukso.gateway.fm/",
        },
      ];

      const appMetadata = {
        name: "LUKSO Test dApp",
        icon: '<svg></svg>',
        logo: '<svg></svg>',
        description: "My test dApp using Web3 Onboard",
        recommendedInjectedWallets: [
          {
            name: "Universal Profiles",
            url: "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
          },
        ],
      };

      const newOnboard = Onboard({
        wallets: [injected],
        chains,
        appMetadata,
        connect: {
          autoConnectLastWallet: true
        }
      });

      setOnboard(newOnboard);
    };

    initOnboard();
  }, []);

  const handleConnectWallet = async () => {
    if (onboard) {
      const connectedWallets = await onboard.connectWallet();
      setUserAddress(connectedWallets[0].accounts[0].address);
      onConnect(true);
    }
  };

  function shortenAddress(address) {
    if (address.length <= 6) {
      return address;
    }
  
    const prefix = address.slice(0, 3);
    const suffix = address.slice(-3);
  
    return `${prefix}...${suffix}`;
  }

  return (
    <div>
      <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md" onClick={handleConnectWallet}>
        {userAddress ? shortenAddress(userAddress) : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default ConnectButton;