import React from "react";
import { Channel } from "stream-chat-react";
import ChatBoxTopBar from "./ChatBoxTopBar";
import ChatBoxMiddle from "./ChatBoxMiddle";

const ChatBox = ({ openInfo, channel }) => {
  console.log(channel);
  return (
    <div className="w-2/3 h-screen">
      <Channel channel={channel}>
        <ChatBoxTopBar channel={channel} openInfo={openInfo} />
        <ChatBoxMiddle channel={channel} />
      </Channel>
    </div>
  );
};

export default ChatBox;
