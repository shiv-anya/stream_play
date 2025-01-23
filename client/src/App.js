import "./App.css";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { Login } from "./components";
import { AllChats, AllChannels } from "./pages";
import { Route, Routes } from "react-router";
import { CustomClasses } from "stream-chat-react";

const cookies = new Cookies();

const apiKey = "peeqdp7kpt5m";
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      hashedPassword: cookies.get("hashedPassword"),
      email: cookies.get("email"),
    },
    authToken
  );
}

function App() {
  const customClasses = {
    chatContainer: "h-screen",
    channel: "w-full h-full flex flex-col",
    channelList: "h-[70%] border-none",
    messageList:
      "w-full px-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-indigo-500",
  };
  if (!client)
    return <h1 className="text-center text-xl">Setting up connection...</h1>;
  if (!authToken) return <Login />;
  return (
    <Chat client={client} theme="team light" customClasses={customClasses}>
      <Routes>
        <Route path="/">
          <Route path="" element={<Login />} />
          <Route path="channels" element={<AllChannels />} />
          <Route path="chats" element={<AllChats />} />
        </Route>
      </Routes>
    </Chat>
  );
}

export default App;
