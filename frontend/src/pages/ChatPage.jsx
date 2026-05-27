import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatWindow from "../components/chat/ChatWindow";
import { getChatMessages } from "../api/chatApi";

function ChatPage() {

  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const loadMessages = async () => {
      try {
        const res = await getChatMessages(sessionId);

        setMessages(res.data.data || []);

      } catch (err) {
        console.error(err);
      }
    };

    if (sessionId) loadMessages();

  }, [sessionId]);

  return (
    <div className="h-full">
      <ChatWindow
        sessionId={sessionId}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}

export default ChatPage;