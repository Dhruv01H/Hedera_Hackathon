const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PaymentSplitter", function () {
    it("Should deploy with recipients and percentages", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const recipients = [addr1.address, addr2.address];
        const percentages = [50, 50];

        const PaymentSplitter = await ethers.getContractFactory("PaymentSplitter");
        const contract = await PaymentSplitter.deploy(recipients, percentages);
        // await contract.deployed();

        expect(await contract.recipients(0)).to.equal(addr1.address);
        expect(await contract.percentages(0)).to.equal(50);
    });
});
