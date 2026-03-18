function Dashboard({ wallet }) {
  return (
    <>
      <button className="bg-sky-500">Add Wallet</button>
      <p>{wallet.publicKey}</p>
    </>
  );
}

export default Dashboard;
