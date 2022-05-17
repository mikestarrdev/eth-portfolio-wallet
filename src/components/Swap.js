import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { ethers } from "ethers";
require("dotenv").config();

function Swap({ provider, signer }) {
  const REACT_APP_INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
  const PROVIDER = new ethers.providers.JsonRpcProvider(
    `https://rinkeby.infura.io/v3/${REACT_APP_INFURA_KEY}`
  );
  const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  const ABI = [
    "function getPool() view returns(IUniswapV3Pool)",
    "function exactInputSingle() external payable returns(uint256)",
    "function exactInput() external payable returns(uint256)",
    "function exactOutputInternal() returns(uint256)",
    "function exactOutputSingle() external payable returns(uint256)",
    "function exactOutput() external payable returns(uint256)",
  ];
  // DAI/ETH pool
  const poolAddress = "0x1d42064Fc4Beb5F8aAF85F4617AE8b3b5B8Bd801";

  const name0 = "Uniswap";
  const symbol0 = "UNI";
  const decimals0 = 18;
  const address0 = "0x986ff0E7487a4B6C6Ba458b84eF261c3c4B62077";

  const name1 = "Wrapped Ether";
  const symbol1 = "WETH";
  const decimals1 = 18;
  const address1 = "0xc778417E063141139Fce010982780140Aa0cD5Ab";

  const swapContract = new ethers.Contract(swapRouterAddress, ABI, provider);

  const main = async () => {
    const poolContract = await new ethers.Contract(poolAddress, ABI, PROVIDER);
    console.log(poolContract);
  };

  main();

  return (
    <div className="swap">
      <h2>Swap Tokens</h2>
      <h4>This page connects to Uniswap's smart contracts</h4>
    </div>
  );
}

export default Swap;
