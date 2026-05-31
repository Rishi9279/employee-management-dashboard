import { motion } from "framer-motion";

const AnalyticsStats = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <motion.div
          key={item.id}
          className="rounded-2xl border border-white/10 bg-[#1e293b] p-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          <p className="text-sm text-slate-400">{item.title}</p>
          <h2 className="mt-2 text-2xl font-bold">{item.value}</h2>
          <span className="mt-3 inline-block rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
            {item.delta}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default AnalyticsStats;

