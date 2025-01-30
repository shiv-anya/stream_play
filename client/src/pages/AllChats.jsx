import React, { useState, useEffect } from "react";
import { ChatBox, ChatListMenu, ChatUserInfo } from "../components";
import Layout from "../components/UI/Layout";
import { useLocation } from "react-router";
import { useChatContext } from "stream-chat-react";

const AllChats = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [infoMenuOpen, setInfoMenuOpen] = useState(false);
  const { client } = useChatContext();
  const handleClick = (channel) => {
    setSelectedChannel(channel);
  };
  const openInfo = () => {
    setInfoMenuOpen(!infoMenuOpen);
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("user");
  console.log(client);
  useEffect(() => {
    if (userId) {
      // Check if a channel exists between the current user and selected user
      const fetchOrCreateChannel = async () => {
        try {
          const channel = client.channel("messaging", {
            members: [client.user.id, userId],
          });

          await channel.watch();
        } catch (error) {
          console.error("Error fetching or creating channel:", error);
        }
      };

      fetchOrCreateChannel();
    }
  }, [userId]);
  return (
    <Layout>
      <div className="flex">
        <ChatListMenu onSelect={handleClick} />
        <ChatBox
          openInfo={openInfo}
          open={infoMenuOpen}
          channel={selectedChannel}
        />
        {/* {infoMenuOpen && <ChatUserInfo channel={selectedChannel} />} */}
      </div>
    </Layout>
  );
};

export default AllChats;
