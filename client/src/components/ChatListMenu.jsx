import React from "react";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import {
  MdCheckCircleOutline,
  MdDoneAll,
  MdErrorOutline,
} from "react-icons/md";

const SearchBar = () => {
  return (
    <div className="flex w-full justify-between gap-2">
      <form className="bg-gray-100 rounded-lg flex w-full flex-row">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-100 outline-none p-3 rounded-lg text-sm w-full"
        />
        <button className="p-3 text-xl text-gray-500">
          <CiSearch />
        </button>
      </form>
      <button className="bg-indigo-500 p-3 rounded-lg text-xl text-white">
        <IoMdAdd />
      </button>
    </div>
  );
};

const FilterList = () => {
  return (
    <ul className="text-xs flex gap-4 my-5">
      <li className="flex flex-col items-center gap-1">
        <button>All</button>
        <div className="rounded-full bg-indigo-500 size-1"></div>
      </li>
      <li className="flex flex-col items-center gap-1">
        <button>Direct</button>
        <div className="rounded-full bg-indigo-500 size-1"></div>
      </li>
    </ul>
  );
};
const StoryElement = ({ name, img }) => {
  console.log(img);
  const imageUrl = require(`../img/${img}`);
  console.log(imageUrl);
  return (
    <div className="h-full mt-5 flex flex-col items-center gap-1">
      <div
        className={`w-full h-full rounded-lg bg-cover bg-center bg-no-repeat`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <p>{name.substring(0, 8) + "..."}</p>
    </div>
  );
};
const Stories = () => {
  const stories = [
    {
      name: "John Doe",
      img: "img-1.jpg",
    },
    {
      name: "Emily Carter",
      img: "img-2.jpg",
    },
    {
      name: "Michael Smith",
      img: "img-3.jpg",
    },
    {
      name: "Sophia John",
      img: "img-4.jpg",
    },
  ];

  return (
    <div className="w-full h-[20%]">
      <h2 className="font-semibold">Stories</h2>
      <div className="w-full h-full">
        <ul className="w-full flex text-xs h-full gap-4 flex-row">
          {stories.map((item) => (
            <li key={item.name} className="flex-1">
              <StoryElement name={item.name} img={item.img} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ChatElement = ({ name, time, deliveryStatus, message }) => {
  let deliveryIcon = <MdErrorOutline />;
  if (deliveryStatus === "delivered") {
    deliveryIcon = <MdCheckCircleOutline />;
  } else if (deliveryStatus === "read") deliveryIcon = <MdDoneAll />;
  return (
    <div className="w-full h-full rounded-lg hover:bg-gray-200 flex justify-between p-3 items-center">
      <div
        className="size-10 rounded-full bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400')",
        }}
      ></div>
      <div className="w-[80%] flex flex-col gap-1">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-base font-normal">{name}</h3>
          <span className="text-xs">{time}</span>
        </div>
        <div className="flex flex-row gap-2 items-center text-gray-700">
          <span className="text-xs">{deliveryIcon}</span>
          <p className="text-xs">{message}</p>
        </div>
      </div>
    </div>
  );
};

const ChatList = () => {
  const messages = [
    {
      name: "Alice Johnson",
      time: "10:15 AM",
      deliveryStatus: "delivered",
      message: "Hey, are you free today?",
    },
    {
      name: "Bob Smith",
      time: "11:00 AM",
      deliveryStatus: "read",
      message: "Don't forget the meeting at 3 PM.",
    },
    {
      name: "Charlie Davis",
      time: "1:45 PM",
      deliveryStatus: "failed",
      message: "Can you call me back?",
    },
    {
      name: "Diana Brown",
      time: "2:30 PM",
      deliveryStatus: "read",
      message: "Got it, thanks!",
    },
    {
      name: "Evan Williams",
      time: "3:20 PM",
      deliveryStatus: "delivered",
      message: "See you tomorrow.",
    },
    {
      name: "Fiona Clark",
      time: "4:05 PM",
      deliveryStatus: "failed",
      message: "The files didn't upload. Can you resend?",
    },
    {
      name: "George Miller",
      time: "5:00 PM",
      deliveryStatus: "delivered",
      message: "Let’s finalize the designs this week.",
    },
  ];

  return (
    <div className="h-[40%] mt-16">
      <h2 className="mb-5 font-semibold">Chats</h2>
      <div className="h-full">
        <ul className="h-full overflow-hidden hover:overflow-y-scroll flex flex-col gap-2 scrollbar-thin scrollbar-thumb-indigo-500">
          {messages.map((item) => (
            <li className="w-full h-full first:bg-gray-200 rounded-lg">
              <ChatElement
                name={item.name}
                time={item.time}
                deliveryStatus={item.deliveryStatus}
                message={item.message}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ChatListMenu = () => {
  return (
    <div className="h-screen w-1/3 p-5 border-r border-gray-300">
      <SearchBar />
      <FilterList />
      <Stories />
      <ChatList />
    </div>
  );
};

export default ChatListMenu;
