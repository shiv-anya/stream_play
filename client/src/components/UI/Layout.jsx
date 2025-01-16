import React from "react";
import Menu from "../Menu";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Menu />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
