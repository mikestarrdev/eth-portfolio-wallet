import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { ethers } = require("ethers");
require("dotenv").config({ path: "../../env" });

function SendMoney() {
  const [walletType, setWalletType] = useState("mnemonic");
  const [encryptedJSON, setEncryptedJSON] = useState();
  const [mnemonic, setMnemonic] = useState(process.env.REACT_APP_MNEMONIC);
  const [addressTo, setAddressTo] = useState(process.env.REACT_APP_ADDRESS_TO);
  const [amount, setAmount] = useState("");
  //   const [gas, setGas] = useState(21000);
  const [password, setPassword] = useState("");
  const [tx, setTx] = useState();
  const [txSent, setTxSent] = useState(false);

  let navigate = useNavigate();

  const signTransaction = async (e) => {
    e.preventDefault();
    setTxSent(true);

    const INFURA_ID = process.env.REACT_APP_INFURA_KEY;
    const PROVIDER = new ethers.providers.JsonRpcProvider(
      `https://rinkeby.infura.io/v3/${INFURA_ID}`
    );

    let walletJSON;
    let walletMnemonic;

    encryptedJSON
      ? (walletJSON = new ethers.Wallet.fromEncryptedJson(
          encryptedJSON,
          password
        ).connect(PROVIDER))
      : (walletMnemonic = new ethers.Wallet.fromMnemonic(mnemonic).connect(
          PROVIDER
        ));

    const tx = await walletMnemonic.sendTransaction({
      to: addressTo,
      value: ethers.utils.parseEther(amount),
    });

    setMnemonic("");
    setAddressTo("");
    setAmount("");

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
                required={true}
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
              rel="noopener noreferrer"
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
