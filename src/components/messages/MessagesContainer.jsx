import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAppData } from "../../context/AppDataContext";
import ChatWindow from "./ChatWindow";
import ContactsList from "./ContactsList";

const MessagesContainer = ({ globalSearch = "" }) => {
  const {
    contacts,
    conversations,
    selectedContactId,
    typingContacts,
    setSelectedContactId,
    sendMessage,
  } = useAppData();

  const filteredContacts = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();
    if (!query) return contacts;
    return contacts.filter((contact) =>
      [contact.name, contact.role].join(" ").toLowerCase().includes(query),
    );
  }, [contacts, globalSearch]);

  const activeContact =
    contacts.find((contact) => contact.id === selectedContactId) || contacts[0];
  const activeMessages = conversations[activeContact.id] || [];
  const isTyping = Boolean(typingContacts[activeContact.id]);

  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-white/10 bg-[#0f172a]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[290px_1fr]">
        <ContactsList
          contacts={filteredContacts}
          selectedId={activeContact.id}
          onSelect={setSelectedContactId}
        />
        <ChatWindow
          contact={activeContact}
          messages={activeMessages}
          onSend={sendMessage}
          isTyping={isTyping}
        />
      </div>
    </motion.div>
  );
};

export default MessagesContainer;

