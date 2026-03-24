import { useState, useEffect, useMemo } from "react";
import { connection } from "../utils/solanaConnection";
import { PublicKey } from "@solana/web3.js";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import ImportExport from "./ActiveWallet";
import AccountsDisplay from "./AccountsDisplay";

const TokenIcon = ({ logoURI, symbol, name }) => {
  const [imageError, setImageError] = useState(false);

  if (logoURI && !imageError) {
    return (
      <img
        src={logoURI}
        alt={name}
        className="w-10 h-10 rounded-full border border-white/10 object-cover shadow-lg"
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-[#1A2421] border border-white/5 flex items-center justify-center shadow-inner">
      <span className="text-[9px] font-bold text-[#AFC1B6] tracking-tighter uppercase">
        {symbol?.slice(0, 4) || "???"}
      </span>
    </div>
  );
};

const VerifiedBadge = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="none"
    className="inline-block ml-1.5 opacity-80"
  >
    <path
      d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.6464 5.35355L6.5 10.5L4.35355 8.35355C4.15829 8.15829 3.84171 8.15829 3.64645 8.35355C3.45118 8.54882 3.45118 8.86548 3.64645 9.06075L6.14645 11.5607C6.34171 11.756 6.65829 11.756 6.85355 11.5607L12.3536 6.06075C12.5488 5.86548 12.5488 5.54882 12.3536 5.35355C12.1583 5.15829 11.8417 5.15829 11.6464 5.35355Z"
      fill="#AFC1B6"
    />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="13"
    height="15"
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white/30 group-hover:text-white transition-colors"
  >
    <path
      d="M12.25 10.5V1.75C12.25 1.26625 11.8587 0.875 11.375 0.875H4.375C3.89125 0.875 3.5 1.26625 3.5 1.75V10.5C3.5 10.9837 3.89125 11.375 4.375 11.375H11.375C11.8587 11.375 12.25 10.9837 12.25 10.5ZM10.5 13.125V12.25H2.625V4.375H1.75C1.26625 4.375 0.875 4.76625 0.875 5.25V14C0.875 14.4837 1.26625 14.875 1.75 14.875H10.5C10.9837 14.875 11.375 14.4837 11.375 14V13.125H10.5Z"
      fill="currentColor"
    />
  </svg>
);

function AccountDashboard({ wallet, onLogout }) {
  const [balance, setBalance] = useState(0);
  //Copied Notification
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true); // show snackbar
  };

  const handleClose = () => {
    setOpen(false); // hide snackbar
  };

  const tokens = useMemo(
    () => [
      {
        name: "Solana",
        symbol: "SOL",
        amount: balance,
        value: (balance * 145.2).toFixed(2),
        isVerified: true,
        logoURI:
          "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        change24h: "+2.45%",
      },
      {
        name: "USD Coin",
        symbol: "USDC",
        amount: 0.0,
        value: "0.00",
        isVerified: true,
        logoURI:
          "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
      },
      {
        name: "Unknown Token",
        symbol: "7sZV",
        amount: 100,
        value: "0.00",
        isVerified: false,
        logoURI: null,
      },
    ],
    [balance],
  );

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (!wallet?.publicKey) return;
        const publicKey = new PublicKey(wallet.publicKey);
        const lamports = await connection.getBalance(publicKey);
        setBalance(lamports / 1000000000);
      } catch (err) {
        console.error("Balance fetch error:", err);
      }
    };
    fetchBalance();
  }, [wallet?.publicKey]);

  const copyAddress = () => {
    if (wallet?.publicKey) {
      navigator.clipboard.writeText(wallet.publicKey);
    }
  };

  return (
    <div className="w-full min-h-screen text-white/90 px-10 py-12 lg:px-24 bg-transparent">
      {/* 1. HEADER */}
      <header className="flex justify-between items-center mb-14 w-full max-w-[1100px] mx-auto border-b border-white/5 pb-8">
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-[0.2em] uppercase text-white/90">
            Solana
          </h1>
          <div className="h-[1px] w-6 bg-[#AFC1B6] mt-1 opacity-20"></div>
          <p className="text-[10px] tracking-[0.5em] uppercase mt-2 opacity-30 text-white">
            Wallet
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end text-right">
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                Network
              </span>
              <span className="text-[10px] font-bold text-green-500/60 uppercase">
                Mainnet Beta
              </span>
            </div>
            <div className="h-6 w-[1px] bg-white/10"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/40 animate-pulse"></div>
          </div>

          {/* SUBTLE RED LOGOUT BUTTON */}
          <button
            onClick={onLogout}
            className="group relative px-4 py-1.5 rounded-xl font-bold transition-all duration-500 overflow-hidden border border-red-500/20 text-red-500/40 hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/40 active:scale-95"
          >
            <span className="relative z-10 uppercase tracking-widest text-[8px]">
              Logout
            </span>
            {/* Subtle Shimmer Effect */}
            <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </div>
      </header>

      {/* 2. MAIN LAYOUT */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-[1100px] mx-auto">
        {/* LEFT COLUMN */}
        <section className="lg:col-span-7 space-y-6">
          {/* COMPACT & CENTERED BALANCE TILE */}
          <div className="relative overflow-hidden backdrop-blur-[40px] rounded-[3rem] p-10 bg-[#101916]/30 border border-white/5 shadow-2xl max-w-[400px] mx-auto">
            <h2 className="text-[9px] tracking-[0.4em] uppercase text-[#AFC1B6] mb-3 opacity-60 text-center">
              Total Net Worth
            </h2>
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black tracking-tighter leading-none text-white/90">
                  {balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span className="text-lg font-light text-white/20 tracking-widest uppercase">
                  SOL
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button className="group relative w-28 py-3 rounded-2xl font-bold transition-all duration-500 overflow-hidden bg-[#AFC1B6] text-[#101916] shadow-[0_10px_25px_rgba(175,193,182,0.15)] active:scale-95">
                <span className="relative z-10 uppercase tracking-widest text-[9px]">
                  Send
                </span>
                <div className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
              <button className="w-28 py-3 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm">
                Receive
              </button>
            </div>
          </div>

          {/* FULL WIDTH HOLDINGS TILE */}
          <div className="backdrop-blur-[40px] rounded-[3rem] p-8 bg-[#101916]/20 border border-white/5">
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-6">
                <h3 className="text-lg font-bold tracking-tight text-white/90">
                  Tokens
                </h3>
                <h3 className="text-lg font-bold tracking-tight text-white/20">
                  Collectibles
                </h3>
              </div>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-white/10"
                  ></div>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {tokens.map((token, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-5 rounded-[2rem] bg-[#0a0f0d]/40 border border-white/5 hover:border-white/10 transition-all group shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <TokenIcon
                      logoURI={token.logoURI}
                      symbol={token.symbol}
                      name={token.name}
                    />
                    <div>
                      <p className="text-base font-bold text-white/80">
                        {token.name}
                        {token.isVerified && <VerifiedBadge />}
                      </p>
                      <p className="text-[11px] text-white/20 font-mono">
                        {token.amount.toLocaleString(undefined, {
                          maximumFractionDigits: 4,
                        })}{" "}
                        {token.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    {token.value !== "0.00" ? (
                      <>
                        <div className="text-base font-bold text-white/70 tracking-tight">
                          ${token.value}
                        </div>
                        {token.change24h && (
                          <div className="text-[9px] font-bold text-green-500/40">
                            {token.change24h}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-lg font-light text-white/5">-</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN */}
        <section className="lg:col-span-5 space-y-6">
          <div className="backdrop-blur-[40px] rounded-[2.5rem] p-8 bg-[#101916]/30 border border-white/5 shadow-inner">
            <h3 className="text-lg font-bold tracking-tight text-white/90 mb-6 px-1">
              Active Wallet
            </h3>
            <div className="space-y-5">
              <div className="relative group">
                <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/20 block mb-2 pl-1">
                  Address
                </label>
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#0a0f0d]/50 border border-white/5 hover:border-white/10 transition-all">
                  <span className="text-[11px] font-mono text-white/60 group-hover:text-[#AFC1B6] truncate max-w-[75%]">
                    {wallet?.publicKey || "----"}
                  </span>
                  <button
                    onClick={() => {
                      copyAddress();
                      handleClick();
                    }}
                    className="flex-shrink-0 ml-2 p-1 hover:bg-white/5 rounded-md transition-colors"
                  >
                    <CopyIcon />
                  </button>
                </div>
              </div>
              <ImportExport wallet={wallet} />
            </div>
          </div>

          <AccountsDisplay wallet={wallet} />
        </section>
      </main>
      <Snackbar
        open={open}
        message="copied to clipboard!"
        autoHideDuration={2000}
        onClose={handleClose}
      />
    </div>
  );
}

export default AccountDashboard;
