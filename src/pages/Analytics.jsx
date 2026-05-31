import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import AnalyticsContainer from "../components/analytics/AnalyticsContainer";
import { useAppData } from "../context/AppDataContext";

const Analytics = () => {
  const { analyticsRange, setAnalyticsRange, analyticsDataByRange } = useAppData();

  const activeData =
    analyticsDataByRange?.[analyticsRange] || analyticsDataByRange?.["This Month"] || {
      stats: [],
      revenue: [],
      labels: [],
      activities: [],
      dataSource: "No analytics data available yet.",
    };

  const exportReport = () => {
    const payload = {
      range: analyticsRange,
      generatedAt: new Date().toISOString(),
      ...activeData,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics-${analyticsRange.toLowerCase().replace(/\s+/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-4 p-4 md:p-6">
      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#111827] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Performance Insights</h3>
          <p className="text-sm text-slate-400">Interactive snapshot by selected range.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              className="appearance-none rounded-full border border-white/10 bg-[#1e293b] py-2 pl-4 pr-9 text-sm outline-none"
              value={analyticsRange}
              onChange={(event) => setAnalyticsRange(event.target.value)}
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <motion.button
            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600"
            whileTap={{ scale: 0.96 }}
            onClick={exportReport}
          >
            Export Report
          </motion.button>
        </div>
      </div>

      <AnalyticsContainer
        stats={activeData.stats}
        revenue={activeData.revenue}
        labels={activeData.labels}
        activities={activeData.activities}
        dataSource={activeData.dataSource}
      />
    </section>
  );
};

export default Analytics;

