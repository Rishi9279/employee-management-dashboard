import React from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = () => {
  const messages = [
    {
      id: 1,
      text: "Hello 👋",
      sender: "other",
    },

    {
      id: 2,
      text: "How are you?",
      sender: "other",
    },

    {
      id: 3,
      text: "I'm doing great 😄",
      sender: "me",
    },
  ];

  return (
    <div className="flex flex-col justify-between p-6">
      {/* Messages */}
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} {...message} />
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-4 mt-6">
        <input type="text" placeholder="Type a message..." className="flex-1 bg-[#1e293b] border border-white/10 px-5 py-4 rounded-2xl outline-none" />

        <button className="bg-amber-500 hover:bg-amber-600 transition-all px-6 py-4 rounded-2xl font-medium">Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
