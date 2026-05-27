import { useState } from "react";
import ChatWindow from "../components/chat/ChatWindow";

function Dashboard() {

  const [messages, setMessages] = useState([]);

  return (
    <div className="flex flex-col h-full">

      <ChatWindow
        messages={messages}
        setMessages={setMessages}
      />

    </div>
  );
}

export default Dashboard;