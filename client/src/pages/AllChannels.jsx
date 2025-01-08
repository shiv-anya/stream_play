import React from "react";
import { Channel, useChatContext } from "stream-chat-react";
import { ChannelListMenu, ChatBox } from "../components";

const AllChannels = () => {
  const { channel } = useChatContext();
  return (
    <div className="flex">
      <ChannelListMenu />
      <ChatBox />
    </div>
  );
};

export default AllChannels;
