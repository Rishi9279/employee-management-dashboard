import React from "react";

const RevenueChart = () => {
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-semibold mb-8">Revenue Analytics</h2>

      <div className="flex items-end gap-4 h-72">
        <div className="bg-amber-500 rounded-t-xl h-[40%] flex-1"></div>

        <div className="bg-emerald-500 rounded-t-xl h-[70%] flex-1"></div>

        <div className="bg-amber-500 rounded-t-xl h-[55%] flex-1"></div>

        <div className="bg-emerald-500 rounded-t-xl h-[90%] flex-1"></div>

        <div className="bg-amber-500 rounded-t-xl h-[65%] flex-1"></div>

        <div className="bg-emerald-500 rounded-t-xl h-[80%] flex-1"></div>
      </div>
    </div>
  );
};

export default RevenueChart;
