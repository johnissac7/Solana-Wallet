import AccountDashboard from "../component/AccountDashboard";

function Dashboard({ wallet, onBack }) {
  return (
    <div className="relative w-full">
      <button
        type="button"
        aria-label="Back"
        onClick={onBack}
        className="fixed top-6 left-6 z-50 w-11 h-11 rounded-2xl bg-black/30 border border-white/10 text-white/70 hover:text-white hover:bg-black/40 backdrop-blur-md transition-all active:scale-95 flex items-center justify-center"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AccountDashboard wallet={wallet} />
    </div>
  );
}

export default Dashboard;
