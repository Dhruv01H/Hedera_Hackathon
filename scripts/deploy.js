require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with account:", deployer.address);

    const recipients = [
        "0x8324524ea8a71efa0d1e10128738bb4500f7ea90",  // Your real EVM address
        "0x56781234abcd56781234abcd56781234abcd5678"
    ];
    
    const percentages = [50, 50]; // Must sum to 100

    const PaymentSplitter = await ethers.getContractFactory("PaymentSplitter");
    const paymentSplitter = await PaymentSplitter.deploy(recipients, percentages);

    await paymentSplitter.deployed();
    console.log("PaymentSplitter deployed at:", paymentSplitter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
