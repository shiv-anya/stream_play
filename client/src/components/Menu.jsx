import React from "react";
import Logo from "../img/Logo.png";
import { IoMoonOutline } from "react-icons/io5";
import { BsChat } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { PiSquaresFourLight } from "react-icons/pi";

const SideBar = () => {
  return (
    <aside className="h-screen p-4 py-8 border-r border-gray-300 flex flex-col justify-between items-center">
      <img
        src={Logo}
        alt="stream play logo"
        className="size-8 cursor-pointer"
      />
      <div className="text-2xl text-gray-500 flex flex-col gap-2 items-center">
        <div className="hover:text-white hover:bg-indigo-500 p-3 rounded-lg cursor-pointer">
          <BsChat />
        </div>
        <div className="hover:text-white hover:bg-indigo-500 p-3 rounded-lg cursor-pointer">
          <GoPeople />
        </div>
        <div className="hover:text-white hover:bg-indigo-500 p-3 rounded-lg cursor-pointer">
          <PiSquaresFourLight />
        </div>
      </div>
      <div className="text-2xl text-gray-500 flex flex-col gap-4 items-center">
        <div className="cursor-pointer">
          <IoMoonOutline />
        </div>
        <div className="size-10 bg-indigo-500 rounded-full cursor-pointer"></div>
      </div>
    </aside>
  );
};

const Menu = () => {
  return <SideBar />;
};

export default Menu;
