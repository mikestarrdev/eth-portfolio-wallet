import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { ethers } = require("ethers");
require("dotenv").config();

function SendMoney() {
  const [walletType, setWalletType] = useState("encrypted-JSON");
  const [encryptedJSON, setEncryptedJSON] = useState();
  const [mnemonic, setMnemonic] = useState("");
  const [addressFrom, setAddressFrom] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [units, setUnits] = useState("Ether");
  const [amount, setAmount] = useState(0);
  const [gas, setGas] = useState(21000);
  const [key, setKey] = useState("0x");
  const [password, setPassword] = useState("");
  const [tx, setTx] = useState({});

  let navigate = useNavigate();

  const signTransaction = async (e) => {
    const INFURA_ID = process.env.INFURA_ID;
    const provider = new ethers.providers.JsonRpcProvider(
      `https://rinkeby.infura.io/v3/${INFURA_ID}`
    );
    const signer = provider.getSigner();
    let wallet;
    {
      encryptedJSON
        ? (wallet = new ethers.Wallet.fromEncryptedJson(
            encryptedJSON,
            password
          ))
        : (wallet = new ethers.Wallet(key, provider));
    }

    const tx = await wallet.sendTransaction({
      to: addressTo,
      value: ethers.utils.parseEther(amount),
    });

    await tx.wait();
    await setTx(tx);
    console.log(tx);
  };

  return (
    <div>
      <form onSubmit={signTransaction}>
        <label>
          How would you like to access your wallet?{" "}
          <select
            onChange={(e) => {
              setWalletType(e.target.value);
            }}
          >
            <option value="encrypted-JSON">Encrypted JSON</option>
            <option value="mnemonic">Mnemonic phrase</option>
            <option value="create-wallet">Create new wallet</option>
          </select>
        </label>

        {walletType === "create-wallet" ? (
          <>
            <br />
            <button onClick={() => navigate("/create-wallet")}>
              Create new wallet
            </button>
          </>
        ) : null}
        <br />
        {walletType === "encrypted-JSON" ? (
          <>
            <label>
              Upload JSON keystore: <input type="file" />
            </label>
            <br />
          </>
        ) : (
          <>
            <label>
              Enter your mnemonic phrase:{" "}
              <input
                onChange={(e) => setMnemonic(e.target.value)}
                type="password"
                value={mnemonic}
                placeholder="mnemonic phrase..."
              />
            </label>
            <br />
          </>
        )}

        <label>
          Your address:{" "}
          <input
            onChange={(e) => setAddressFrom(e.target.value)}
            type="text"
            value={addressFrom}
            placeholder="your address..."
          />
        </label>
        <br />
        <label>
          Recipient address:{" "}
          <input
            onChange={(e) => setAddressTo(e.target.value)}
            type="text"
            value={addressTo}
            placeholder="recipient address..."
          />
        </label>
        <br />
        <label>
          Enter amount in Ether:{" "}
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            value={amount}
            placeholder="amount in Ether"
          />
        </label>
        <br />
        <label>
          Gas amount (Gwei):{" "}
          <input
            onChange={(e) => setGas(e.target.value)}
            type="number"
            value={gas}
            placeholder="gas in Gwei"
          />
        </label>
        <br />
        <input
          className="button-54"
          onSubmit={signTransaction}
          type="submit"
          value="Send Transaction"
        />
      </form>
    </div>
  );
}

export default SendMoney;
