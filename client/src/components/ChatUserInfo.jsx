import React, { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { FaFileAudio, FaFilePdf, FaFileVideo } from "react-icons/fa";
import { useNavigate } from "react-router";

const TopInfo = ({ name, status, email, type, title, memberCount }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <div className="size-16 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400')] bg-center bg-cover rounded-full"></div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">
              {type === "messaging" ? name : title}
            </span>
            <span className="text-xs font-semibold text-gray-400">
              {type === "messaging"
                ? status
                  ? "online"
                  : "offline"
                : memberCount > 1
                ? `${memberCount} members`
                : "1 member"}
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button className="p-2 text-2xl bg-gray-200 hover:bg-gray-300 text-gray-400 rounded-full">
            <IoIosCall />
          </button>
          <button className="p-2 text-2xl bg-gray-200 hover:bg-gray-300 text-gray-400 rounded-full">
            <IoVideocam />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        {email && (
          <div className="flex flex-col bg-gray-100 p-4 rounded-xl">
            <span className="text-xs font-semibold text-gray-400">Email</span>
            <span className="text-sm font-semibold text-gray-700">{email}</span>
          </div>
        )}
        <div className="flex flex-col bg-gray-100 p-4 rounded-xl w-full">
          <span className="text-xs font-semibold text-gray-400">About me</span>
          <p className="whitespace-nowrap text-sm font-semibold text-gray-700 overflow-hidden hover:overflow-x-scroll scrollbar-thin scrollbar-thumb-indigo-500 pb-2">
            The less you know the better #idkwhattowritelol.
          </p>
        </div>
      </div>
    </div>
  );
};

const MediaMenu = ({ mediaMessages, members, id }) => {
  const [mediaMenuActive, setMediaMenuActive] = useState(true);
  const navigate = useNavigate();
  const getFileIcon = (type, attachment) => {
    if (type.startsWith("image") || type.startsWith("giphy"))
      return (
        <img
          key={Math.random() * 1000}
          src={attachment.image_url || attachment.thumb_url}
          alt="Shared media"
          className="w-full h-full rounded-lg"
        />
      );
    if (type.startsWith("video"))
      return <FaFileVideo className="size-8 text-indigo-500" />;
    if (type.startsWith("voice"))
      return <FaFileAudio className="size-8 text-indigo-500" />;
    return <FaFilePdf className="size-8 text-indigo-500" />;
  };
  const handleUserClick = (userId) => {
    navigate(`/chats?user=${userId}`);
  };
  return (
    <div className="pt-5">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Channel Data</h2>
        <button className="text-xs text-gray-500">
          <MdArrowForwardIos />
        </button>
      </div>
      <div className="mt-2">
        <ul className="flex text-xs overflow-hidden gap-4">
          <li
            className="cursor-pointer"
            onClick={() => setMediaMenuActive(true)}
          >
            <span>Media</span>
            {mediaMenuActive && (
              <div className="rounded-lg h-1 mt-1 bg-indigo-200"></div>
            )}
          </li>
          <li
            className="cursor-pointer"
            onClick={() => setMediaMenuActive(false)}
          >
            <span>Members</span>
            {!mediaMenuActive && (
              <div className="rounded-lg h-1 mt-1 bg-indigo-200"></div>
            )}
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-5">
        {mediaMenuActive &&
          mediaMessages.map((msg) =>
            msg.attachments.map((attachment, index) => (
              <div
                className="flex justify-center items-center"
                key={attachment.id}
              >
                <a
                  href={
                    attachment.image_url ||
                    attachment.thumb_url ||
                    attachment.asset_url
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {getFileIcon(attachment.type, attachment)}
                </a>
              </div>
            ))
          )}
      </div>
      {!mediaMenuActive && members.length > 0 && (
        <ul className="w-full">
          {members.map((user) => (
            <li
              key={user.user.id}
              className="w-full p-2 flex justify-between items-center border-b gap-4"
            >
              <div className="text-sm">
                <p>{user.user.name}</p>
              </div>
              {id !== user.user.id && (
                <button
                  className="text-xs border border-indigo-500 rounded-full px-2 py-1 hover:bg-indigo-500 hover:text-white"
                  onClick={() => {
                    handleUserClick(user.id);
                  }}
                >
                  Message
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ChatUserInfo = () => {
  const { channel, messages } = useChannelStateContext();
  const { client } = useChatContext();
  const type = channel?.type;
  const members = Object.values(channel?.state?.members);
  const otherUser = members.find((member) => member.user.id !== client.userID);
  const mediaMessages = messages.filter((msg) => msg.attachments?.length > 0);
  return (
    <aside className="h-screen w-[40%] p-4 pt-8 overflow-y-scroll scrollbar-thin scrollbar-thumb-indigo-500">
      <TopInfo
        name={otherUser?.user?.name}
        status={otherUser?.user?.online}
        email={otherUser?.user?.email}
        title={channel?.data?.name}
        memberCount={channel?.data?.member_count}
        type={type}
      />
      <MediaMenu
        mediaMessages={mediaMessages}
        members={members}
        id={client.userID}
      />
    </aside>
  );
};

export default ChatUserInfo;
