import React, { useState } from "react";
import { ChatBox, ChatListMenu, ChatUserInfo } from "../components";

const AllChats = () => {
  const [infoMenuOpen, setInfoMenuOpen] = useState(false);
  const openInfo = () => {
    setInfoMenuOpen(!infoMenuOpen);
  };
  return (
    <div className="flex">
      <ChatListMenu />
      <ChatBox openInfo={openInfo} />
      {infoMenuOpen && <ChatUserInfo />}
    </div>
  );
};

export default AllChats;
