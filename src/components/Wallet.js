import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
require("dotenv").config();

// const INFURA_ID = process.env.INFURA_ID;
// const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infuraiov3/${INFURA_ID}`);

function Wallet({ userWallet, setUserWallet }) {
  const [walletCreated, setWalletCreated] = useState(false);

  function createWallet() {
    const wallet = new ethers.Wallet.createRandom();
    setWalletCreated(true);
    setUserWallet(wallet);
  }

  function confirmMnemonic() {
    setWalletCreated(false);
    setUserWallet();
  }

  function accessWallet() {}

  return (
    <div className="wallet">
      {!walletCreated ? (
        <button onClick={createWallet}>Create new wallet</button>
      ) : null}
      {walletCreated ? (
        <>
          <div>
            <p>
              Address: <strong>{userWallet.address}</strong>
            </p>
            <p className="warning">
              ATTENTION: do NOT reveal this mnemonic phrase to anyone! It can be
              used to recover your wallet, but also to steal your funds! Write
              down these 12 words in a safe place which is NOT your computer
            </p>
            <br />
            <p className="mnemonic">{userWallet.mnemonic.phrase}</p>

            <p>
              Click "confirm" after you've secured your mnemonic phrase. (You
              will NEVER be able to view it again)
            </p>
            <button onClick={confirmMnemonic}>Confirm</button>
          </div>
        </>
      ) : null}

      <h3>Balances</h3>
    </div>
  );
}

export default Wallet;
