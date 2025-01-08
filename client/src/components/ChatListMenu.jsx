import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Modal from "./UI/Modal";
import ChatList from "./ChatList";

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
  const [selectedStory, setSelectedStory] = useState(null);

  const openModal = (story) => {
    console.log("here");
    setSelectedStory(story); // Set the selected story to display in the modal
  };

  const closeModal = () => {
    setSelectedStory(null); // Reset selected story to close the modal
  };
  return (
    <div className="w-full h-[20%] mb-16">
      <h2 className="font-semibold">Stories</h2>
      <div className="w-full h-full">
        <ul className="w-full flex text-xs h-full gap-4 flex-row">
          {stories.map((item) => (
            <li
              key={item.name}
              className="flex-1 cursor-pointer"
              onClick={() => openModal(item)}
            >
              <StoryElement name={item.name} img={item.img} />
            </li>
          ))}
        </ul>
        {selectedStory && (
          <Modal isOpen={!!selectedStory} onClose={closeModal}>
            <div className="h-[98%] w-1/4 rounded-3xl bg-white">
              <div
                style={{
                  backgroundImage: `url(${require(`../img/${selectedStory.img}`)})`,
                }}
                className={`h-full w-full bg-cover bg-center rounded-3xl`}
              >
                <div className="w-full bg-[rgba(0,0,0,0.5)] h-[10%] relative rounded-t-3xl p-3 flex justify-between items-center text-white">
                  <div>{selectedStory.name}</div>
                  <div className="cursor-pointer text-lg" onClick={closeModal}>
                    <RxCross2 />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
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
