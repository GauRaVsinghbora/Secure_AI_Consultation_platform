import { useState, useEffect } from "react";
import { FaNotesMedical } from "react-icons/fa";

function ChatInput({ onSend, value, setValue }) {

  const [message, setMessage] = useState("");

  // ✅ sync with parent (VERY IMPORTANT)
  useEffect(() => {
    if (value !== undefined) {
      setMessage(value);
    }
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
    setValue && setValue(""); // clear parent also
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full px-3 sm:px-6 md:px-10 max-w-4xl mx-auto"
    >
      <div
        className="
          flex items-center 
          w-full 
          bg-[#1E1F20] 
          rounded-full 
          px-3 sm:px-4 md:px-5 
          py-3 sm:py-4 
          border border-white/10
        "
      >
        {/* Input */}
        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setValue && setValue(e.target.value); // sync back
          }}
          className="flex-1 bg-transparent outline-none text-white text-sm sm:text-base px-2"
        />

        {/* Button */}
        <button
          type="submit"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-white/10 transition"
        >
          <FaNotesMedical className="text-lg sm:text-xl text-green-500" />
        </button>
      </div>
    </form>
  );
}

export default ChatInput;