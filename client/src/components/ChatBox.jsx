import React from "react";
import { Channel } from "stream-chat-react";
import ChatBoxTopBar from "./ChatBoxTopBar";
import ChatBoxMiddle from "./ChatBoxMiddle";
import { EmojiPicker } from "stream-chat-react/emojis";

const ChatBox = ({ openInfo, channel }) => {
  return (
    <div className="w-2/3 h-screen">
      <Channel channel={channel} EmojiPicker={EmojiPicker}>
        <ChatBoxTopBar openInfo={openInfo} />
        <ChatBoxMiddle />
      </Channel>
    </div>
  );
};

export default ChatBox;
