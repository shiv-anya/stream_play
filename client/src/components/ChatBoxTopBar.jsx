import React from "react";
import { IoIosCall } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { useChannelStateContext, useChatContext } from "stream-chat-react";

const ChatBoxTopBar = ({ openInfo }) => {
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();
  const type = channel?.type;
  const members = Object.values(channel?.state?.members);
  const otherUser = members.find((member) => member.user.id !== client.userID);
  const name = type === "team" ? channel?.data?.name : otherUser.user?.name;
  const isOnline = otherUser?.user?.online;
  let status = "offline";
  if (type === "team") {
    status = "Tap here for channel info";
  } else {
    if (isOnline) {
      status = "online";
    } else status = "offline";
  }

  return (
    <div className="h-[15%] flex justify-between items-center p-5 w-full bg-white">
      <div className="flex gap-4">
        <div className="relative">
          <div className="bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400')] size-10 bg-cover bg-center rounded-full"></div>
          {type === "messaging" && isOnline && (
            <div className="border border-white size-2 bg-green-400 absolute bottom-1 right-0 rounded-full"></div>
          )}
        </div>
        <div className="flex flex-col" onClick={openInfo}>
          <h3>{name}</h3>
          <span className="text-xs text-gray-700">{status}</span>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="text-xl text-gray-400 hover:bg-gray-300 bg-gray-200 rounded-full p-2 cursor-pointer">
          <IoVideocam />
        </div>
        <div className="text-xl text-gray-400 hover:bg-gray-300 bg-gray-200 rounded-full p-2 cursor-pointer">
          <IoIosCall />
        </div>
        <div className="text-xl text-gray-400 hover:bg-gray-300 bg-gray-200 rounded-full p-2 cursor-pointer">
          <BsThreeDots onClick={openInfo} />
        </div>
      </div>
    </div>
  );
};

export default ChatBoxTopBar;
