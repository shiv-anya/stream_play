import React, { useEffect } from "react";
import {
  MdCheckCircleOutline,
  MdDoneAll,
  MdErrorOutline,
} from "react-icons/md";

const ChatElement = ({
  latestMessage,
  displayImage,
  displayTitle,
  messageDeliveryStatus = "delivered",
  time = "08:00 P.M.",
  onSelect,
  channel,
}) => {
  let deliveryIcon = <MdErrorOutline />;
  if (messageDeliveryStatus === "delivered") {
    deliveryIcon = <MdCheckCircleOutline />;
  } else if (messageDeliveryStatus === "read") deliveryIcon = <MdDoneAll />;
  return (
    <div
      className="w-full h-full rounded-lg hover:bg-gray-200 flex justify-between p-3 items-center"
      onClick={() => onSelect(channel)}
    >
      {displayImage ? (
        <div
          className={`size-10 rounded-full bg-center bg-cover`}
          style={{
            backgroundImage: `url(${displayImage})`,
          }}
        ></div>
      ) : (
        <div
          className={`bg-[url("./img/multipleusers.png")] size-10 rounded-full bg-center bg-cover`}
        ></div>
      )}
      <div className="w-[80%] flex flex-col gap-1">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-base font-normal">{displayTitle}</h3>
          <span className="text-xs">{time}</span>
        </div>
        <div className="flex flex-row gap-2 items-center text-gray-700">
          <span className="text-xs">{deliveryIcon}</span>
          <p className="text-xs">{latestMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatElement;
