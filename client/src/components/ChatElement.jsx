import React, { useContext } from "react";
import {
  MdCheckCircleOutline,
  MdDoneAll,
  MdErrorOutline,
} from "react-icons/md";
import ThemeContext from "../ctx/ThemeContext";

const ChatElement = ({
  latestMessage,
  displayImage,
  displayTitle,
  messageDeliveryStatus = "delivered",
  lastMessage,
  onSelect,
  channel,
  id,
  isTyping,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const formatFriendlyDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    // Check if the date is today
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    // Format time in 12-hour format
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    const time = `${hours}:${minutes} ${ampm}`;

    if (isToday) {
      return `${time}`;
    } else {
      // Format as "Day at time" for other dates
      const options = { weekday: "long" }; // Long weekday format
      const day = date.toLocaleDateString("en-US", options).substring(0, 3);
      return `${day}`;
    }
  };

  let deliveryIcon = <MdErrorOutline />;
  if (messageDeliveryStatus === "delivered") {
    deliveryIcon = <MdCheckCircleOutline />;
  } else if (messageDeliveryStatus === "read") deliveryIcon = <MdDoneAll />;
  return (
    <div
      className={`w-full h-[80px] rounded-lg hover:bg-gray-200 flex justify-between py-2 px-3 my-2 items-center ${
        darkTheme && "hover:bg-gray-700"
      } ${
        id === channel.data.id
          ? darkTheme
            ? "bg-gray-700"
            : "bg-gray-200"
          : ""
      }
  `}
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
          <h3 className="text-base font-normal capitalize">{displayTitle}</h3>
          <span className={`text-xs ${darkTheme && "text-gray-500"}`}>
            {lastMessage?.created_at
              ? formatFriendlyDate(lastMessage?.created_at)
              : ""}
          </span>
        </div>
        <div
          className={`flex flex-row gap-2 items-center ${
            darkTheme ? "text-gray-500" : "text-gray-700"
          }`}
        >
          <span className="text-xs">{deliveryIcon}</span>
          <p className={`text-xs`}>{isTyping ? "Typing..." : latestMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatElement;
