import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/Navbar";
import Swap from "./components/Swap";
import CreateWallet from "./components/CreateWallet";
import SendMoney from "./components/SendMoney";

function App() {
  const [userWallet, setUserWallet] = useState();

  return (
    <>
      <header>
        <h1>Crypto Dashboard</h1>
        <p style={{ textAlign: "center" }}>
          This DApp uses Ethereum's Rinkeby test network...
        </p>
        <NavBar />
      </header>

      <Routes>
        <Route path="swap" element={<Swap />} />
        <Route
          path="create-wallet"
          element={
            <CreateWallet
              userWallet={userWallet}
              setUserWallet={setUserWallet}
            />
          }
        />
        <Route path="send-money" element={<SendMoney />} />
      </Routes>
    </>
  );
}

export default App;
