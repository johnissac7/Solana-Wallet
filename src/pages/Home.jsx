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
    /* Removed 'transition-all duration-1000' from root to prevent background lag during swap */
    <div className="min-h-screen w-full bg-[#0a0f0d] relative overflow-hidden font-sans">
      {/* Smoky Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <div className="smoke-blob one"></div>
        <div className="smoke-blob two"></div>
        <div className="smoke-blob three"></div>
      </div>

      <div className="relative z-10 w-full min-h-screen">
        {wallet ? (
          /* DASHBOARD: Removed 'animate-in', 'zoom-in', and 'duration-700' for instant appearance */
          <div className="w-full">
            <Dashboard wallet={wallet} />
          </div>
        ) : (
          /* ENTRY SCREEN: Kept centered only when wallet is null */
          <div className="w-full min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-[420px] backdrop-blur-[60px] rounded-[3.5rem] p-12 bg-[#101916]/30 border border-white/5 shadow-[inset_0_2px_20px_rgba(255,255,255,0.02),0_40px_80px_rgba(0,0,0,0.4)]">
              <header className="text-center mb-14">
                <h1 className="text-3xl font-black tracking-[0.2em] uppercase text-white/90">
                  Solana
                </h1>
                <div className="h-[1px] w-8 bg-[#AFC1B6] mx-auto mt-2 opacity-20"></div>
                <p className="text-[10px] tracking-[0.7em] uppercase mt-3 opacity-30 text-white">
                  Wallet
                </p>
              </header>

              {isImportingWallet ? (
                <div className="space-y-6">
                  <ImportWallet
                    mnemonic={mnemonic}
                    setMnemonic={setMnemonic}
                    setWallet={setWallet}
                    setError={setError}
                  />
                  <button
                    className="w-full py-4 rounded-2xl font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 bg-white/5 text-white/40 border border-white/5 hover:text-white hover:bg-white/10"
                    onClick={() => {
                      setIsImportingWallet(false);
                      setMnemonic("");
                      setError("");
                    }}
                  >
                    Back to Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <button
                    className="group relative w-full py-5 rounded-2xl font-bold transition-all duration-500 overflow-hidden bg-[#AFC1B6] text-[#101916] shadow-[0_15px_35px_rgba(175,193,182,0.2)] active:scale-95"
                    onClick={generateWallet}
                    disabled={isGenerating}
                  >
                    <span className="relative z-10 uppercase tracking-widest text-xs">
                      {isGenerating ? "Encrypting..." : "Generate Wallet"}
                    </span>
                    <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </button>

                  <button
                    className="w-full py-5 rounded-2xl font-bold text-[10px] tracking-[0.3em] uppercase transition-all duration-300 bg-white/5 text-white/40 border border-white/5 hover:text-white hover:bg-white/10 active:scale-95"
                    onClick={() => setIsImportingWallet(true)}
                    disabled={isGenerating}
                  >
                    Import Wallet
                  </button>
                </div>
              )}

              {error && (
                <p className="mt-8 text-red-500/80 text-[10px] text-center uppercase tracking-[0.2em] font-bold">
                  {error}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
