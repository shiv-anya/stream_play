import React, { useState, useEffect } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearchBar, ChatElement, ChatList } from "./";

const ChannelListMenu = ({ onSelect }) => {
  const { client } = useChatContext();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        // Query for all channels
        const filters = { type: "team", is_public: true }; // Empty filters to get all channels
        const sort = { created_at: -1 }; // Sort channels by last message
        const channelList = await client.queryChannels(filters, sort);
        setChannels(channelList);
      } catch (error) {
        console.error("Error fetching channels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, [client]);

  return (
    <div className="h-screen w-1/3 p-5 border-r border-gray-300">
      <div className="w-full h-full">
        <ChannelSearchBar list={channels} />
        <ChannelList
          filters={{ type: "team", members: { $in: [client.userID] } }}
          options={{ state: true, watch: true, presence: true }}
          sort={{ last_message_at: -1 }}
          List={(props) => {
            return <ChatList {...props} type="team" />;
          }}
          Preview={(props) => {
            return <ChatElement {...props} onSelect={onSelect} />;
          }}
        />
      </div>
    </div>
  );
};

export default ChannelListMenu;
