import { useState } from "react";
import { createWallet } from "../utils/wallet";
import Dashboard from "./Dashboard";
import ImportWallet from "../component/ImportWallet";

function Home() {
  const [wallet, setWallet] = useState(null);
  const generateWallet = async () => {
    const newWallet = await createWallet();
    setWallet(newWallet);
    console.log(newWallet);
  };

  const [importWallet, setImportWallet] = useState(false);
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div>
      {!wallet ? (
        <div className="create-page">
          <div>
            <h1>Welcome!</h1>
          </div>
          <button onClick={generateWallet}>Generate Wallet</button>
          <br />
          <br />
          <button onClick={() => setImportWallet(true)}>Import Wallet</button>
          {importWallet && (
            <ImportWallet
              mnemonic={mnemonic}
              setMnemonic={setMnemonic}
              setWallet={setWallet}
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
