import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navitem">
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="navitem">
        <NavLink to="swap">Swap</NavLink>
      </div>

      <div className="navitem">
        <NavLink to="send-money">Send Money</NavLink>
      </div>
      {/* <div className="navitem">
        <NavLink to="view-transactions">View Transactions</NavLink>
      </div> */}
      <div className="navitem">
        <NavLink to="my-wallet">My Wallet</NavLink>
      </div>
      <div className="navitem">
        <NavLink to="create-wallet">Create Wallet</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
