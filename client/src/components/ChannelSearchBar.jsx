import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Modal from "./UI/Modal";
import GenericList from "./GenericList";

const ChannelSearchBar = ({ list }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openList, setOpenList] = useState(false);
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
      <form className="bg-gray-100 rounded-lg flex w-full flex-row">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-100 outline-none p-3 rounded-lg text-sm w-full"
          value={query}
          onChange={searchHandler}
        />
        <button className="p-3 text-xl text-gray-500">
          <CiSearch />
        </button>
      </form>
      <Modal isOpen={openList} onClose={() => setOpenList(false)}>
        <GenericList
          list={list}
          type={"team"}
          onClose={() => setOpenList(false)}
        />
      </Modal>
      <button
        className="bg-indigo-500 p-3 rounded-lg text-xl text-white"
        onClick={() => setOpenList(true)}
      >
        <IoMdAdd />
      </button>
    </div>
  );
};

export default ChannelSearchBar;
