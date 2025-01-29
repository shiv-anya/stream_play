import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Modal from "./UI/Modal";
import { ChannelList, useChatContext } from "stream-chat-react";
import ChatList from "./ChatList";
import ChatElement from "./ChatElement";
import GenericList from "./GenericList";

const SearchBar = () => {
  const [openList, setOpenList] = useState(false);
  const { client } = useChatContext();
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.queryUsers(
          { role: "user" },
          { limit: 30 }
        );
        setUsersList(response.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
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
      >
        <IoMdAdd />
      </button>
    </div>
  );
};

// const FilterList = () => {
//   return (
//     <ul className="text-xs flex gap-4 my-5">
//       <li className="flex flex-col items-center gap-1">
//         <button>All</button>
//         <div className="rounded-full bg-indigo-500 size-1"></div>
//       </li>
//       <li className="flex flex-col items-center gap-1">
//         <button>Direct</button>
//         <div className="rounded-full bg-indigo-500 size-1"></div>
//       </li>
//     </ul>
//   );
// };
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
    setSelectedStory(story); // Set the selected story to display in the modal
  };

  const closeModal = () => {
    setSelectedStory(null); // Reset selected story to close the modal
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

const ChatListMenu = ({ onSelect }) => {
  const { client } = useChatContext();
  return (
    <div className="h-screen w-1/3 p-5 border-r border-gray-300">
      <SearchBar />
      <Stories />
      <ChannelList
        filters={{ type: "messaging", members: { $in: [client.userID] } }}
        options={{ state: true, watch: true, presence: true }}
        sort={{ last_message_at: -1 }}
        List={(props) => {
          return <ChatList {...props} type="messaging" />;
        }}
        Preview={(props) => {
          console.log(props);
          return <ChatElement {...props} onSelect={onSelect} />;
        }}
      />
    </div>
  );
};

export default ChatListMenu;
