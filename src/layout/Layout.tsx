import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div id="ApplicationBody">
      <div className="main-layout">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
