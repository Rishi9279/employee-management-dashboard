import React from "react";

const ActivityCard = ({ title, value, growth }) => {
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-3xl p-6">
      <p className="text-gray-400 mb-3">{title}</p>

      <h2 className="text-3xl font-bold mb-4">{value}</h2>

      <span className="bg-green-500/20 text-green-400 px-4 py-1.5 rounded-full text-sm font-medium">{growth}</span>
    </div>
  );
};

export default ActivityCard;
