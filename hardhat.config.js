require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat", // ✅ Change default network to Hardhat for testing
  networks: {
    hardhat: {}, // ✅ Add Hardhat Network for testing
    hedera: {
      url: "https://testnet.hashio.io/api",
      accounts: [process.env.HEDERA_OPERATOR_KEY], // Ensure this is HEX encoded
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
