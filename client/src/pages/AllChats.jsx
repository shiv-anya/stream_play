import React, { useState } from "react";
import { ChatBox, ChatListMenu, ChatUserInfo } from "../components";
import Layout from "../components/UI/Layout";

const AllChats = () => {
  const [infoMenuOpen, setInfoMenuOpen] = useState(false);
  const openInfo = () => {
    setInfoMenuOpen(!infoMenuOpen);
  };
  return (
    <Layout>
      <div className="flex">
        <ChatListMenu />
        <ChatBox openInfo={openInfo} />
        {infoMenuOpen && <ChatUserInfo />}
      </div>
    </Layout>
  );
};

export default AllChats;
