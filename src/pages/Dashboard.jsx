import { useState, useEffect } from "react";
import { connection } from "../utils/solanaConnection";
import { PublicKey } from "@solana/web3.js";

function Dashboard({ wallet }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const publicKey = new PublicKey(wallet.publicKey);
        const lamports = await connection.getBalance(publicKey);
        const sol = lamports / 1000000000;
        console.log(sol, lamports);
        setBalance(sol);
      } catch (err) {
        console.log("Error fetching balance:", err);
      }
    };
    s;
    fetchBalance();
  }, [wallet]);

  const requestAirDrop = async () => {
    const publicKey = new PublicKey(wallet.publicKey);
    await connection.requestAirdrop(publicKey, 1000000000);
  };

  return (
    <>
      <h2>Wallet Dashboard</h2>
      <p>
        <b>Balance:</b>
      </p>
      <p>{balance} SOL</p>
      <p>
        <b>Address:</b>
      </p>
      <p>{wallet.publicKey}</p>
      <br />
      <button onClick={requestAirDrop}>Request AirDrop</button>
    </>
  );
}

export default Dashboard;
