import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const ChatList = ({ children, error = false, loading, type }) => {
  if (error) {
    return (
      <p className="text-center mt-5">Connection Error. Try again later...</p>
    );
  }
  if (loading) {
    return (
      <div className="w-full h-[70%] flex justify-center items-center">
        <InfinitySpin
          visible={true}
          width="200"
          color="#6366f1"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }
  return (
    <div className={`h-full mt-5`}>
      <h2 className="mb-5 font-semibold">
        {type === "team" ? "Channel Chats" : "Direct Messages"}
      </h2>
      <div className="h-full">
        <ul className="h-full overflow-hidden hover:overflow-y-scroll scrollbar-thin scrollbar-thumb-indigo-500 px-1">
          {children}
        </ul>
      </div>
    </div>
  );
};

export default ChatList;
