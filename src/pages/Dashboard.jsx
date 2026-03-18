import react from "react";

function Dashboard({ wallet }) {

    return (
        <>
        <button>Add Wallet</button>
            <p>{wallet.publicKey}</p>
        </>
    )
}

export default Dashboard;