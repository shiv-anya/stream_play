import "./App.css";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { Login } from "./components";
import { AllChats, AllChannels } from "./pages";
import { Route, Routes } from "react-router";
import { useLocation } from "react-router";
import { useState } from "react";
import ThemeContext from "./ctx/ThemeContext";

const cookies = new Cookies();

const apiKey = process.env.REACT_APP_API_KEY;

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
  const [darkTheme, setDarkTheme] = useState(false);
  const location = useLocation();
  const customClasses = {
    chatContainer: "h-screen w-full",
    channel: "w-2/3 h-screen flex",
    channelList: `${
      location.pathname === "/chats" ? "h-[40%]" : "h-[80%]"
    } border-none`,
    messageList:
      "w-full px-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-indigo-500",
  };
  if (!client)
    return <h1 className="text-center text-xl">Setting up connection...</h1>;
  if (!authToken) return <Login />;
  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <Chat
        client={client}
        theme={darkTheme ? "str-chat__theme-dark" : "str-chat__theme-light"}
        customClasses={customClasses}
      >
        <Routes>
          <Route path="/">
            <Route path="" element={<Login />} />
            <Route path="channels" element={<AllChannels />} />
            <Route path="chats" element={<AllChats />} />
          </Route>
        </Routes>
      </Chat>
    </ThemeContext.Provider>
  );
}

export default App;
