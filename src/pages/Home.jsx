import { useState } from "react";
import ImportWallet from "../component/ImportWallet";
import Dashboard from "./Dashboard";
import { createWallet } from "../utils/wallet";

function Home() {
  const [wallet, setWallet] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImportingWallet, setIsImportingWallet] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [error, setError] = useState("");

  const generateWallet = async () => {
    setError("");
    setIsGenerating(true);
    try {
      const newWallet = await createWallet();
      setWallet(newWallet);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate wallet.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#0a0f0d] transition-all duration-1000 p-6 relative overflow-hidden font-sans"
    >
      {/* Dynamic Smoky Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <div className="smoke-blob one"></div>
        <div className="smoke-blob two"></div>
        <div className="smoke-blob three"></div>
      </div>

      <div className="relative w-full max-w-[360px] z-10">
        {/* The "Chewed Gum" Fused Box */}
        <div
          className={`
          relative transition-all duration-700
          backdrop-blur-[60px] rounded-[3rem] p-10
          bg-[#101916]/30 border border-white/5 shadow-[inset_0_2px_20px_rgba(255,255,255,0.02),0_40px_80px_rgba(0,0,0,0.4)]
        `}
        >
          <header className="text-center mb-12">
            <h1
              className="text-2xl font-black tracking-widest uppercase text-white/90"
            >
              Solana
            </h1>
            <p
              className="text-[10px] tracking-[0.6em] uppercase mt-1 opacity-30 text-white"
            >
              Wallet
            </p>
          </header>

          {wallet ? (
            <div className="space-y-6">
              <Dashboard wallet={wallet} />
            </div>
          ) : isImportingWallet ? (
            <div className="space-y-6">
              <ImportWallet
                mnemonic={mnemonic}
                setMnemonic={setMnemonic}
                setWallet={setWallet}
                setError={setError}
              />
              <button
                className={`
                  w-full py-3 rounded-2xl font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-300
                  bg-white/5 text-white/40 border border-white/5 hover:text-white hover:bg-white/10
                `}
                onClick={() => {
                  setIsImportingWallet(false);
                  setMnemonic("");
                  setError("");
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                className={`
                  group relative w-full py-4 rounded-2xl font-bold transition-all duration-500 overflow-hidden
                  bg-[#AFC1B6] text-[#101916] shadow-[0_10px_30px_rgba(175,193,182,0.15)] hover:scale-[1.01]
                `}
                onClick={generateWallet}
                disabled={isGenerating}
              >
                <span className="relative z-10">
                  {isGenerating ? "Encrypting..." : "Generate Wallet"}
                </span>
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>

              <button
                className={`
                  w-full py-4 rounded-2xl font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-300
                  bg-white/5 text-white/40 border border-white/5 hover:text-white hover:bg-white/10
                `}
                onClick={() => setIsImportingWallet(true)}
                disabled={isGenerating}
              >
                Import Wallet
              </button>
            </div>
          )}

          {error && (
            <p className="mt-6 text-red-500/80 text-[10px] text-center uppercase tracking-[0.2em] font-bold">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
