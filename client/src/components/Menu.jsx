import React, { useContext } from "react";
import Logo from "../img/Logo.png";
import { IoMoonOutline } from "react-icons/io5";
import { BsChat } from "react-icons/bs";
import { PiSquaresFourLight } from "react-icons/pi";
import { AiOutlineLogout } from "react-icons/ai";
import { FiSun } from "react-icons/fi";
import Cookies from "universal-cookie";
import { NavLink, useNavigate } from "react-router";
import ThemeContext from "../ctx/ThemeContext";

const cookies = new Cookies();

const SideBar = ({ logout }) => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  return (
    <aside
      className={`h-screen p-4 py-8 border-r border-gray-300 flex flex-col justify-between items-center ${
        darkTheme && "bg-[#23272a] border-gray-700"
      }`}
    >
      <img
        src={Logo}
        alt="stream play logo"
        className="size-8 cursor-pointer"
      />
      <div className="text-2xl text-gray-500 flex flex-col gap-2 items-center">
        <NavLink
          to={"/chats"}
          className={({ isActive }) =>
            isActive && "bg-indigo-500 text-white rounded-full"
          }
        >
          <div
            className={
              "hover:text-white hover:bg-indigo-500 p-3 rounded-lg cursor-pointer"
            }
            title="All Chats"
          >
            <BsChat />
          </div>
        </NavLink>
        <NavLink
          to={"/channels"}
          className={({ isActive }) =>
            isActive && "bg-indigo-500 text-white rounded-full"
          }
        >
          <div
            className="hover:text-white hover:bg-indigo-500 p-3 rounded-lg cursor-pointer"
            title="Channels"
          >
            <PiSquaresFourLight />
          </div>
        </NavLink>
      </div>
      <div className="text-2xl text-gray-500 flex flex-col gap-4 items-center">
        <div
          className="cursor-pointer hover:bg-indigo-500 hover:text-white p-2 rounded-full"
          onClick={() => setDarkTheme((prevState) => !prevState)}
        >
          {darkTheme ? <FiSun /> : <IoMoonOutline />}
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
  const navigate = useNavigate();
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("hashedPassword");
    cookies.remove("email");
    navigate("/");
    window.location.reload();
  };
  return <SideBar logout={logout} />;
};

export default Menu;
