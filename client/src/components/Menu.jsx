import React from "react";
import Logo from "../img/Logo.png";
import { IoMoonOutline } from "react-icons/io5";
import { BsChat } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { PiSquaresFourLight } from "react-icons/pi";
import { AiOutlineLogout } from "react-icons/ai";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SideBar = ({ logout }) => {
  return (
    <aside className="h-screen p-4 py-8 border-r border-gray-300 flex flex-col justify-between items-center">
      <img
        src={Logo}
        alt="stream play logo"
        className="size-8 cursor-pointer"
      />
      <div className="text-2xl text-gray-500 flex flex-col gap-2 items-center">
        <div
          className="hover:text-white hover:bg-indigo-500 p-3 rounded-lg cursor-pointer"
          title="All Chats"
        >
          <BsChat />
        </div>
        <div
          className="hover:text-white hover:bg-indigo-500 p-3 rounded-lg cursor-pointer"
          title="Contacts"
        >
          <GoPeople />
        </div>
        <div
          className="hover:text-white hover:bg-indigo-500 p-3 rounded-lg cursor-pointer"
          title="Channels"
        >
          <PiSquaresFourLight />
        </div>
      </div>
      <div className="text-2xl text-gray-500 flex flex-col gap-4 items-center">
        <div className="cursor-pointer hover:bg-indigo-500 hover:text-white p-2 rounded-full">
          <IoMoonOutline />
        </div>
        <div
          className="cursor-pointer hover:bg-indigo-500 hover:text-white p-2 rounded-full"
          onClick={logout}
        >
          <AiOutlineLogout />
        </div>
      </div>
    </aside>
  );
};

const Menu = () => {
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("hashedPassword");
    cookies.remove("email");
    window.location.reload();
  };
  return <SideBar logout={logout} />;
};

export default Menu;
