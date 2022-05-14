import React from "react";
import { useState } from "react";

function SendMoney() {
  const [addressTo, setAddressTo] = useState("");
  const [units, setUnits] = useState("Ether");
  const [amount, setAmount] = useState();
  const [gas, setGas] = useState();

  function signTransaction() {
    console.log(addressTo);
  }

  return (
    <div>
      <form>
        <label>
          Upload JSON keystore: <input type="file" />
        </label>
        <br />
        <label>
          Enter address:
          <input
            onChange={(e) => setAddressTo(e.target.value)}
            type="text"
            value={addressTo}
            placeholder="enter address..."
          />
        </label>
        <br />
        <label>
          Enter amount:{" "}
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="text"
            value={amount}
            placeholder="enter amount"
          />
          <select onChange={(e) => setUnits(e.target.value)}>
            <option value="Ether">Ether</option>
            <option value="Gwei" type="counter">
              Gwei
            </option>
          </select>
        </label>
        <br />
        <label>
          Gas amount (Gwei):{" "}
          <input
            onChange={(e) => setGas(e.target.value)}
            type="text"
            value={gas}
            placeholder="enter gas in Gwei"
          />
        </label>
      </form>
    </div>
  );
}

export default SendMoney;
