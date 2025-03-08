import React, { useState, useEffect, useContext } from "react";
import { useChatContext } from "stream-chat-react";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Modal from "./UI/Modal";
import GenericList from "./GenericList";
import CreateChannel from "./CreateChannel";
import ThemeContext from "../ctx/ThemeContext";

const ChannelSearchBar = ({ list }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openList, setOpenList] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const getChannels = () => {
    try {
    } catch (e) {
      setQuery("");
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };
  return (
    <div className="flex w-full justify-between gap-2">
      <form
        className={`${
          darkTheme ? "bg-gray-700" : "bg-gray-100"
        } rounded-lg flex w-full flex-row`}
      >
        <input
          type="text"
          placeholder="Search"
          className={`${
            darkTheme ? "bg-gray-700" : "bg-gray-100"
          } outline-none p-3 rounded-lg text-sm w-full`}
          value={query}
          onChange={searchHandler}
        />
        <button className="p-3 text-xl text-gray-500">
          <CiSearch />
        </button>
      </form>
      <Modal isOpen={openList} onClose={() => setOpenList(false)}>
        <CreateChannel onClose={() => setOpenList(false)} />
      </Modal>
      <button
        className="bg-indigo-500 p-3 rounded-lg text-xl text-white"
        onClick={() => setOpenList(true)}
        title="Create Channel"
      >
        <IoMdAdd />
      </button>
    </div>
  );
};

export default ChannelSearchBar;
