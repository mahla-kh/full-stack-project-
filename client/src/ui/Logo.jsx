import React from "react";
import { Link } from "react-router-dom";

//////////////////// fix logo in login form !! ///////////////////////////////////
function Logo() {
  return (
    <Link to="/">
      {/* <img src="/logo.png" alt="swing logo" /> */}
      Sewing Project
    </Link>
  );
}

export default Logo;
