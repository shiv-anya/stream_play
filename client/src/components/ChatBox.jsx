import React from "react";
import ChatBoxTopBar from "./ChatBoxTopBar";
import ChatBoxMiddle from "./ChatBoxMiddle";

const ChatBox = ({ openInfo }) => {
  return (
    <div className="w-2/3 h-screen">
      <ChatBoxTopBar openInfo={openInfo} />
      <ChatBoxMiddle />
    </div>
  );
};

export default ChatBox;
