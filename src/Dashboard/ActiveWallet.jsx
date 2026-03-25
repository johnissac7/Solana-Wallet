import { useState } from "react";
import bs58 from "bs58";
import { createPortal } from "react-dom";
import ExportPrivateKey from "./ExportPrivateKey";
import ShowRecoveryPhase from "./ShowRecoveryPhase";

const ActiveWallet = ({ wallet }) => {
  const [showExportPrivateKEy, setShowExportPrivateKey] = useState(false);
  const [showRecoveryPhrase, setShowRecoveryPhrase] = useState(false);

  return (
    <div className="w-full">
      {showExportPrivateKEy &&
        createPortal(
          <ExportPrivateKey
            wallet={wallet}
            setShowExportPrivateKey={setShowExportPrivateKey}
          />,
          document.body,
        )}

      {showRecoveryPhrase &&
        createPortal(
          <ShowRecoveryPhase
            wallet={wallet}
            setShowRecoveryPhrase={setShowRecoveryPhrase}
          />,
          document.body,
        )}

      {/* SIDEBAR TRIGGER BUTTONS */}
      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={() => setShowExportPrivateKey(true)}
          className="w-full py-3.5 rounded-xl transition-all duration-300 bg-white/5 border text-white/40 border-white/5 hover:bg-white/10 active:scale-[0.98]"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all0">
            Export Private Key
          </span>
        </button>
        <button
          onClick={() => setShowRecoveryPhrase(true)}
          className="w-full py-3.5 rounded-xl transition-all duration-300 bg-white/5 border border-white/5 hover:bg-white/10 active:scale-[0.98]"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">
            Recovery Phase
          </span>
        </button>
      </div>
    </div>
  );
};

export default ActiveWallet;
