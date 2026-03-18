import { useState } from "react";

import { importWalletMnemonic } from "../utils/wallet";

const ImportWallet = ({ mnemonic, setMnemonic, setWallet, setError }) => {
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    setError("");
    setIsImporting(true);

    try {
      const newWallet = await importWalletMnemonic(mnemonic);
      setWallet(newWallet);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import wallet.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div>
      <h1>hello!</h1>
      <input
        type="text"
        onChange={(event) => setMnemonic(event.target.value)}
        value={mnemonic}
      />
      <br />
      <br />
      <button className="bg-sky-500" onClick={handleImport} disabled={isImporting}>
        {isImporting ? "Importing..." : "Import"}
      </button>
    </div>
  );
};

export default ImportWallet;
