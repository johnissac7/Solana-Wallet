import React from "react";
import { createWallet, importWalletMnemonic } from "../utils/wallet";

const ImportWallet = ({ mnemonic, setMnemonic, setWallet }) => {
  const handleImport = async () => {
    const newWallet = await importWalletMnemonic(mnemonic);
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
      <button className="bg-sky-500" onClick={handleImport}>
        Generate
      </button>
    </div>
  );
};

export default ImportWallet;
