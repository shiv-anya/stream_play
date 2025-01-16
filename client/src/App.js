import "./App.css";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { Login, Menu } from "./components";
import { AllChats, AllChannels } from "./pages";
import { Route, Routes } from "react-router";

const cookies = new Cookies();

const apiKey = "peeqdp7kpt5m";
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);
console.log({
  id: cookies.get("userId"),
  name: cookies.get("username"),
  fullName: cookies.get("fullName"),
  hashedPassword: cookies.get("hashedPassword"),
  email: cookies.get("email"),
  token: cookies.get("token"),
});

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
  if (!client)
    return <h1 className="text-center text-xl">Setting up connection...</h1>;
  if (!authToken) return <Login />;
  return (
    <Chat client={client} theme="team light">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/channels" element={<AllChannels />} />
        <Route path="/chats" element={<AllChats />} />
      </Routes>
    </Chat>
  );
}

export default App;
