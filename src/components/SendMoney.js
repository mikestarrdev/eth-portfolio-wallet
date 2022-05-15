import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { ethers } = require("ethers");
require("dotenv").config();

console.log(process.env.INFURA_API_KEY);

function SendMoney() {
  const [walletType, setWalletType] = useState("mnemonic");
  const [encryptedJSON, setEncryptedJSON] = useState();
  const [mnemonic, setMnemonic] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [units, setUnits] = useState("Ether");
  const [amount, setAmount] = useState("");
  //   const [gas, setGas] = useState(21000);
  const [key, setKey] = useState("0x");
  const [password, setPassword] = useState("");
  const [tx, setTx] = useState();
  const [txSent, setTxSent] = useState(false);

  let navigate = useNavigate();

  const signTransaction = async (e) => {
    e.preventDefault();
    setTxSent(true);

    const INFURA_ID = process.env.INFURA_API_KEY;
    const PROVIDER = new ethers.providers.JsonRpcProvider(
      `https://rinkeby.infura.io/v3/${INFURA_ID}`
    );

    let wallet;
    let walletMnemonic;

    {
      encryptedJSON
        ? (wallet = new ethers.Wallet.fromEncryptedJson(
            encryptedJSON,
            password
          )).connect(PROVIDER)
        : (walletMnemonic = new ethers.Wallet.fromMnemonic(mnemonic).connect(
            PROVIDER
          ));
    }

    const tx = await walletMnemonic.sendTransaction({
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
            value={walletType}
          >
            <option value="mnemonic">Mnemonic</option>
            <option value="encrypted-JSON">Encrypted JSON</option>
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
              Upload JSON keystore: <input type="file" required={true} />
            </label>
            <br />
            <label>
              Enter password:{" "}
              <input type="password" value={password} required={true} />
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
          Recipient address:{" "}
          <input
            onChange={(e) => setAddressTo(e.target.value)}
            type="text"
            value={addressTo}
            placeholder="recipient address..."
            required={true}
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
            required={true}
          />
        </label>
        <br />
        {/* <label>
          Gas amount (Gwei):{" "}
          <input
            onChange={(e) => setGas(e.target.value)}
            type="number"
            value={gas}
            placeholder="gas in Gwei"
          />
        </label>
        <br /> */}
        {!txSent ? (
          <input
            className="button-54"
            onSubmit={signTransaction}
            type="submit"
            value="Send Transaction"
          />
        ) : (
          <p>
            Transaction sent! Please wait while your transaction is mined (this
            might take a few minutes, depending on network congestion)
          </p>
        )}
      </form>
      {tx ? (
        <>
          <p>
            <a
              href={`https://rinkeby.etherscan.io/tx/${tx.hash}`}
              target="_blank"
            >
              View transaction on etherscan
            </a>
          </p>
          <br />
          <button className="button-54">Send another transaction</button>
        </>
      ) : null}
    </div>
  );
}

export default SendMoney;
