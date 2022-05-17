import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { ethers } from "ethers";
require("dotenv").config();
const {
  abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const {
  abi: SwapRouterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");
const ERC20ABI = require("./abi.json");

function Swap({ provider, signer }) {
  const REACT_APP_INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
  const PROVIDER = new ethers.providers.JsonRpcProvider(
    `https://rinkeby.infura.io/v3/${REACT_APP_INFURA_KEY}`
  );
  const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  const swapABI = [
    "function getPool() private view returns(IUniswapV3Pool)",
    "function exactInputSingle() external payable returns(uint256)",
    "function exactInput() external payable returns(uint256)",
    "function exactOutputInternal() returns(uint256)",
    "function exactOutputSingle() external payable returns(uint256)",
    "function exactOutput() external payable returns(uint256)",
  ];
  // DAI/ETH pool
  const UniEthPool = "0x1d42064Fc4Beb5F8aAF85F4617AE8b3b5B8Bd801";
  const name0 = "Uniswap";
  const symbol1 = "UNI";
  const decimals1 = 18;

  const swapContract = new ethers.Contract(
    swapRouterAddress,
    swapABI,
    provider
  );

  return (
    <div className="swap">
      <h2>Swap Tokens</h2>
      <h4>This page connects to Uniswap's smart contracts</h4>
    </div>
  );
}

export default Swap;
