import React, { useState, useEffect, useContext } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearchBar, ChatElement, ChatList } from "./";
import ThemeContext from "../ctx/ThemeContext";

const ChannelListMenu = ({ onSelect, id }) => {
  const { client } = useChatContext();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const filters = { type: "team", is_public: true };
        const sort = { created_at: -1 };
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
    <div
      className={`h-screen w-1/3 p-5 border-r ${
        darkTheme
          ? "bg-[#23272a] border-gray-700 text-gray-300"
          : "bg-white border-gray-300"
      }`}
    >
      <div className="w-full h-full">
        <ChannelSearchBar list={channels} onSelect={onSelect} />
        <ChannelList
          filters={{ type: "team", members: { $in: [client.userID] } }}
          options={{ state: true, watch: true, presence: true }}
          sort={{ last_message_at: -1 }}
          List={(props) => {
            return <ChatList {...props} type="team" />;
          }}
          Preview={(props) => {
            return <ChatElement {...props} onSelect={onSelect} id={id} />;
          }}
        />
      </div>
    </div>
  );
};

export default ChannelListMenu;
