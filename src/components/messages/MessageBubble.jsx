import React from "react";

const MessageBubble = ({ text, sender }) => {
  return (
    <div
      className={`max-w-[400px] px-5 py-4 rounded-2xl
        
      ${sender === "me" ? "ml-auto bg-amber-500 text-black" : "bg-[#1e293b]"}
      
      `}>
      {text}
    </div>
  );
};

export default MessageBubble;
