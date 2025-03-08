import { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import PaymentForm from "./components/PaymentForm";
import PaymentStatus from "./components/PaymentStatus";

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div>
      <h1>Hedera Payment Splitter</h1>
      <ConnectWallet setAccount={setAccount} />
      {account && (
        <>
          <PaymentForm />
          <PaymentStatus />
        </>
      )}
    </div>
  );
}

export default App;
