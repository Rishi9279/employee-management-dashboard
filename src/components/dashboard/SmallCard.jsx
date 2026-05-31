import { motion } from "framer-motion";

const SmallCard = ({ title, count, status, meta, badgeText, badgeClass = "text-emerald-400 bg-emerald-500/15" }) => {
  return (
    <motion.div
      className="flex flex-1 flex-col justify-between rounded-xl border border-white/10 bg-[#1e293b] p-5 shadow-lg transition-all hover:border-amber-400/20"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-200">{title}</p>
        {badgeText ? (
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${badgeClass}`}>
            {badgeText}
          </span>
        ) : null}
      </div>
      <div>
        <h2 className="text-4xl font-bold text-white">{count}</h2>
        <p className="mt-3 text-sm text-gray-400">{status}</p>
        {meta ? <p className="mt-1 text-xs text-slate-500">{meta}</p> : null}
      </div>
    </motion.div>
  );
};

export default SmallCard;

