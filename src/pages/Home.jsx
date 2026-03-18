import { useState } from "react";
import { createWallet } from "../utils/wallet";

function Home() {
    const [wallet, setWallet] = useState(null);
    const generateWallet = async () => {
        const newWallet = await createWallet();
        setWallet(newWallet);
        console.log(newWallet);
    }

    return (
        <div>
            <h1>Solana Wallet</h1>
            <button onClick={generateWallet}>
                Generate Wallet
            </button>
            <br /><br />
            <button>
                Import Wallet
            </button>
        </div>
    )
}

export default Home;