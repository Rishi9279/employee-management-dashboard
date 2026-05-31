import { motion } from "framer-motion";
import { FiCheck, FiCheckCircle } from "react-icons/fi";

const MessageBubble = ({ text, sender, time }) => {
  const isMine = sender === "me";

  return (
    <motion.div
      className={`max-w-[420px] rounded-2xl px-5 py-4 ${
        isMine ? "ml-auto bg-amber-500 text-black" : "bg-[#1e293b] text-white"
      }`}
    >
      <p className="text-sm leading-relaxed">{text}</p>
      <div className="mt-1 flex items-center justify-end gap-1">
        <p className={`text-[11px] ${isMine ? "text-black/70" : "text-slate-400"}`}>{time}</p>
        {isMine ? (
          <span className="text-[11px] text-black/70">
            <FiCheckCircle size={11} />
          </span>
        ) : (
          <span className="hidden text-[11px] text-slate-500 sm:inline">
            <FiCheck size={11} />
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
