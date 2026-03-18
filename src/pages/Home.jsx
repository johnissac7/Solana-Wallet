import { useState } from "react";

import ImportWallet from "../component/ImportWallet";
import Dashboard from "./Dashboard";
import { createWallet } from "../utils/wallet";

function Home() {
  const [wallet, setWallet] = useState(null);
  const [isImportingWallet, setIsImportingWallet] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generateWallet = async () => {
    setError("");
    setIsGenerating(true);

    try {
      const newWallet = await createWallet();
      setWallet(newWallet);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate wallet.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      {!wallet ? (
        <div className="create-page">
          <div>
            <h1>Welcome!</h1>
          </div>
          <button
            className="bg-sky-500"
            onClick={generateWallet}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Wallet"}
          </button>
          <br />
          <br />
          <button
            className="bg-sky-500"
            onClick={() => setIsImportingWallet(true)}
            disabled={isGenerating}
          >
            Import Wallet
          </button>
          {error ? <p className="text-red-600">{error}</p> : null}
          {isImportingWallet && (
            <ImportWallet
              mnemonic={mnemonic}
              setMnemonic={setMnemonic}
              setWallet={setWallet}
              setError={setError}
            />
          )}
        </div>
      ) : (
        <Dashboard wallet={wallet} />
      )}
    </div>
  );
}

export default Home;
