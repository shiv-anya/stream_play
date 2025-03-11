import React, { useState, useEffect, useContext } from "react";
import { useChatContext } from "stream-chat-react";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Modal from "./UI/Modal";
import CreateChannel from "./CreateChannel";
import ThemeContext from "../ctx/ThemeContext";

const ChannelSearchBar = ({ onChannelSelect }) => {
  const { client } = useChatContext();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [channels, setChannels] = useState([]);
  const { darkTheme } = useContext(ThemeContext);
  useEffect(() => {
    if (!query) return setChannels([]);

    const fetchChannels = async () => {
      const response = await client.queryChannels({
        name: { $autocomplete: query },
        members: { $in: [client.userID] },
      });
      setChannels(response);
    };

    fetchChannels();
  }, [query]);
  return (
    <div className="flex w-full justify-between gap-2">
      <form
        className={`${
          darkTheme ? "bg-gray-700" : "bg-gray-100"
        } rounded-lg flex w-full flex-row relative`}
      >
        <input
          type="text"
          placeholder="Search by channel name"
          className={`${
            darkTheme ? "bg-gray-700" : "bg-gray-100"
          } outline-none p-3 rounded-lg text-sm w-full`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="p-3 text-xl text-gray-500">
          <CiSearch />
        </div>
        {query.length > 0 && (
          <ul
            className={`absolute w-full border rounded-md shadow-lg z-10 top-14 p-1 ${
              darkTheme
                ? "bg-[#23272a] text-gray-300 border-gray-600"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {channels.length > 0 ? (
              channels.map((user) => (
                <li
                  key={user.id}
                  className={`p-2 ${
                    darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } rounded-lg cursor-pointer`}
                  onClick={() => onChannelSelect(user)}
                >
                  {user.name}
                </li>
              ))
            ) : (
              <li
                className={`p-2 ${
                  darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } rounded-lg cursor-pointer`}
              >
                No results found!
              </li>
            )}
          </ul>
        )}
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
