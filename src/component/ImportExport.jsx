import { useState } from "react";
import bs58 from "bs58";
import { createPortal } from "react-dom";

const ImportExport = ({ wallet }) => {
  const [showModal, setShowModal] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const privateKey = wallet?.secretKey ? bs58.encode(wallet.secretKey) : "";
  const maskedKey = "•".repeat(35);

  const handleCopy = () => {
    navigator.clipboard.writeText(privateKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* 1. THE MODAL */}
      {showModal &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl z-10"
              onClick={() => {
                setShowModal(false);
                setIsRevealed(false);
              }}
            ></div>

            {/* MODAL BOX: Reduced max-width to 380px for tighter buttons */}
            <div
              className="relative z-20 w-full max-w-[380px] bg-[#0d1311] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CROSS BUTTON: Red hover effect */}
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsRevealed(false);
                }}
                className="absolute top-6 right-6 z-30 p-2 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all duration-300"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-6">
                <div className="relative">
                  {/* BOLDER HEADER */}
                  <label className="text-[11px] uppercase tracking-[0.4em] font-black text-[#AFC1B6] block mb-5 pl-1">
                    PrivateKey
                  </label>

                  {/* WIDER HOLDING BLOCK: Reduced padding to maximize space for the string */}
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-black/60 border border-white/5 group min-h-[80px]">
                    <code className="flex-grow text-[13px] font-mono text-white/90 break-all leading-relaxed tracking-tight">
                      {isRevealed ? privateKey : maskedKey}
                    </code>

                    <button
                      onClick={() => setIsRevealed(!isRevealed)}
                      className="flex-shrink-0 text-white/20 hover:text-[#AFC1B6] transition-colors p-1"
                    >
                      {isRevealed ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* TIGHTER BUTTON */}
                <button
                  onClick={handleCopy}
                  className="w-full py-3.5 rounded-xl bg-[#AFC1B6] text-[#101916] font-black text-[10px] uppercase tracking-[0.2em] active:scale-95 transition-all shadow-lg"
                >
                  {copied ? "Copied" : "Copy to Clipboard"}
                </button>

                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                  <p className="text-[8px] text-red-400/50 uppercase text-center font-bold tracking-widest leading-normal">
                    Sharing this key gives full access to your funds.
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* SIDEBAR TRIGGER BUTTONS */}
      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="w-full py-3.5 rounded-xl transition-all duration-300 bg-white/5 border border-white/5 hover:bg-white/10 active:scale-[0.98]"
        >
          <span className="font-bold tracking-widest text-[9px] uppercase text-white/70">
            Export Private Key
          </span>
        </button>
        <button className="w-full py-3.5 rounded-xl transition-all duration-300 bg-white/5 border border-white/5 hover:bg-white/10 active:scale-[0.98] text-white/30">
          <span className="font-bold tracking-widest text-[9px] uppercase">
            Recovery Phrase
          </span>
        </button>
      </div>
    </div>
  );
};

export default ImportExport;
