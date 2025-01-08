import React from "react";
import ChatElement from "./ChatElement";

const ChatList = ({ children, error = false, loading, type }) => {
  const messages = [
    {
      name: "Alice Johnson",
      time: "10:15 AM",
      deliveryStatus: "delivered",
      message: "Hey, are you free today?",
    },
    {
      name: "Bob Smith",
      time: "11:00 AM",
      deliveryStatus: "read",
      message: "Don't forget the meeting at 3 PM.",
    },
    {
      name: "Charlie Davis",
      time: "1:45 PM",
      deliveryStatus: "failed",
      message: "Can you call me back?",
    },
    {
      name: "Diana Brown",
      time: "2:30 PM",
      deliveryStatus: "read",
      message: "Got it, thanks!",
    },
    {
      name: "Evan Williams",
      time: "3:20 PM",
      deliveryStatus: "delivered",
      message: "See you tomorrow.",
    },
    {
      name: "Fiona Clark",
      time: "4:05 PM",
      deliveryStatus: "failed",
      message: "The files didn't upload. Can you resend?",
    },
    {
      name: "George Miller",
      time: "5:00 PM",
      deliveryStatus: "delivered",
      message: "Let’s finalize the designs this week.",
    },
  ];
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
    <div className="h-[70%] mt-5 bg-pink">
      <h2 className="mb-5 font-semibold">
        {type === "team" ? "Channel Chats" : "Direct Messages"}
      </h2>
      <div className="h-full">
        <ul className="h-full overflow-hidden hover:overflow-y-scroll flex flex-col gap-2 scrollbar-thin scrollbar-thumb-indigo-500 px-1">
          {messages.map((item) => (
            <li className="w-full h-full first:bg-gray-200 rounded-lg">
              <ChatElement
                name={item.name}
                time={item.time}
                deliveryStatus={item.deliveryStatus}
                message={item.message}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatList;
