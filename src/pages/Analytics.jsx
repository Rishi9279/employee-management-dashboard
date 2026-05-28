import React from "react";
import AnalyticsContainer from "../components/analytics/AnalyticsContainer";

const Analytics = () => {
  return (
    <div className="flex-1 bg-[#0f172a] text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-10 border-b border-white/10">
        <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>

        <div className="flex items-center gap-4">
          <select className="bg-[#1e293b] border border-white/10 px-4 py-3 rounded-2xl outline-none">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>

          <button className="bg-amber-500 hover:bg-amber-600 transition-all px-6 py-3 rounded-2xl font-medium shadow-lg shadow-amber-500/20">Export Report</button>
        </div>
      </div>

      {/* Main Analytics */}
      <AnalyticsContainer />
    </div>
  );
};

export default Analytics;
