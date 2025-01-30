import React from "react";
import {
  MessageList,
  MessageInput,
  Thread,
  useChannelStateContext,
  useTypingContext,
  MessageSimple,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const CustomMessage = (props) => {
  return <MessageSimple {...props} reactionSelector />;
};

const CustomMessageInput = () => {
  return (
    <MessageInput
      focus
      fileUpload
      audioRecordingEnabled
      additionalMessageInputProps={{ giphyEnabled: true }}
    />
  );
};

const ChatBoxMiddle = () => {
  const { thread } = useChannelStateContext();
  const { typing } = useTypingContext();
  const typingUsers = Object.values(typing)
    .filter((user) => user.user?.name)
    .map((user) => user.user.name);
  return (
    <div className="flex w-full h-[85%] bg-gray-400">
      <div className="w-full h-full flex flex-col bg-[url('./img/wallpaper.jpg')]">
        <MessageList Message={CustomMessage} />
        <div className="text-xs p-5 pt-0">
          {typingUsers.length > 0 &&
            `${typingUsers.join(", ")} ${
              typingUsers.length > 1 ? "are" : "is"
            } typing...`}
        </div>
        <CustomMessageInput />
      </div>
      {thread && (
        <div className="thread-container w-full">
          <Thread />
        </div>
      )}
    </div>
  );
};

export default ChatBoxMiddle;

// import React, { useRef, useState } from "react";
// import { FiPaperclip, FiMic } from "react-icons/fi";
// import { BiSend } from "react-icons/bi";
// import {
//   MdCheckCircleOutline,
//   MdDoneAll,
//   MdErrorOutline,
// } from "react-icons/md";

// const InputForm = () => {
//   const [message, setMessage] = useState("");
//   const textareaRef = useRef(null);

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);

//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   };

//   const handleSend = () => {
//     if (message.trim()) {
//       alert(`Message sent: ${message}`);
//       setMessage("");
//       if (textareaRef.current) {
//         textareaRef.current.style.height = "auto";
//       }
//     }
//   };

//   return (
//     <div className="absolute bottom-0 w-full bg-white p-3 border-t flex items-center gap-3">
//       <button className="text-gray-500 hover:text-gray-700">
//         <FiPaperclip size={24} />
//       </button>
//       <div className="flex-grow relative">
//         <textarea
//           ref={textareaRef}
//           value={message}
//           onChange={handleInputChange}
//           rows={1}
//           placeholder="Type your message here"
//           className="w-full resize-none border-none rounded-lg bg-gray-200 p-3 focus:ring-1 focus:ring-gray-300 focus:outline-none max-h-40 overflow-y-auto"
//           style={{ lineHeight: "1.5rem" }}
//         />
//       </div>
//       <button
//         onClick={handleSend}
//         className={`text-white rounded-full p-3 ${
//           message.trim()
//             ? "bg-indigo-500 hover:bg-indigo-600"
//             : "bg-indigo-500 text-gray-500"
//         }`}
//       >
//         {message.trim() ? <BiSend size={20} /> : <FiMic size={20} />}
//       </button>
//     </div>
//   );
// };

// const ChatMessagesBox = () => {
//   const messages = [
//     {
//       id: 1,
//       sender: "me",
//       text: "Hi, how are you?",
//       time: "10:30 AM",
//       deliveryStatus: "delivered",
//     },
//     {
//       id: 2,
//       sender: "other",
//       text: "I'm good! How about you?",
//       time: "10:32 AM",
//       deliveryStatus: "read",
//     },
//     {
//       id: 3,
//       sender: "me",
//       text: "I'm doing well, thanks!",
//       time: "10:34 AM",
//       deliveryStatus: "delivered",
//     },
//     {
//       id: 4,
//       sender: "me",
//       text: "Just working on a new project. You?",
//       time: "10:37 AM",
//       deliveryStatus: "failed",
//     },
//     {
//       id: 5,
//       sender: "other",
//       text: "That sounds exciting! Just relaxing here.",
//       time: "10:39 AM",
//       deliveryStatus: "read",
//     },
//     {
//       id: 6,
//       sender: "me",
//       text: "Nice! Have you watched the new series yet?",
//       time: "10:42 AM",
//       deliveryStatus: "delivered",
//     },
//     {
//       id: 7,
//       sender: "other",
//       text: "Not yet, but it's on my list!",
//       time: "10:45 AM",
//       deliveryStatus: "delivered",
//     },
//     {
//       id: 8,
//       sender: "me",
//       text: "You should check it out. It's great!",
//       time: "10:48 AM",
//       deliveryStatus: "read",
//     },
//     {
//       id: 9,
//       sender: "other",
//       text: "Will do! Thanks for the recommendation.",
//       time: "10:50 AM",
//       deliveryStatus: "delivered",
//     },
//     {
//       id: 10,
//       sender: "me",
//       text: "No problem! Let me know what you think.",
//       time: "10:52 AM",
//       deliveryStatus: "delivered",
//     },
//     {
//       id: 11,
//       sender: "other",
//       text: "I will. Have a good day!",
//       time: "10:55 AM",
//       deliveryStatus: "read",
//     },
//   ];

//   const getStatusIcon = (status) => {
//     if (status === "delivered") {
//       return <MdCheckCircleOutline />;
//     } else if (status === "read") return <MdDoneAll />;
//     else {
//       return <MdErrorOutline />;
//     }
//   };
//   const isFirstMessageFromSender = (messages, index) => {
//     return index === 0 || messages[index].sender !== messages[index - 1].sender;
//   };

//   return (
//     <div className="h-full flex-grow overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-indigo-500">
//       {messages.map((msg, index) => (
//         <div
//           key={msg.id}
//           className={`flex flex-col ${
//             msg.sender === "me" ? "items-end" : "items-start"
//           } mb-2`}
//         >
//           <div
//             className={`${
//               isFirstMessageFromSender(messages, index)
//                 ? `bg-indigo-500 p-2 text-sm rounded-t-lg ${
//                     msg.sender === "me"
//                       ? "rounded-l-lg text-white"
//                       : "rounded-r-lg text-black"
//                   } shadow-md`
//                 : "bg-indigo-500 rounded-lg text-sm p-2 max-w-xs text-white shadow-md"
//             } ${
//               msg.sender === "other"
//                 ? "bg-white text-sm text-black shadow-md"
//                 : ""
//             }`}
//           >
//             <p>{msg.text}</p>
//           </div>
//           <div className="flex justify-between items-center text-xs mt-1 gap-2">
//             {msg.sender === "other" ? (
//               <>
//                 <span className="flex items-center space-x-1">
//                   {getStatusIcon(msg.deliveryStatus)}
//                 </span>
//                 <span className="text-black">{msg.time}</span>
//               </>
//             ) : (
//               <>
//                 <span className="text-black">{msg.time}</span>
//                 <span className="flex items-center space-x-1">
//                   {getStatusIcon(msg.deliveryStatus)}
//                 </span>
//               </>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const ChatBoxMiddle = () => {
//   return (
//     <div className="h-[85%] w-full rounded-t-2xl bg-center flex flex-col bg-[url('./img/wallpaper.jpg')] justify-between">
//       <div className="h-[80%]">
//         <ChatMessagesBox />
//       </div>
//       <div className="h-[20%] w-full relative mx-auto">
//         <InputForm />
//       </div>
//     </div>
//   );
// };

// export default ChatBoxMiddle;
