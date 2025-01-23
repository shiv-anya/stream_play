import React, { useState } from "react";
import { Channel, useChatContext } from "stream-chat-react";
import { ChannelListMenu, ChatBox, ChatUserInfo } from "../components";
import Layout from "../components/UI/Layout";

const AllChannels = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [infoMenuOpen, setInfoMenuOpen] = useState(false);
  const openInfo = () => {
    setInfoMenuOpen(!infoMenuOpen);
  };
  const handleClick = (channel) => {
    console.log(channel);
    setSelectedChannel(channel);
  };
  return (
    <Layout>
      <div className="flex">
        <ChannelListMenu onSelect={handleClick} />
        <ChatBox openInfo={openInfo} channel={selectedChannel} />
        {infoMenuOpen && <ChatUserInfo />}
      </div>
    </Layout>
  );
};

export default AllChannels;
