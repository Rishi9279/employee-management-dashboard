import React from "react";
import { FaBell, FaMoon, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 border-b border-white/10 bg-[#111827]/90 px-10 py-4 shadow-lg shadow-black/10 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Dashboard</h2>
          <p className="mt-0.5 text-sm text-slate-400">Welcome back, Rishi</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex w-44 items-center gap-2 rounded-full border border-white/10 bg-slate-800 px-4 py-2 text-slate-400 transition-all focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 sm:w-64">
            <FaSearch size={14} />
            <input
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
              type="text"
              placeholder="Search"
            />
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all hover:bg-white/10 hover:text-white"
            aria-label="Notifications"
          >
            <FaBell size={16} />
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all hover:bg-white/10 hover:text-white"
            aria-label="Toggle theme"
          >
            <FaMoon size={16} />
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 font-semibold text-white transition-all hover:bg-amber-600"
            aria-label="User profile"
          >
            R
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
