import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ contact, messages, onSend, isTyping }) => {
  const [draft, setDraft] = useState("");
  const scrollerRef = useRef(null);

  const submitMessage = (event) => {
    event.preventDefault();
    onSend(draft);
    setDraft("");
  };

  useEffect(() => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <div className="flex min-h-[380px] flex-col p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#1e293b] px-4 py-3">
        <div>
          <p className="text-sm font-semibold">{contact?.name}</p>
          <p className="text-xs text-slate-400">{contact?.role}</p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            contact?.online ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-700 text-slate-300"
          }`}
        >
          {contact?.online ? "Online" : "Offline"}
        </span>
      </div>

      <div
        ref={scrollerRef}
        className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-white/10 bg-[#111827] p-4"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <MessageBubble {...message} />
            </motion.div>
          ))}

          {isTyping ? (
            <motion.div
              key="typing-indicator"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="inline-flex items-center gap-1 rounded-2xl bg-[#1e293b] px-4 py-3"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300 [animation-delay:0.12s]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300 [animation-delay:0.24s]" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <form className="mt-4 flex items-center gap-3" onSubmit={submitMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-xl border border-white/10 bg-[#1e293b] px-4 py-3 text-sm outline-none"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />

        <button
          type="submit"
          className="rounded-xl bg-amber-500 px-4 py-3 text-sm font-medium text-white hover:bg-amber-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
