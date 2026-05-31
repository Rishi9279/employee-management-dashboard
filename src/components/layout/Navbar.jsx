import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiBell,
  FiCheck,
  FiChevronDown,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSettings,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../../context/AppDataContext";

const buttonTap = { scale: 0.95 };

const Navbar = ({
  title,
  subtitle,
  onSidebarOpen,
  searchValue,
  onSearchChange,
  userName,
  onLogout,
}) => {
  const navigate = useNavigate();
  const {
    preferences,
    notifications,
    unreadNotificationCount,
    togglePreference,
    markNotificationRead,
    clearNotifications,
    profile,
  } = useAppData();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const avatarLetter = useMemo(
    () => (userName ? userName.slice(0, 1).toUpperCase() : "U"),
    [userName],
  );

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const openSettings = () => {
    setIsProfileOpen(false);
    navigate("/settings");
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#111827]/85 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-800 text-slate-300 lg:hidden"
            whileTap={buttonTap}
            onClick={onSidebarOpen}
            aria-label="Open sidebar"
          >
            <FiMenu size={18} />
          </motion.button>

          <div>
            <h2 className="text-lg font-semibold text-white md:text-xl">{title}</h2>
            <p className="mt-0.5 text-xs text-slate-400 md:text-sm">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-slate-800 px-4 py-2 text-slate-400 sm:flex">
            <FiSearch size={14} />
            <input
              className="w-40 bg-transparent text-sm text-white outline-none placeholder:text-slate-400 md:w-64"
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>

          <div className="relative" ref={notificationsRef}>
            <motion.button
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all hover:bg-white/10 hover:text-white"
              whileTap={buttonTap}
              aria-label="Notifications"
              onClick={() => {
                setIsNotificationsOpen((prev) => !prev);
                setIsProfileOpen(false);
              }}
            >
              <FiBell size={16} />
              {unreadNotificationCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-semibold text-black">
                  {unreadNotificationCount}
                </span>
              ) : null}
            </motion.button>

            <AnimatePresence>
              {isNotificationsOpen ? (
                <motion.div
                  className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-white/10 bg-[#111827] shadow-2xl"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                    <p className="text-sm font-semibold text-white">Notifications</p>
                    <button
                      className="rounded-md px-2 py-1 text-xs text-slate-300 hover:bg-white/10"
                      onClick={clearNotifications}
                    >
                      Clear all
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`border-b border-white/5 px-3 py-2 ${
                          item.read ? "bg-transparent" : "bg-white/5"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium text-white">{item.title}</p>
                            <p className="text-xs text-slate-400">{item.description}</p>
                            <p className="mt-1 text-[11px] text-slate-500">{item.time}</p>
                          </div>
                          {!item.read ? (
                            <button
                              className="rounded-md bg-emerald-500/20 p-1 text-emerald-300"
                              onClick={() => markNotificationRead(item.id)}
                              aria-label="Mark as read"
                            >
                              <FiCheck size={13} />
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}

                    {notifications.length === 0 ? (
                      <p className="px-3 py-4 text-center text-sm text-slate-400">
                        No notifications right now.
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <motion.button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all hover:bg-white/10 hover:text-white"
            whileTap={buttonTap}
            aria-label="Toggle theme"
            onClick={() => togglePreference("darkMode")}
          >
            {preferences.darkMode ? <FiMoon size={16} /> : <FiSun size={16} />}
          </motion.button>

          <div className="relative" ref={profileRef}>
            <motion.button
              className="flex h-10 items-center gap-2 rounded-full bg-amber-500 px-2 pr-3 font-semibold text-white transition-all hover:bg-amber-600"
              whileTap={buttonTap}
              aria-label="User profile menu"
              onClick={() => {
                setIsProfileOpen((prev) => !prev);
                setIsNotificationsOpen(false);
              }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm">
                {avatarLetter}
              </span>
              <FiChevronDown size={14} />
            </motion.button>

            <AnimatePresence>
              {isProfileOpen ? (
                <motion.div
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#111827] shadow-2xl"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  <div className="border-b border-white/10 px-3 py-3">
                    <p className="text-sm font-semibold text-white">{profile.fullName}</p>
                    <p className="text-xs text-slate-400">{profile.email}</p>
                  </div>

                  <button
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/10 hover:text-white"
                    onClick={openSettings}
                  >
                    <FiUser size={14} />
                    Profile
                  </button>
                  <button
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/10 hover:text-white"
                    onClick={openSettings}
                  >
                    <FiSettings size={14} />
                    Settings
                  </button>
                  <button
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-rose-300 hover:bg-rose-500/10"
                    onClick={handleLogout}
                  >
                    <FiLogOut size={14} />
                    Logout
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-full border border-white/10 bg-slate-800 px-4 py-2 text-slate-400 sm:hidden">
        <FiSearch size={14} />
        <input
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
    </header>
  );
};

export default Navbar;
