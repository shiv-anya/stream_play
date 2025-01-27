import React from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";

const GenericList = ({ list, type, onClose }) => {
  const navigate = useNavigate();
  const handleUserClick = (userId) => {
    navigate(`/chats?user=${userId}`);
  };
  console.log(list);
  return (
    <div className="bg-white w-1/3 h-screen">
      <div className="bg-indigo-500 h-[10%] w-full text-white flex justify-between items-center p-5 text-lg font-semibold">
        <h1>{type === "messaging" ? "All Users" : "All Channels"}</h1>
        <button onClick={onClose} className="flex items-center">
          <FaTimes />
        </button>
      </div>
      <ul className="w-full">
        {list.map((user) => (
          <li
            key={user.id}
            className="w-full p-5 flex justify-evenly items-center border-b gap-4"
          >
            <div className="size-12 bg-indigo-500 rounded-full relative">
              {user.online && (
                <div className="size-2 rounded-full bg-green-300 absolute bottom-1 right-1"></div>
              )}
            </div>
            <div className="w-[50%] flex flex-col justify-center">
              <p>{user.name}</p>
              <p className="text-xs">Hey there!</p>
            </div>
            <button
              className="text-sm border border-indigo-500 rounded-full px-5 py-2 hover:bg-indigo-500 hover:text-white"
              onClick={() => handleUserClick(user.id)}
            >
              Message
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenericList;
