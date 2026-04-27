import DoctorList from "./DoctorList";
import { FaNotesMedical } from "react-icons/fa";


function MessageBubble({ role, content, doctors }) {
  const isUser = role === "user";
  const isTyping = content === "...";

  return (
    <div
      className={`
        flex flex-col 
        ${isUser ? "items-end" : "items-start"} 
        w-full 
        px-3 sm:px-6 md:px-10 lg:px-20
      `}
    >

      {/* Message bubble */}
      <div
        className={`
          max-w-[90%] sm:max-w-[80%] md:max-w-[70%]
          px-3 sm:px-4 md:px-5 
          py-2 
          rounded-xl 
          text-sm sm:text-base md:text-[17px] 
          leading-6 sm:leading-7 md:leading-8 
          tracking-wide 
          break-words 
          mb-4 sm:mb-6
          ${isUser ? "bg-[#303030] text-white" : "text-gray-200"}
        `}
      >
        {isTyping ? (
          <span className="flex gap-1 items-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
          </span>
        ) : (
          content
        )}
      </div>

      {/* DISCLAIMER */}
      {!isUser && !isTyping && (
        <div className="w-full mb-4">
          <div className="border-l-2 border-white/20 px-3 py-2 text-[11px] sm:text-xs md:text-sm text-gray-400">
            <span className="font-semibold text-white">
              AI-generated response
            </span>{" "}
            — It may be incorrect or incomplete. Do not rely completely on it.
            Always consult a qualified healthcare provider.
          </div>
        </div>
      )}

      {/* DOCTOR SECTION */}
      {!isUser && !isTyping && doctors && doctors.length > 0 && (
        <div className="w-full mb-6">

          {/* Header */}
          <div className="flex items-start gap-2 text-green-400 
                          text-sm sm:text-base md:text-lg 
                          font-medium mb-3 sm:mb-4">
            
            <FaNotesMedical className="text-lg sm:text-xl md:text-2xl mt-1" />

            <span className="leading-snug">
              Nearby doctors you can consult based on your location
            </span>
          </div>

          {/* Doctor List */}
          <DoctorList doctors={doctors} />
        </div>
      )}
    </div>
  );
}

export default MessageBubble;

