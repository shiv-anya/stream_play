import React from "react";
import { Channel } from "stream-chat-react";
import ChatBoxTopBar from "./ChatBoxTopBar";
import ChatBoxMiddle from "./ChatBoxMiddle";
import { EmojiPicker } from "stream-chat-react/emojis";
import ChatUserInfo from "./ChatUserInfo";

const ChatBox = ({ openInfo, open, channel }) => {
  return (
    <Channel channel={channel} EmojiPicker={EmojiPicker}>
      <div className="flex h-full">
        <div className="w-full flex flex-col h-full">
          <ChatBoxTopBar openInfo={openInfo} />
          <ChatBoxMiddle />
        </div>
        {open && <ChatUserInfo />}
      </div>
    </Channel>
  );
};

export default ChatBox;
