import React, { useEffect, useState, useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Modal from "./UI/Modal";
import { ChannelList, useChatContext } from "stream-chat-react";
import ChatList from "./ChatList";
import ChatElement from "./ChatElement";
import GenericList from "./GenericList";
import ThemeContext from "../ctx/ThemeContext";
import { useNavigate } from "react-router";

const SearchBar = ({ darkTheme, onSelect }) => {
  const [openList, setOpenList] = useState(false);
  const { client } = useChatContext();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate();
  const openUserChat = async (user) => {
    const channel = client.channel("messaging", {
      members: [client.user.id, user.id],
    });
    await channel.watch();
    setQuery("");
    onSelect(channel);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.queryUsers(
          { role: "user" },
          { limit: 100 }
        );
        const filteredUsers = response.users.filter(
          (user) => user.id !== client.userID
        );
        setUsersList(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    if (!query) return setUsers([]);

    const fetchUsers = async () => {
      const response = await client.queryUsers({
        name: { $autocomplete: query },
      });
      const filteredUsers = response.users.filter(
        (user) => client._user.name !== user.name
      );
      setUsers(filteredUsers);
    };

    fetchUsers();
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
          placeholder="Search by username"
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
            {users.length > 0 ? (
              users.map((user) => (
                <li
                  key={user.id}
                  className={`p-2 ${
                    darkTheme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } rounded-lg cursor-pointer`}
                  onClick={() => openUserChat(user)}
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
        <GenericList
          list={usersList}
          type={"messaging"}
          onClose={() => setOpenList(false)}
        />
      </Modal>
      <button
        className="bg-indigo-500 p-3 rounded-lg text-xl text-white"
        onClick={() => setOpenList(true)}
        title="New Message"
      >
        <IoMdAdd />
      </button>
    </div>
  );
};

const StoryElement = ({ name, img }) => {
  const imageUrl = require(`../img/${img}`);
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
    setSelectedStory(story);
  };

  const closeModal = () => {
    setSelectedStory(null);
  };
  return (
    <div className="w-full h-[20%] mb-16 my-5">
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

const ChatListMenu = ({ onSelect, id }) => {
  const { client } = useChatContext();
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div
      className={`h-screen w-1/3 p-5 border-r border-gray-300 ${
        darkTheme && "bg-[#23272a] border-gray-700 text-gray-300"
      }`}
    >
      <SearchBar darkTheme={darkTheme} onSelect={onSelect} />
      <Stories />
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [client.userID] },
        }}
        options={{ state: true, watch: true, presence: true }}
        sort={{ last_message_at: -1 }}
        List={(props) => {
          return <ChatList {...props} type="messaging" />;
        }}
        Preview={(props) => {
          return <ChatElement {...props} onSelect={onSelect} id={id} />;
        }}
      />
    </div>
  );
};

export default ChatListMenu;
