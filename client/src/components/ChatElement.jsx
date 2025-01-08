import React from "react";
import {
  MdCheckCircleOutline,
  MdDoneAll,
  MdErrorOutline,
} from "react-icons/md";

const ChatElement = ({ name, time, deliveryStatus, message }) => {
  let deliveryIcon = <MdErrorOutline />;
  if (deliveryStatus === "delivered") {
    deliveryIcon = <MdCheckCircleOutline />;
  } else if (deliveryStatus === "read") deliveryIcon = <MdDoneAll />;
  return (
    <div className="w-full h-full rounded-lg hover:bg-gray-200 flex justify-between p-3 items-center">
      <div
        className="size-10 rounded-full bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400')",
        }}
      ></div>
      <div className="w-[80%] flex flex-col gap-1">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-base font-normal">{name}</h3>
          <span className="text-xs">{time}</span>
        </div>
        <div className="flex flex-row gap-2 items-center text-gray-700">
          <span className="text-xs">{deliveryIcon}</span>
          <p className="text-xs">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatElement;
