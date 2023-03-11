require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config()
require('./tasks/block-number');
require('hardhat-gas-reporter');
require('solidity-coverage');

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "://eth-sepolia"
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const COIN_MARKET_CAP = process.env.COIN_MARKET_CAP || ""

// diff bw localhost network and hardhat network
// hardhat network only stays for the duration of the termina
// localhost network saves all the changes or txn data on the device

module.exports = {
  defaultNetwort: "hardhat",
  networks:{
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: [PRIVATE_KEY],   // hardhat already places them here
      chainId: 31337
    }
  },
  solidity: "0.8.18",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors:true,
    currency: "USD",
    coinmarketcap: COIN_MARKET_CAP,
    token: "MATIC",
  }
};
