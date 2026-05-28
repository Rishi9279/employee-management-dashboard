import React from "react";

const AnalyticsStats = () => {
  const stats = [
    {
      id: 1,
      title: "Revenue",
      value: "$24,500",
    },

    {
      id: 2,
      title: "Users",
      value: "1,245",
    },

    {
      id: 3,
      title: "Growth",
      value: "+18%",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((item) => (
        <div key={item.id} className="bg-[#1e293b] border border-white/10 rounded-3xl p-6">
          <p className="text-gray-400 mb-3">{item.title}</p>

          <h2 className="text-3xl font-bold">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsStats;
