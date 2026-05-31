import { useMemo } from "react";
import { motion } from "framer-motion";

const AnalyticsChart = ({ tasks = [] }) => {
  const chartData = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "Completed").length || 1;
    const inProgress = tasks.filter((task) => task.status === "In Progress").length || 1;
    const pending = tasks.filter((task) => task.status === "Pending").length || 1;

    const total = completed + inProgress + pending;
    const scale = (value) => Math.max(28, Math.round((value / total) * 100));

    return [
      { label: "Completed", value: completed, height: scale(completed), color: "bg-emerald-500" },
      { label: "In Progress", value: inProgress, height: scale(inProgress), color: "bg-amber-500" },
      { label: "Pending", value: pending, height: scale(pending), color: "bg-cyan-500" },
    ];
  }, [tasks]);

  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-[#1e293b] p-5 shadow-lg"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Task Analytics</h2>
        <span className="text-xs text-slate-400">Live overview</span>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-5">
        {chartData.map((bar) => (
          <div key={bar.label} className="rounded-lg border border-white/10 bg-slate-950/30 p-3">
            <p className="text-xs text-slate-400">{bar.label}</p>
            <p className="mt-1 text-xl font-semibold">{bar.value}</p>
            <div className="mt-3 flex h-32 items-end">
              <motion.div
                className={`w-full rounded-t-md ${bar.color}`}
                initial={{ height: 0 }}
                animate={{ height: `${bar.height}%` }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;

