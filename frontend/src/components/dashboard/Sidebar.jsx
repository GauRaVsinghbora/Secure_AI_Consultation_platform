import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";


import { getUserChats, createChat } from "../../api/chatApi";

function Sidebar() {

  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  const userData = localStorage.getItem("userData");
  const user = JSON.parse(userData).user.username;
  const email = JSON.parse(userData).user.email;

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const res = await getUserChats();
      setSessions(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewChat = () => {
    navigate("/dashboard");
  };

  const scrollRef = useRef(null);
  const [scrolling, setScrolling] = useState(false);
  let timeout;

  const handleScroll = () => {
    setScrolling(true);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setScrolling(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* New Chat */}
      <button
        onClick={handleNewChat}
        className="mb-4 bg-gray-300 cursor-pointer text-black py-2 px-3 rounded-[15px] border border-gray-700 text-sm font-medium"
      >
        + New Chat
      </button>

      {/* Recent Chats Scroll Area */}
      <div ref={scrollRef} onScroll={handleScroll} className={`flex-1 min-h-0 overflow-y-auto space-y-2 pr-2 scrollbar-thin ${
        scrolling ? "scroll-active" : ""
      }`}>

        <p className="text-white text-[14px] px-3 py-2 sticky top-0 bg-black z-10">
          Recent Chats
        </p>

        {sessions.map((chat) => (
          <button
            key={chat._id}
            onClick={() => navigate(`/dashboard/chat/${chat._id}`)}
            className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800"
          >
            {chat.title || "New Chat"}
          </button>
        ))}

      </div>

      {/* Profile (Fixed Bottom) */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-500">
            <img
              src={`https://ui-avatars.com/api/?name=${user}&background=random&color=fff&size=64`}
              alt="avatar"
              className="w-full h-full rounded-full"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-white text-[14px]">{user}</p>
            <p className="text-gray-600 text-[14px]">{email}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;
