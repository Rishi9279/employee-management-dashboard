import React from "react";

const StatsCard = ({ title, count, highlight, status, icon: Icon }) => {
  return (
    <div className="rounded-lg border border-white/5 bg-[#1e293b] p-5 shadow-lg  transition-all hover:border-white/20">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-200">{title}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-amber-400">
          <Icon className="text-lg" />
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{count}</h2>
        <p className="text-[12px] text-gray-400">
          <span className="font-medium text-emerald-400">{highlight}</span>{" "}
          {status}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
