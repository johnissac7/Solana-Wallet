import React, { useState } from "react";

const ShowRecoveryPhase = ({ wallet, setShowRecoveryPhrase }) => {
  const [copied, setCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const recoveryPhrase = wallet?.mnemonic || "";
  const wordsArray = recoveryPhrase.split(" ");
  const wordTiles = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleCopy = () => {
    if (!recoveryPhrase) return;
    navigator.clipboard.writeText(recoveryPhrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop Blur */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-xl z-10"
          onClick={() => setShowRecoveryPhrase(false)}
        ></div>

        {/* MODAL BOX */}
        <div
          className="relative z-20 w-full max-w-[420px] bg-[#0d1311] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* CROSS BUTTON */}
          <button
            onClick={() => setShowRecoveryPhrase(false)}
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
            {/* HEADER SECTION */}
            <div className="mb-2">
              <label className="text-[11px] uppercase tracking-[0.4em] font-black text-[#AFC1B6] block mb-5 pl-1">
                Recovery Phrase
              </label>

              {/* WARNING BOX - Positioned with a slightly larger gap above */}
              <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                <p className="text-[8px] text-red-400/60 uppercase text-center font-bold tracking-widest leading-normal">
                  WARNING: Never share these words. Anyone with this phrase can
                  steal your funds forever.
                </p>
              </div>
            </div>

            {/* THE 12-WORD GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {wordTiles.map((number, index) => (
                <div
                  key={number}
                  className="flex items-center gap-3 p-4 rounded-xl bg-black/50 border border-white/5 shadow-inner"
                >
                  <span className="text-[11px] font-bold text-white/20 tabular-nums">
                    {number}.
                  </span>
                  <code className="text-[13px] font-mono text-white/90 tracking-tight">
                    {isRevealed ? wordsArray[index] || "" : "•••••"}
                  </code>
                </div>
              ))}
            </div>

            {/* ACTION ROW: Copy and Reveal Side-by-Side */}
            {/* ACTION ROW: Glossy Copy Button and Reveal Side-by-Side */}
            <div className="flex gap-3 items-center">
              {/* GLOSSY COPY BUTTON */}
              <button
                onClick={handleCopy}
                className="group relative flex-grow py-4 rounded-2xl font-bold transition-all duration-500 overflow-hidden bg-[#AFC1B6] text-[#101916] shadow-[0_10px_25px_rgba(175,193,182,0.15)] active:scale-95"
              >
                <span className="relative z-10 uppercase tracking-widest text-[10px]">
                  {copied ? "Copied" : "Copy to Clipboard"}
                </span>
                {/* Sliding Gloss Effect */}
                <div className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>

              {/* MATCHING REVEAL BUTTON */}
              <button
                onClick={() => setIsRevealed(!isRevealed)}
                className="w-14 h-[52px] flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/30 hover:text-[#AFC1B6] hover:bg-white/10 transition-all active:scale-95 shadow-inner"
                title={isRevealed ? "Hide Phrase" : "Reveal Phrase"}
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
        </div>
      </div>
    </div>
  );
};

export default ShowRecoveryPhase;
