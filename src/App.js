import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/Navbar";
import Swap from "./components/Swap";
import CreateWallet from "./components/CreateWallet";
import SendMoney from "./components/SendMoney";
import ViewTransactions from "./components/ViewTransactions";
import MyWallet from "./components/MyWallet";
import { ethers } from "ethers";

function App() {
  const [userWallet, setUserWallet] = useState();
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();

  async function connectMetaMask(e) {
    e.preventDefault();
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();

    // const balance = await provider.getBalance();
    setProvider(provider);
    setSigner(signer);
  }

  return (
    <>
      <header>
        <h1>Crypto Dashboard</h1>
        <p style={{ textAlign: "center" }}>
          This DApp uses Ethereum's Rinkeby test network...
        </p>
        {!provider ? (
          <button
            onClick={connectMetaMask}
            className="button-54"
            style={{ margin: "1rem" }}
          >
            Connect MetaMask
          </button>
        ) : (
          <p>{provider.provider.selectedAddress}</p>
        )}
        <NavBar />
      </header>

      <Routes>
        <Route
          path="swap"
          element={<Swap provider={provider} signer={signer} />}
        />
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
        <Route path="view-transactions" element={<ViewTransactions />} />
        <Route
          path="my-wallet"
          element={<MyWallet provider={provider} signer={signer} />}
        />
      </Routes>
    </>
  );
}

export default App;
