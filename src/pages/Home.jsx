import { useState, useEffect } from "react";
import ImportWallet from "../component/ImportWallet";
import AccountDashboard from "../Dashboard/AccountDashboard";
import { createWallet } from "../utils/wallet";

function Home() {
  const [wallet, setWallet] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImportingWallet, setIsImportingWallet] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const persistWallet = (newWallet) => {
    localStorage.setItem("wallet", JSON.stringify(newWallet));
    setWallet(newWallet);
  };

  const clearWallet = () => {
    localStorage.removeItem("wallet");
    setWallet(null);
    setIsImportingWallet(false);
    setMnemonic("");
    setError("");
  };

  const generateWallet = async () => {
    setError("");
    setIsGenerating(true);
    try {
      const newWallet = await createWallet();
      persistWallet(newWallet);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate wallet.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");

    if (storedWallet) {
      setWallet(JSON.parse(storedWallet));
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0f0d] relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <div className="smoke-blob one"></div>
        <div className="smoke-blob two"></div>
        <div className="smoke-blob three"></div>
      </div>

      <div className="relative z-10 w-full min-h-screen">
        {wallet ? (
          <div className="w-full">
            <AccountDashboard
              wallet={wallet}
              onLogout={clearWallet}
              setWallet={setWallet}
            />
          </div>
        ) : (
          /* REFINED ENTRY SCREEN (COMPACT VERSION) */
          <div className="w-full min-h-screen flex items-center justify-center p-6">
            {/* Reduced width to 340px and padding to p-8 for a tight, sleek look */}
            <div className="w-full max-w-[340px] backdrop-blur-[60px] rounded-[2.5rem] p-8 bg-[#101916]/30 border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <header className="text-center mb-8">
                {" "}
                {/* Reduced mb-8 for compactness */}
                <h1 className="text-2xl font-black tracking-[0.2em] uppercase text-white/90">
                  Solana
                </h1>
                <div className="h-[1px] w-6 bg-[#AFC1B6] mx-auto mt-2 opacity-20"></div>
                <p className="text-[9px] tracking-[0.6em] uppercase mt-2.5 opacity-30 text-white">
                  Wallet
                </p>
              </header>

              {isImportingWallet ? (
                <div className="space-y-5">
                  <ImportWallet
                    mnemonic={mnemonic}
                    setMnemonic={setMnemonic}
                    setWallet={persistWallet}
                    setError={setError}
                  />
                  <button
                    className="w-full py-3.5 rounded-xl font-bold text-[9px] tracking-[0.2em] uppercase transition-all duration-300 bg-white/5 text-white/40 border border-white/5 hover:text-white hover:bg-white/10"
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
                <div className="space-y-4">
                  {" "}
                  {/* Tighter vertical spacing */}
                  {/* GENERATE BUTTON */}
                  <button
                    className="group relative w-full py-4 rounded-xl font-bold transition-all duration-500 overflow-hidden bg-[#AFC1B6] text-[#101916] shadow-[0_10px_25px_rgba(175,193,182,0.15)] active:scale-95 disabled:opacity-50"
                    onClick={generateWallet}
                    disabled={isGenerating}
                  >
                    <span className="relative z-10 uppercase tracking-[0.15em] text-[12px]">
                      {isGenerating ? "Encrypting..." : "Generate Wallet"}
                    </span>
                    <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </button>
                  {/* IMPORT BUTTON */}
                  <button
                    className="w-full py-4 rounded-xl font-bold transition-all duration-300 bg-white/5 text-white/40 border border-white/5 hover:text-white hover:bg-white/10 active:scale-95"
                    onClick={() => setIsImportingWallet(true)}
                    disabled={isGenerating}
                  >
                    <span className="uppercase tracking-[0.3em] text-[10px]">
                      Import Wallet
                    </span>
                  </button>
                </div>
              )}

              {error && (
                <p className="mt-6 text-red-500/80 text-[9px] text-center uppercase tracking-[0.1em] font-bold">
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
