import { useState,useRef, useEffect  } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { createChat, sendMessage,updateChatTitle } from "../../api/chatApi";

function ChatWindow({ sessionId,messages=[], setMessages }) {


  const bottomRef = useRef(null);
  const userData = localStorage.getItem("userData");
  const user = JSON.parse(userData)?.user?.username || "Guest";
  const [aiTyping, setAiTyping] = useState(false);

  const scrollRef = useRef(null);
  const [scrolling, setScrolling] = useState(false);
  const timeoutRef = useRef(null);

  const handleScroll = () => {
    setScrolling(true);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setScrolling(false);
    }, 600);
  };

  const getLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }),
      reject
    );
  });

  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSend = async (text) => {
    try {

      let currentSessionId = sessionId;
      let isNewSession = false;

      if (!currentSessionId) {
        const sessionRes = await createChat();
        currentSessionId = sessionRes.data.data._id;
        isNewSession = true;
      }

      const userMessage = {
        role: "user",
        content: text
      };

      setMessages((prev = []) => [...prev, userMessage]);
      setAiTyping(true);

      // 🔹 update title using first message
      if (isNewSession) {
        const title = text.slice(0, 40); // first 40 chars
        await updateChatTitle(currentSessionId, title);
      }
      const location = await getLocation();
      const res = await sendMessage({
        sessionId: currentSessionId,
        content: text,
        location
      });

      const aiMessage = res.data.data.aiMessage;

      setMessages((prev = []) => [
        ...prev,
        {
          role: aiMessage.role,
          content: aiMessage.content,
          doctors: aiMessage.doctors?.length ? aiMessage.doctors : null
        }
      ]);

    } catch (error) {
      console.error("AI error:", error);
    } finally {
      setAiTyping(false);
    }
  };


return (
  <div className="flex flex-col h-full text-white">

    {/* Messages area */}
    <div ref={scrollRef} onScroll={handleScroll} className={`flex-1 overflow-y-auto overflow-x-hidden ${messages?.length === 0 ? "flex flex-col items-center justify-center" : ""} scrollbar-thin ${
        scrolling ? "scroll-active" : ""
      }`}>

      {messages.length === 0 && (
        <>
          <div className="mb-6 text-center">
            <h2 className="text-[20px] text-gray-400">
              Hi! {user}
            </h2>

            <h1 className="text-[30px] mb-3">
              What's on the agenda today?
            </h1>
          </div>

          <ChatInput onSend={handleSend} />

          <p className="text-gray-400 text-left mt-10">top searches</p>

          <div className="flex flex-wrap items-start gap-3 mt-2">
            <div className="max-w-md rounded-[50px] px-5 py-2 border text-gray-600 border-gray-900 hover:border-white hover:text-white cursor-pointer">
              <h3>I have fever</h3>
            </div>

            <div className="max-w-md rounded-[50px] px-5 py-2 border text-gray-600 border-gray-900 hover:border-white hover:text-white cursor-pointer">
              <h3>what is the symptom of malaria?</h3>
            </div>

            <div className="max-w-md rounded-[50px] px-5 py-2 border text-gray-600 border-gray-900 hover:border-white hover:text-white cursor-pointer">
              <h3>what is malaria?</h3>
            </div>
          </div>
        </>
      )}

      {/* Chat messages */}
      {messages?.map((msg, index) => (
        <MessageBubble
          key={index}
          role={msg.role}
          content={msg.content}
          doctors={msg.doctors}
        />
      ))}

      {/* AI typing indicator */}
    {aiTyping && (
      <MessageBubble role="assistant" content="..." />
    )}

      <div ref={bottomRef}></div>

    </div>

    {/* Bottom input (only when chat started) */}
    {messages.length > 0 && (
      <div className="flex justify-center  p-4">
        <ChatInput onSend={handleSend} />
      </div>
    )}

  </div>
);
}

export default ChatWindow;