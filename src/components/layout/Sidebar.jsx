import React from "react";
import {
  FiBarChart2,
  FiBriefcase,
  FiGrid,
  FiLogOut,
  FiMessageSquare,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

const Sidebar = () => {
  return (
    // aside sidebar ke liye semantic tag hai, div se better readability milti hai
    <aside className="flex min-h-screen w-64 flex-col border-r border-white/10 bg-[#111827] px-4 py-6 text-white">
      {/* Logo / title section */}
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold tracking-wide">EmployeeHub</h1>
        <p className="mt-2 text-sm text-slate-400">Management Panel</p>
      </div>

      {/* Navigation links */}
      <nav className="flex-1">
        <ul className="space-y-2.5">
          {/* Active item ko amber background diya hai taaki current page clear dikhe */}
          <li>
            <a href="#" className="flex items-center gap-3 rounded-lg bg-amber-500 px-3 py-2.5 text-sm font-medium text-white shadow-lg shadow-amber-500/20">
              <FiGrid className="text-lg" />
              Dashboard
            </a>
          </li>

          {/* Baaki items hover par highlight honge */}
          <li>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white">
              <FiUsers className="text-lg" />
              Employees
            </a>
          </li>

          <li>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white">
              <FiBriefcase className="text-lg" />
              Tasks
            </a>
          </li>

          <li>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white">
              <FiBarChart2 className="text-lg" />
              Analytics
            </a>
          </li>

          <li>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white">
              <FiMessageSquare className="text-lg" />
              Messages
            </a>
          </li>

          <li>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white">
              <FiSettings className="text-lg" />
              Settings
            </a>
          </li>
        </ul>
      </nav>

      {/* mt-6 logout button ko bottom ke paas rakhta hai kyunki nav flex-1 hai */}
      <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:bg-red-500 hover:text-white">
        <FiLogOut className="text-lg" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
