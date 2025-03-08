import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI, RPC_URL } from "../config";

const PaymentStatus = () => {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    const contractBalance = await contract.getBalance();
    setBalance(ethers.utils.formatEther(contractBalance));
  };

  return (
    <div>
      <h3>Contract Balance: {balance} ETH</h3>
    </div>
  );
};

export default PaymentStatus;
