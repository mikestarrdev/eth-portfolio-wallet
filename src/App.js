import React from "react";
import { useState } from "react";
import Wallet from "./components/Wallet";

function App() {
  const [userWallet, setUserWallet] = useState();

  return (
    <>
      <header>
        <h1>Welcome To Your Crypto Dashboard</h1>
      </header>
      <Wallet userWallet={userWallet} setUserWallet={setUserWallet} />
    </>
  );
}

export default App;
