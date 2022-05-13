import React from "react";
import { NavLink } from "react-router-dom";
import SendMoney from "./SendMoney";
import Wallet from "./Wallet";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navitem">
        <NavLink to={<Wallet />}>Create Wallet</NavLink>
      </div>
      <div className="navitem">
        <NavLink to={<SendMoney />}>Send Money</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
