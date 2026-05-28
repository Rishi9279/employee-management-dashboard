import React from "react";

const AnalyticsChart = () => {
  return (
    <div className="rounded-lg border border-white/5 bg-[#1e293b] p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Analytics Chart</h2>
      <div className="flex h-56 items-end gap-4">
        <div className="h-[45%] flex-1 rounded-t-lg bg-amber-500"></div>
        <div className="h-[70%] flex-1 rounded-t-lg bg-emerald-500"></div>
        <div className="h-[55%] flex-1 rounded-t-lg bg-amber-500"></div>
        <div className="h-[85%] flex-1 rounded-t-lg bg-emerald-500"></div>
        <div className="h-[65%] flex-1 rounded-t-lg bg-amber-500"></div>
        <div className="h-[78%] flex-1 rounded-t-lg bg-emerald-500"></div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
