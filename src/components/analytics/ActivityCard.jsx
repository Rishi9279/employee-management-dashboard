import { motion } from "framer-motion";

const ActivityCard = ({ title, value, growth }) => {
  return (
    <motion.div
      className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-[#1e293b] p-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <p className="mb-3 text-gray-400">{title}</p>

      <h2 className="mb-4 text-2xl font-bold">{value}</h2>

      <span className="rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-400">
        {growth}
      </span>
    </motion.div>
  );
};

export default ActivityCard;

