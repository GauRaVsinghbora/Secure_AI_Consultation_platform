import DoctorList from "./DoctorList";

function MessageBubble({ role, content, doctors }) {

  const isUser = role === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} w-[70%] mx-auto`}>

      {/* Message text */}
      <div
        className={`max-w-[100%] px-5 py-3 rounded-xl text-[18px] mb-2
        leading-8 tracking-wide break-words
        ${isUser
          ? "bg-[#303030] text-white"
          : "text-gray-200"
        }`}
      >
        {content === "..." ? (
          <span className="animate-pulse">....</span>
        ) : (
          content
        )}
      </div>

      {/* 👇 ADD THIS (Doctor list rendering) */}
      {!isUser && doctors && doctors.length > 0 && (
        <DoctorList doctors={doctors} />
      )}

    </div>
  );
}

export default MessageBubble;