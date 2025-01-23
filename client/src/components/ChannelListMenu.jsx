import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearchBar, ChatElement, ChatList } from "./";

const ChannelListMenu = ({ onSelect }) => {
  const { client } = useChatContext();
  const filters = { members: { $in: [client.userID] } }; // Filter for channels the user is part of
  const options = { state: true, watch: true, presence: true };
  const sort = { last_message_at: -1 }; // Sort channels by the latest message
  return (
    <div className="h-screen w-1/3 p-5 border-r border-gray-300">
      <div className="w-full h-full">
        <ChannelSearchBar />
        <ChannelList
          filters={filters}
          options={options}
          sort={sort}
          List={(props) => {
            return <ChatList {...props} />;
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
