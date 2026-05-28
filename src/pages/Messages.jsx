import React from "react";
import MessagesContainer from "../components/messages/MessagesContainer";

const Messages = () => {
  return (
    <div className="flex-1 bg-[#0f172a] text-white">
      {/* Header */}
      <div className="p-10 border-b border-white/10">
        <h1 className="text-4xl font-bold tracking-tight">Messages</h1>
      </div>

      {/* Main */}
      <MessagesContainer />
    </div>
  );
};

export default Messages;
