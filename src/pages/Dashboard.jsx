import { useMemo } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaClock, FaTasks, FaUsers } from "react-icons/fa";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import SmallCard from "../components/dashboard/SmallCard";
import StatsCard from "../components/dashboard/StatsCard";
import { useAppData } from "../context/AppDataContext";

const cardStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const Dashboard = ({ globalSearch = "" }) => {
  const { dashboardStats, tasks, employees } = useAppData();
  const activeTaskList = tasks.filter((task) => task.status === "In Progress");
  const onLeaveEmployees = employees.filter((item) => item.status !== "Active");
  const onLeaveCount = onLeaveEmployees.length;
  const pendingApprovals = tasks.filter((task) => task.status === "Pending").length;

  const statsData = useMemo(
    () => [
      {
        id: 1,
        title: "Total Employees",
        count: dashboardStats.totalEmployees,
        highlight: `+${Math.max(1, Math.floor(dashboardStats.totalEmployees * 0.04))}`,
        status: "this month",
        icon: FaUsers,
      },
      {
        id: 2,
        title: "Active Tasks",
        count: dashboardStats.activeTasks,
        highlight: dashboardStats.activeTasks > 0 ? `${dashboardStats.activeTasks}` : "No active",
        highlightClass:
          dashboardStats.activeTasks > 0 ? "text-cyan-400" : "text-amber-400",
        status: dashboardStats.activeTasks > 0 ? "tasks running now" : "start task updates",
        note:
          dashboardStats.activeTasks > 0
            ? `Top task: ${activeTaskList[0]?.title || "In progress"}`
            : "Move a pending task to In Progress from Task Board.",
        icon: FaTasks,
      },
      {
        id: 3,
        title: "Completed Tasks",
        count: dashboardStats.completedTasks,
        highlight: `+${Math.max(1, Math.floor(dashboardStats.completedTasks * 0.2))}`,
        status: "completed",
        icon: FaCheckCircle,
      },
      {
        id: 4,
        title: "Pending Tasks",
        count: dashboardStats.pendingTasks,
        highlight: `${dashboardStats.pendingTasks}`,
        highlightClass:
          dashboardStats.pendingTasks > 0 ? "text-amber-400" : "text-emerald-400",
        status: dashboardStats.pendingTasks > 0 ? "waiting action" : "all cleared",
        note:
          dashboardStats.pendingTasks > 0
            ? "Review and assign owners."
            : "Great flow, no pending queue.",
        icon: FaClock,
      },
    ],
    [activeTaskList, dashboardStats],
  );

  const filteredStats = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();
    if (!query) return statsData;
    const matches = statsData.filter((item) =>
      item.title.toLowerCase().includes(query),
    );
    return matches.length ? matches : statsData;
  }, [globalSearch, statsData]);

  const onLeaveMeta = onLeaveCount
    ? `${onLeaveEmployees
        .slice(0, 2)
        .map((item) => item.name)
        .join(", ")}${onLeaveCount > 2 ? ` +${onLeaveCount - 2} more` : ""}`
    : "All employees are available today";
  const pendingMeta =
    pendingApprovals > 0
      ? `${tasks
          .filter((task) => task.status === "Pending")
          .slice(0, 1)
          .map((task) => task.title)
          .join("")}${pendingApprovals > 1 ? ` +${pendingApprovals - 1} more` : ""}`
      : "No pending requests right now";

  return (
    <section className="space-y-6 p-4 md:p-6">
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        variants={cardStagger}
        initial="hidden"
        animate="show"
      >
        {filteredStats.map((item) => (
          <motion.div key={item.id} variants={cardItem}>
            <StatsCard {...item} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <AnalyticsChart tasks={tasks} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <SmallCard
            title="On Leave"
            count={onLeaveCount}
            status={onLeaveCount > 0 ? "employees unavailable" : "team is fully present"}
            meta={onLeaveMeta}
            badgeText={onLeaveCount > 0 ? "Attention" : "Healthy"}
            badgeClass={
              onLeaveCount > 0
                ? "bg-amber-500/15 text-amber-400"
                : "bg-emerald-500/15 text-emerald-400"
            }
          />
          <SmallCard
            title="New Requests"
            count={pendingApprovals}
            status={pendingApprovals > 0 ? "awaiting approval" : "queue clear"}
            meta={pendingMeta}
            badgeText={pendingApprovals > 0 ? "Pending" : "Clear"}
            badgeClass={
              pendingApprovals > 0
                ? "bg-cyan-500/15 text-cyan-400"
                : "bg-emerald-500/15 text-emerald-400"
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

