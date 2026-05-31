import { motion } from "framer-motion";

const StatsCard = ({
  title,
  count,
  highlight,
  status,
  note,
  highlightClass = "text-emerald-400",
  icon: Icon,
}) => {
  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-[#1e293b] p-5 shadow-lg transition-all hover:border-amber-400/20"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-200">{title}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-amber-400">
          <Icon className="text-lg" />
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{count}</h2>
        <p className="text-[12px] text-gray-400">
          <span className={`font-medium ${highlightClass}`}>{highlight}</span>{" "}
          {status}
        </p>
        {note ? <p className="text-[11px] text-slate-500">{note}</p> : null}
      </div>
    </motion.div>
  );
};

export default StatsCard;

