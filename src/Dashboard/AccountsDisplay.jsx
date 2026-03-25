import React from "react";
import { addWallet } from "../utils/wallet";

const AccountsDisplay = ({ wallet, setWallet }) => {
  const derivedWallets = wallet?.wallets || [];

  const handleAddWallet = async () => {
    const updated = await addWallet(wallet);

    localStorage.setItem("wallet", JSON.stringify(updated));
    setWallet(updated);
  };

  return (
    <div>
      <div className="backdrop-blur-[40px] rounded-[2.5rem+] p-8 bg-[#101916]/30 border border-white/5 shadow-inner">
        <div className="flex items-center justify-between mb-6 px-1">
          <h3 className="text-lg font-bold tracking-tight text-white/90">
            Accounts
          </h3>
          <button
            onClick={handleAddWallet}
            className="px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter text-[#101916] bg-[#AFC1B6] hover:bg-white active:scale-95 transition-all"
          >
            + Add
          </button>
        </div>
        <div className="space-y-3">
          {derivedWallets.map((acc) => (
            <div
              key={acc.index}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#0a0f0d]/30 border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl flex-shrink-0 bg-[#0a0f0d]/80 border border-white/5 flex items-center justify-center">
                <span className="text-xs font-bold text-white/40 group-hover:text-[#AFC1B6]">
                  {acc.index}
                </span>
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-[13px] font-bold text-white/80 truncate">
                  Account {acc.index + 1}
                </p>
                <p className="text-[9px] text-white/20 font-mono truncate">
                  {acc?.publicKey?.slice(0, 14)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsDisplay;
