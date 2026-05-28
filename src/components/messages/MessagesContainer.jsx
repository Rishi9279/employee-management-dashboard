import React from "react";
import ContactsList from "./ContactsList";
import ChatWindow from "./ChatWindow";

const MessagesContainer = () => {
  return (
    <div className="grid grid-cols-[320px_1fr] h-[80vh]">
      {/* Left */}
      <ContactsList />

      {/* Right */}
      <ChatWindow />
    </div>
  );
};

export default MessagesContainer;
