import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiBriefcase,
  FiGrid,
  FiLogOut,
  FiMessageSquare,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

const navItems = [
  { to: "/", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/employees", label: "Employees", icon: FiUsers },
  { to: "/tasks", label: "Tasks", icon: FiBriefcase },
  { to: "/analytics", label: "Analytics", icon: FiBarChart2 },
  { to: "/messages", label: "Messages", icon: FiMessageSquare },
  { to: "/settings", label: "Settings", icon: FiSettings },
];

const Sidebar = ({ onNavigate, onLogout }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
      isActive
        ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <aside className="flex h-full w-72 flex-col border-r border-white/10 bg-[#111827] px-6 py-6 text-white">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold tracking-wide">EmployeeHub</h1>
        <p className="mt-2 text-sm text-slate-400">Management Panel</p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2.5">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink end={end} className={linkClass} to={to} onClick={onNavigate}>
                <Icon className="text-lg" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:bg-red-500 hover:text-white"
        onClick={onLogout}
      >
        <FiLogOut className="text-lg" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;

