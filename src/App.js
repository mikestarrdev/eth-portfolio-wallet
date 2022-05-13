import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/Navbar";
import Wallet from "./components/Wallet";
import SendMoney from "./components/SendMoney";

function App() {
  const [userWallet, setUserWallet] = useState();

  return (
    <>
      <header>
        <h1>Crypto Dashboard</h1>
        <NavBar />
      </header>
      <Wallet userWallet={userWallet} setUserWallet={setUserWallet} />

      <Routes>
        <Route path="send-money" element={<SendMoney />} />
      </Routes>
    </>
  );
}

export default App;
