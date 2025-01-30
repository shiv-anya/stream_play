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
    setSelectedChannel(channel);
  };
  return (
    <Layout>
      <div className="flex">
        <ChannelListMenu onSelect={handleClick} type={selectedChannel?.type} />
        <ChatBox
          openInfo={openInfo}
          open={infoMenuOpen}
          channel={selectedChannel}
        />
        {/* {infoMenuOpen && <ChatUserInfo />} */}
      </div>
    </Layout>
  );
};

export default AllChannels;
