import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI, RPC_URL } from "../config";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const sendPayment = async () => {
    if (!window.ethereum) return alert("MetaMask required!");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    try {
      const tx = await contract.splitPayment(recipient, {
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      alert("Payment successful!");
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div>
      <h3>Send Payment</h3>
      <input type="text" placeholder="Recipient Address" onChange={(e) => setRecipient(e.target.value)} />
      <input type="text" placeholder="Amount (ETH)" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={sendPayment}>Send</button>
    </div>
  );
};

export default PaymentForm;
