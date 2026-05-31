import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { useAppData } from "./context/AppDataContext";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Tasks from "./pages/Tasks";

const routeMeta = {
  "/": {
    title: "Dashboard",
    subtitle: "Track teams, progress, and activity at a glance.",
  },
  "/employees": {
    title: "Employees",
    subtitle: "Manage members, roles, and profile records.",
  },
  "/tasks": {
    title: "Tasks",
    subtitle: "Assign, prioritize, and monitor delivery flow.",
  },
  "/analytics": {
    title: "Analytics",
    subtitle: "Measure growth, revenue, and operational performance.",
  },
  "/messages": {
    title: "Messages",
    subtitle: "Coordinate with teams and keep communication organized.",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Update preferences, notifications, and profile controls.",
  },
};

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, profile, preferences } = useAppData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");

  const activeMeta = useMemo(
    () => routeMeta[location.pathname] || routeMeta["/"],
    [location.pathname],
  );

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    setGlobalSearch("");
    logout();
    closeSidebar();
    navigate("/");
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className={`min-h-screen text-white ${preferences.darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="flex min-h-screen">
        <aside className="hidden lg:block">
          <Sidebar onNavigate={closeSidebar} onLogout={handleLogout} />
        </aside>

        <AnimatePresence>
          {isSidebarOpen ? (
            <motion.div
              className="fixed inset-0 z-40 bg-black/45 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
            >
              <motion.div
                className="h-full w-72"
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                onClick={(event) => event.stopPropagation()}
              >
                <Sidebar onNavigate={closeSidebar} onLogout={handleLogout} />
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            title={activeMeta.title}
            subtitle={activeMeta.subtitle}
            onSidebarOpen={() => setIsSidebarOpen(true)}
            searchValue={globalSearch}
            onSearchChange={setGlobalSearch}
            userName={profile.fullName}
            onLogout={handleLogout}
          />

          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                exit={pageTransition.exit}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Dashboard globalSearch={globalSearch} />} />
                  <Route path="/employees" element={<Employees globalSearch={globalSearch} />} />
                  <Route path="/tasks" element={<Tasks globalSearch={globalSearch} />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/messages" element={<Messages globalSearch={globalSearch} />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;

