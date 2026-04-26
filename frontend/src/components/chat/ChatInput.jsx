import { useState } from "react";
import { FaNotesMedical } from "react-icons/fa";

function ChatInput({ onSend }) {

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-gray-800 w-[50%] max-w-3xl"
    >

      <div className="flex items-center w-[100%] bg-[#1E1F20] rounded-[30px] px-5 py-6">

        <input
          type="text"
          placeholder="Ask anything"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white px-2"
        />

        <button
          type="submit"
          className=" px-4 py-1 rounded-full text-sm"
        >
          <FaNotesMedical className="text-[25px] text-green-500" />
        </button>

      </div>

    </form>
  );
}

export default ChatInput;