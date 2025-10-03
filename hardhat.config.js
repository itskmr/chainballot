require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  defaultNetwork: "gai",

  networks: {
    hardhat: {
      chainId: 1337
    },
    gai: {
      url: "https://0x4e4542a6.rpc.aurora-cloud.dev",
      chainId: 1313161894,
      gasPrice: 1000000000,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "dummy_key_for_gai_network",
    customChains: [
      {
        network: "gai",
        chainId: 1313161894,
        urls: {
          apiURL: "https://0x4e4542a6.explorer.aurora-cloud.dev/api/",
          browserURL: "https://0x4e4542a6.explorer.aurora-cloud.dev"
        }
      }
    ]
  },

  sourcify: {
    enabled: true
  },

  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
};
