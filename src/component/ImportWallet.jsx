import React from "react";
import { createWallet } from "../utils/wallet";

const ImportWallet = ({ mnemonic, setMnemonic, setWallet }) => {
  const importWallet = async () => {
    const newWallet = await createWallet();
    setWallet(newWallet);
    console.log(newWallet);
  };

  return (
    <div>
      <h1>hello!</h1>
      <input
        type="text"
        onChange={(event) => {
          setMnemonic(event.target.value);
        }}
        value={mnemonic}
      />
      <br />
      <br />
      <button onClick={importWallet}>Generate</button>
    </div>
  );
};

export default ImportWallet;
