import { StreamChat } from "stream-chat";
import "./App.css";
import { Chat } from "stream-chat-react";
import { Menu } from "./components";
import { AllChats } from "./pages";

const apiKey = "peeqdp7kpt5m";

function App() {
  const client = StreamChat.getInstance(apiKey);
  if (!client)
    return <h1 className="text-center text-xl">Setting up connection...</h1>;
  return (
    <div className="flex">
      <Chat client={client}>
        <Menu />
        {/* <AllChannels /> */}
        <div className="w-full">
          <AllChats />
        </div>
      </Chat>
    </div>
  );
}

export default App;
