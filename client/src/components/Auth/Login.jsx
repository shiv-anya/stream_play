import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import { FaArrowLeft } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoMailOutline, IoCameraOutline, IoAtSharp } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { LuCircleCheckBig } from "react-icons/lu";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const FormDiv = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(true);
  const toggleSignUp = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { fullName, username, email, password } = form;
    console.log(form);
    const BASE_URL =
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_LOCAL_URL
        : process.env.REACT_APP_BACKEND_URL;
    const URL = `${BASE_URL}/auth`;
    const {
      data: { token, userId, hashedPassword },
    } = await axios.post(`${URL}/${isSignUp ? "signup" : "login"}`, {
      fullName,
      username,
      email,
      password,
    });
    console.log(username + " " + token + " " + email + " " + hashedPassword);
    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);
    if (isSignUp) {
      cookies.set("hashedPassword", hashedPassword);
      cookies.set("email", email);
    }
    navigate("/chats");
    window.location.reload();
  };
  return (
    <div className="h-screen w-1/2 flex items-center justify-center p-2">
      <div className="w-[55%]">
        <div className="flex items-center justify-between text-sm">
          <button
            className="p-2 border border-gray-300 rounded-full"
            onClick={toggleSignUp}
          >
            <FaArrowLeft />
          </button>
          <div className="flex gap-2 items-center">
            {isSignUp ? "Already member?" : "Don't have an account?"}
            <div
              className="text-indigo-700 cursor-pointer"
              onClick={toggleSignUp}
            >
              <p>{isSignUp ? "Sign In" : "Sign Up"}</p>
              <div className="rounded-lg h-1 w-full bg-indigo-200 mt-1"></div>
            </div>
          </div>
        </div>
        <div className="my-5 flex flex-col gap-2">
          <h2 className="text-3xl font-semibold">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
          <p className="text-sm text-gray-500">Your world, one stream away.</p>
        </div>
        <form
          className="w-full flex flex-col gap-7"
          onSubmit={handleFormSubmit}
        >
          {isSignUp && (
            <div>
              <div className="w-full flex items-center justify-between p-2">
                <div className="flex gap-4 items-center w-full">
                  <label className="text-gray-200">
                    <FaRegUser />
                  </label>
                  <input
                    name="fullName"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="John Doe"
                    className="w-full outline-none text-sm"
                  />
                </div>
                <div className="text-green-500">
                  <LuCircleCheckBig />
                </div>
              </div>
              <div className="w-full bg-gray-200 h-[2px] rounded-lg"></div>
            </div>
          )}
          <div>
            <div className="w-full flex items-center justify-between p-2">
              <div className="flex gap-4 items-center w-full">
                <label className="text-gray-200">
                  <IoAtSharp />
                </label>
                <input
                  name="username"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="user_name"
                  className="w-full outline-none text-sm"
                />
              </div>
              <div className="text-green-500">
                <LuCircleCheckBig />
              </div>
            </div>
            <div className="w-full bg-gray-200 h-[2px] rounded-lg"></div>
          </div>
          {isSignUp && (
            <div>
              <div className="w-full flex items-center justify-between p-2">
                <div className="flex gap-4 items-center w-full">
                  <label className="text-gray-200">
                    <IoMailOutline />
                  </label>
                  <input
                    name="email"
                    onChange={handleInputChange}
                    type="email"
                    placeholder="johndoe84@google.com"
                    className="w-full outline-none text-sm"
                  />
                </div>
                <div className="text-green-500">
                  <LuCircleCheckBig />
                </div>
              </div>
              <div className="w-full bg-gray-200 h-[2px] rounded-lg"></div>
            </div>
          )}
          <div>
            <div className="w-full flex items-center justify-between p-2">
              <div className="flex gap-4 items-center w-full">
                <label className="text-gray-200">
                  <TbLockPassword />
                </label>
                <input
                  name="password"
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Password"
                  className="w-full outline-none text-sm"
                />
              </div>
              <div className="text-gray-500">
                <FaRegEyeSlash />
              </div>
            </div>
            <div className="w-full bg-gray-200 h-[2px] rounded-lg"></div>
          </div>
          {isSignUp && (
            <div>
              <div className="w-full flex items-center justify-between p-2">
                <div className="flex gap-4 items-center w-full">
                  <label className="text-gray-200">
                    <TbLockPassword />
                  </label>
                  <input
                    name="confirmPassword"
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Re-Type Password"
                    className="w-full outline-none text-sm"
                  />
                </div>
                <div className="text-green-500">
                  <LuCircleCheckBig />
                </div>
              </div>
              <div className="w-full bg-gray-200 h-[2px] rounded-lg"></div>
            </div>
          )}
          <div className="flex w-full justify-between items-center">
            <button className="bg-indigo-500 text-white flex items-center py-2 px-7 gap-4 rounded-3xl hover:bg-indigo-700 transition duration-300 ease-in-out">
              {isSignUp ? "Sign Up" : "Sign In"}
              <span className="bg-[rgba(255,255,255,0.5)] rounded-full p-2 text-white">
                <FaArrowRight />
              </span>
            </button>
            <p className="text-gray-500">Or</p>
            <div className="flex items-center text-2xl gap-4">
              <button className="p-2 bg-gray-200 rounded-full text-blue-700 hover:bg-gray-300 transition duration-300 ease-in-out">
                <MdFacebook />
              </button>
              <button className="p-2 bg-gray-200 rounded-full text-blue-700 hover:bg-gray-300 transition duration-300 ease-in-out">
                <FcGoogle />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const DesignSection = () => {
  return (
    <div className="w-1/2 bg-indigo-500 h-screen -skew-x-6 relative">
      <div className="size-72 bg-indigo-800 rounded-3xl skew-x-6 absolute -left-12 -top-44 -rotate-12"></div>
      <div className="bg-indigo-400 size-64 skew-x-6 rounded-3xl absolute -right-4 -top-32 rotate-12"></div>
      <div className="w-full h-2/3 p-5 overflow-hidden absolute bottom-0">
        <div className="bg-indigo-400 w-2/3 h-full rounded-3xl -rotate-6 skew-x-6 absolute -left-12"></div>
      </div>
      <div className="h-[300px] w-[800px] bg-blue-400 rounded-3xl skew-x-6 absolute bottom-4 -rotate-[40deg] -right-32"></div>
      <div className="bg-blue-500 skew-x-6 rounded-3xl size-72 absolute -bottom-8 -right-12 -rotate-12"></div>
    </div>
  );
};

const Login = () => {
  return (
    <div className="h-screen w-full flex overflow-hidden">
      <FormDiv />
      <DesignSection />
    </div>
  );
};

export default Login;
