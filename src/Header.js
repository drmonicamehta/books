import React from "react";
import logo from "./logo.png";

console.log(logo);
function Header() {
  return (
    <header>
      <h1>Book Search Tool</h1>
      <img src={logo}  width={100} height={100} alt="Logo" />
    </header>
  );
}

export default Header;