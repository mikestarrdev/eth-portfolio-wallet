import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
require("dotenv").config();

// const INFURA_ID = process.env.INFURA_ID;
// const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infuraiov3/${INFURA_ID}`);

function CreateWallet({ userWallet, setUserWallet }) {
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

  return (
    <div className="wallet">
      {!walletCreated ? (
        <button onClick={createWallet}>Create New Wallet</button>
      ) : null}
      {walletCreated ? (
        <>
          <div>
            <p>
              Address: <strong>{userWallet.address}</strong>
            </p>
            <p className="warning">
              <strong>ATTENTION:</strong> do NOT reveal this mnemonic phrase to
              anyone! It can be used to recover your wallet, but also to steal
              your funds! Write down these 12 words in a safe place which is NOT
              your computer
            </p>

            <p className="mnemonic">{userWallet.mnemonic.phrase}</p>

            <p>
              Click "confirm" after you've written down your mnemonic phrase in
              a secure place. (You won't be able to view your mnemonic after
              clicking below)
            </p>
            <button onClick={confirmMnemonic}>Confirm</button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default CreateWallet;
