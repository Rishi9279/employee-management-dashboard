import React from "react";

const TaskCard = ({ title, assignedTo, deadline, priority, status }) => {
  return (
    <div className="bg-[#1e293b]  border border-white/10 rounded-3xl p-5 hover:shadow-2xl hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-amber-500/10 transition-all shadow-lg">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-6">{title}</h2>

      {/* Assigned */}
      <div className="mb-2 flex justify-start items-center gap-2">
        <p className="text-gray-400 text-sm">Assigned To:</p>

        <h3 className="text-lg font-medium">{assignedTo}</h3>
      </div>

      {/* Deadline */}
      <div className=" mb-5 flex justify-start items-center gap-2">
        <p className="text-gray-400 text-sm">Deadline:</p>

        <h3 className="text-lg font-medium">{deadline}</h3>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between">
        {/* Priority */}
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-medium
          
          ${priority === "High" ? "bg-red-500/20 text-red-400" : priority === "Medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}
          
          `}>
          {priority}
        </span>

        {/* Status */}
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-medium
          
          ${status === "Completed" ? "bg-green-500/20 text-green-400" : status === "Pending" ? "bg-orange-500/20 text-orange-400" : "bg-blue-500/20 text-blue-400"}
          
          `}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
