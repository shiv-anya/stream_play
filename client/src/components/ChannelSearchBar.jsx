import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const ChannelSearchBar = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getChannels = () => {
    try {
      //Code to get channel list
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
      <button className="bg-indigo-500 p-3 rounded-lg text-xl text-white">
        <IoMdAdd />
      </button>
    </div>
  );
};

export default ChannelSearchBar;
