import React from "react";

const ChatList = ({ children, error = false, loading, type }) => {
  // h-[40%] mt-16
  if (error) {
    return (
      <p className="text-center mt-5">Connection Error. Try again later...</p>
    );
  }
  if (loading) {
    return (
      <p className="text-center mt-5">
        {`${(type = "team" ? "Channels" : "Direct Messages")}`} loading...
      </p>
    );
  }
  return (
    <div className={`${type === "team" ? "h-[90%] mt-5" : "h-[50%] mt-5"}`}>
      <h2 className="mb-5 font-semibold">
        {type === "team" ? "Channel Chats" : "Direct Messages"}
      </h2>
      <div className="h-full">
        <ul className="h-full overflow-hidden hover:overflow-y-scroll flex flex-col gap-2 scrollbar-thin scrollbar-thumb-indigo-500 px-1">
          {children}
        </ul>
      </div>
    </div>
  );
};

export default ChatList;
