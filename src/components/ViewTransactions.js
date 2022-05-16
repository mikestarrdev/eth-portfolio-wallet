import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
require("dotenv").config({ path: "../../env" });

function ViewTransaction() {
  const [address, setAddress] = useState("");

  const displayBlocks = async (e) => {
    e.preventDefault();

    const INFURA_ID = process.env.REACT_APP_INFURA_KEY;
    const PROVIDER = new ethers.providers.JsonRpcProvider(
      `https://rinkeby.infura.io/v3/${INFURA_ID}`
    );

    const balance = await PROVIDER.getBalance(`${address}`);
    console.log(balance);

    const txCount = await PROVIDER.getTransactionCount(`${address}`);
    console.log(txCount);
  };

  return (
    <div>
      <form onSubmit={displayBlocks}>
        <label>
          <h3>Enter address</h3>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </label>
        <br />
        <input type="submit" className="button-54" />
      </form>
    </div>
  );
}

export default ViewTransaction;
