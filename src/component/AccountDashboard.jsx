import { useState, useEffect } from "react";
import { connection } from "../utils/solanaConnection";
import { PublicKey } from "@solana/web3.js";

function AccountDashboard({ wallet }) {
  const [balance, setBalance] = useState(0);

  const tokens = [
    {
      name: "Solana",
      symbol: "SOL",
      amount: balance.toFixed(4),
      value: (balance * 145.2).toFixed(2),
      icon: "S",
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      amount: "0.00",
      value: "0.00",
      icon: "$",
    },
    { name: "Bonk", symbol: "BONK", amount: "0.00", value: "0.00", icon: "B" },
  ];

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const publicKey = new PublicKey(wallet.publicKey);
        const lamports = await connection.getBalance(publicKey);
        setBalance(lamports / 1000000000);
      } catch (err) {
        console.log("Error fetching balance:", err);
      }
    };
    fetchBalance();
  }, [wallet]);

  return (
    <div className="w-full min-h-screen text-white/90 px-10 py-12 lg:px-24">
      {/* 1. MINIMAL HEADER */}
      <header className="flex justify-between items-center mb-20 w-full max-w-[1200px] mx-auto">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold tracking-tight uppercase">
            Portfolio
          </h1>
          <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
            Verified Session
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
              Network
            </span>
            <span className="text-[10px] font-bold text-green-500/80 uppercase">
              Mainnet Beta
            </span>
          </div>
          <div className="h-6 w-[1px] bg-white/10"></div>
          <span className="text-[11px] font-mono text-white/40">
            {wallet.publicKey.slice(0, 4)}...{wallet.publicKey.slice(-4)}
          </span>
        </div>
      </header>

      {/* 2. MAIN LAYOUT */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-20 w-full max-w-[1200px] mx-auto">
        {/* LEFT COLUMN: Clean Data Display */}
        <section className="lg:col-span-8">
          {/* BALANCE SECTION */}
          <div className="mb-16">
            <h2 className="text-[10px] tracking-[0.4em] uppercase text-white/20 mb-2">
              Available Balance
            </h2>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-tighter leading-none">
                {balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
              <span className="text-lg font-light text-white/20 uppercase tracking-widest">
                SOL
              </span>
            </div>
            <p className="text-sm mt-2 text-white/30 font-medium tracking-tight">
              ≈ ${(balance * 145.2).toLocaleString()} USD
            </p>

            <div className="flex gap-4 mt-8">
              <button className="px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                Send
              </button>
              <button className="px-6 py-2.5 rounded-lg border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">
                Receive
              </button>
            </div>
          </div>

          {/* ASSETS: No Boxes, Just Clean Lines */}
          <div className="space-y-6 pt-10 border-t border-white/5">
            <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 mb-4">
              Assets
            </h3>
            <div className="divide-y divide-white/5">
              {tokens.map((token, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-5 group"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                      {token.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/80">
                        {token.name}
                      </p>
                      <p className="text-[10px] text-white/20 uppercase tracking-widest">
                        {token.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono font-bold text-white/80">
                      {token.amount}
                    </p>
                    <p className="text-[10px] text-white/20">
                      ${token.value} USD
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Low-Noise Sidebar */}
        <section className="lg:col-span-4 lg:pl-10 border-l border-white/5 hidden lg:block">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/20 mb-6">
            Activity Log
          </h4>
          <div className="space-y-8">
            <div className="flex gap-4 items-start opacity-30">
              <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-white"></div>
              <div>
                <p className="text-[11px] font-medium">Session Active</p>
                <p className="text-[9px] opacity-50 mt-1 uppercase tracking-tighter">
                  System • Now
                </p>
              </div>
            </div>
            {/* Future logs here */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AccountDashboard;
