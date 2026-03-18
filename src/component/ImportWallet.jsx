import { useState } from "react";
import { importWalletMnemonic } from "../utils/wallet";

const ImportWallet = ({
  mnemonic,
  setMnemonic,
  setWallet,
  setError,
  isDarkMode = true,
}) => {
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
    <div className="animate-fade-in w-full">
      <div className="text-center mb-6">
        <h2
          className={`text-xs font-bold tracking-[0.4em] uppercase opacity-40 ${isDarkMode ? "text-white" : "text-[#355245]"}`}
        >
          Restore Access
        </h2>
      </div>

      <div className="space-y-6">
        {/* The "Sunken" Input Field */}
        <div className="relative group">
          <textarea
            rows="3"
            placeholder="Enter your secret recovery phrase..."
            className={`
              w-full p-5 rounded-2xl text-sm font-medium transition-all duration-500 outline-none resize-none
              ${
                isDarkMode
                  ? "bg-black/40 border border-white/5 text-[#AFC1B6] placeholder:text-white/10 focus:border-[#AFC1B6]/30 shadow-inner"
                  : "bg-[#AFC1B6]/10 border border-[#648374]/10 text-[#355245] placeholder:text-[#355245]/30 focus:border-[#355245]/40 shadow-sm"
              }
            `}
            onChange={(event) => setMnemonic(event.target.value)}
            value={mnemonic}
          />
          {/* Subtle glow on focus for dark mode */}
          {isDarkMode && (
            <div className="absolute inset-0 rounded-2xl bg-[#AFC1B6]/5 blur-xl -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
          )}
        </div>

        <button
          className={`
            group relative w-full py-4 rounded-2xl font-bold text-xs tracking-widest uppercase overflow-hidden transition-all duration-500
            ${
              isDarkMode
                ? "bg-[#AFC1B6] text-[#101916] hover:bg-white shadow-[0_10px_30px_rgba(175,193,182,0.15)]"
                : "bg-[#355245] text-[#E3E5D8] hover:bg-[#101916] shadow-lg"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          onClick={handleImport}
          disabled={isImporting}
        >
          <span className="relative z-10">
            {isImporting ? "Verifying..." : "Import Wallet"}
          </span>
          {/* Liquid shine effect */}
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </button>

        <p
          className={`text-center text-[9px] tracking-widest uppercase opacity-30 px-4 leading-relaxed ${isDarkMode ? "text-white" : "text-[#355245]"}`}
        >
          Ensure you are in a secure environment. Your recovery phrase gives
          full access to your funds.
        </p>
      </div>
    </div>
  );
};

export default ImportWallet;
