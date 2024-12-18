import React from "react";
import { IoIosCall } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import Image1 from "../img/img-1.jpg";
import Image2 from "../img/img-2.jpg";
import Image3 from "../img/img-3.jpg";
import Image4 from "../img/img-4.jpg";
import Image5 from "../img/img-5.jpg";
import Image6 from "../img/img-6.jpg";
import Image7 from "../img/img-7.jpg";
import Image8 from "../img/img-8.jpg";
import Image9 from "../img/img-9.jpg";

const TopInfo = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <div className="size-16 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400')] bg-center bg-cover rounded-full"></div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">Sophia Johnson</span>
            <span className="text-xs font-semibold text-gray-400">online</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button className="p-2 text-2xl bg-gray-200 hover:bg-gray-300 text-gray-400 rounded-full">
            <IoIosCall />
          </button>
          <button className="p-2 text-2xl bg-gray-200 hover:bg-gray-300 text-gray-400 rounded-full">
            <IoVideocam />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <div className="flex flex-col bg-gray-100 p-4 rounded-xl">
          <span className="text-xs font-semibold text-gray-400">Email</span>
          <span className="text-sm font-semibold text-gray-700">
            +91 888 888 888
          </span>
        </div>
        <div className="flex flex-col bg-gray-100 p-4 rounded-xl w-full">
          <span className="text-xs font-semibold text-gray-400">About me</span>
          <p className="whitespace-nowrap text-sm font-semibold text-gray-700 overflow-hidden hover:overflow-x-scroll scrollbar-thin scrollbar-thumb-indigo-500 pb-2">
            The less you know the better #idkwhattowritelol.
          </p>
        </div>
      </div>
    </div>
  );
};

const MediaMenu = () => {
  return (
    <div className="pt-5">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Shared Media</h2>
        <button className="text-xs text-gray-500">
          <MdArrowForwardIos />
        </button>
      </div>
      <div className="mt-2">
        <ul className="flex text-xs overflow-hidden gap-4">
          <li>
            <span>Media</span>
            <div className="rounded-lg h-1 mt-1 bg-indigo-200"></div>
          </li>
          <li>
            <span>Docs</span>
            <div></div>
          </li>
          <li>
            <span>Audio</span>
            <div></div>
          </li>
          <li>
            <span>Links</span>
            <div></div>
          </li>
          <li>
            <span>Voice</span>
            <div></div>
          </li>
        </ul>
      </div>
      <div class="grid grid-cols-3 gap-2 mt-5">
        <img src={Image1} alt="Media 1" class="rounded-tl-lg w-full h-16" />

        <img src={Image2} alt="Media 2" class="w-full h-16" />

        <img src={Image3} alt="Media 3" class="rounded-tr-lg w-full h-16" />

        <img src={Image4} alt="Media 4" class="w-full h-16" />

        <img src={Image5} alt="Media 5" class="w-full h-16" />

        <img src={Image6} alt="Media 6" class="w-full h-16" />

        <img src={Image7} alt="Media 7" class="rounded-bl-lg w-full h-16" />

        <img src={Image8} alt="Media 8" class="w-full h-16" />

        <img src={Image9} alt="Media 9" class="rounded-br-lg w-full h-16" />
      </div>
    </div>
  );
};

const ChatUserInfo = () => {
  return (
    <aside className="h-screen w-1/4 p-4 pt-8 overflow-y-scroll scrollbar-thin scrollbar-thumb-indigo-500">
      <TopInfo />
      <MediaMenu />
    </aside>
  );
};

export default ChatUserInfo;
