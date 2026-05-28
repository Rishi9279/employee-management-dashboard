import React from "react";
import { NavLink } from "react-router-dom";
import { FiBarChart2, FiBriefcase, FiGrid, FiLogOut, FiMessageSquare, FiSettings, FiUsers } from "react-icons/fi";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
      isActive ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    // aside sidebar ke liye semantic tag hai, div se better readability milti hai
    <aside className="flex min-h-screen w-64 flex-col border-r border-white/10 bg-[#111827] px-6 py-6 text-white">
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
            <NavLink className={linkClass} to="/">
              <FiGrid className="text-lg" />
              Dashboard
            </NavLink>
          </li>

          {/* Baaki items hover par highlight honge */}
          <li>
            <NavLink className={linkClass} to="/employees">
              <FiUsers className="text-lg" />
              Employees
            </NavLink>
          </li>

          <li>
            <NavLink className={linkClass} to="/tasks">
              <FiBriefcase className="text-lg" />
              Tasks
            </NavLink>
          </li>

          <li>
            <NavLink className={linkClass} to="/analytics">
              <FiBarChart2 className="text-lg" />
              Analytics
            </NavLink>
          </li>

          <li>
            <NavLink className={linkClass} to="/messages">
              <FiMessageSquare className="text-lg" />
              Messages
            </NavLink>
          </li>

          <li>
            <NavLink className={linkClass} to="/settings">
              <FiSettings className="text-lg" />
              Settings
            </NavLink>
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
