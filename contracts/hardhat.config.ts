import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const ACCOUNT_PRIVATE_KEY = "2681881ef2ddd24cd569a5e5df1f34ac3f765f37ad7cffce76a9a7ee3c1fe7b8"

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  paths: {
    artifacts: "./src",
},
networks: {
    zkEVM: {
    url: `https://rpc.public.zkevm-test.net`,
    accounts: [ACCOUNT_PRIVATE_KEY],
    },
},
};

export default config;
