import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

function Swap({ provider, signer }) {
  const address = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  const ABI = [];
  const swapContract = new ethers.Contract(address, ABI, provider);

  console.log(swapContract);

  return (
    <div className="swap">
      <h2>Swap Tokens</h2>
      <h4>This page connects to Uniswap's smart contracts</h4>
    </div>
  );
}

export default Swap;
