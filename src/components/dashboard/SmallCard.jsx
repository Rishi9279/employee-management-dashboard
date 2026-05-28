import React from "react";

const SmallCard = ({ title, count, status }) => {
  return (
    <div className="flex flex-1 flex-col justify-between rounded-lg border border-white/5 bg-[#1e293b] p-5 shadow-lg transition-all hover:border-white/20">
      <p className="text-sm font-semibold text-slate-200">{title}</p>
      <div>
        <h2 className="text-4xl font-bold text-white">{count}</h2>
        <p className="mt-3 text-sm text-gray-400">{status}</p>
      </div>
    </div>
  );
};

export default SmallCard;
