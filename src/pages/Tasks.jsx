import React from "react";
import TaskContainer from "../components/tasks/TaskContainer";

const Tasks = () => {
  return (
    <div className="flex-1 bg-[#0f172a] text-white">
      {/* Top Section */}
      <div className="flex items-center justify-between p-10 border-b border-white/5">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>

        <div className="flex items-center gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Tasks..."
            className="w-56 bg-[#1e293b] border border-white/10 text-sm focus:border-amber-400 text-white placeholder:text-slate-400. rounded-full px-4 py-2 outline-none"
          />
          {/* Filter */}
          <select className="bg-[#1e293b] border border-white/10 px-4 py-2 text-sm rounded-full outline-none">
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          {/* Button */}
          <button className="bg-amber-500 px-4 py-2 rounded-full shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all">+ Add Task</button>
        </div>
      </div>

      {/* Tasks */}
      <TaskContainer />
    </div>
  );
};

export default Tasks;
