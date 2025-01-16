import React from "react";
import { Channel, useChatContext } from "stream-chat-react";
import { ChannelListMenu, ChatBox } from "../components";
import Layout from "../components/UI/Layout";

const AllChannels = () => {
  const { channel } = useChatContext();
  return (
    <Layout>
      <div className="flex">
        <ChannelListMenu />
        <ChatBox />
      </div>
    </Layout>
  );
};

export default AllChannels;
