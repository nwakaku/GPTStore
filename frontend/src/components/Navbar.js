import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {


  return (
    <nav className="bg-gradient-to-r from-purple-800 via-black to-white text-white shadow-lg">
      <div className="container mx-auto py-4 flex justify-between">
        <a href="/" className="text-3xl text-white font-bold">GPTMarket</a>

        <ul className="flex space-x-4">
         
            <>
              <li><a href="/dashboard" className="text-white hover:bg-white hover:text-black mt-2 px-4 py-2 rounded">Dashboard</a></li>
              <li><a href="/marketplace" className="text-white hover:bg-white hover:text-black px-4 py-2 rounded">Marketplace</a></li>
            </>
          <li>
          <ConnectButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
