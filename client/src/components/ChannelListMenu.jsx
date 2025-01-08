import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearchBar, ChatList } from "./";

const ChannelListMenu = () => {
  return (
    <div className="h-screen w-1/3 p-5 border-r border-gray-300">
      <div className="w-full h-full">
        <ChannelSearchBar />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => <ChatList {...listProps} type={"team"} />}
        />
      </div>
    </div>
  );
};

export default ChannelListMenu;
