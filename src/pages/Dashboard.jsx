import React from "react";
import { FaCheckCircle, FaClock, FaTasks, FaUsers } from "react-icons/fa";
import StatsCard from "../components/dashboard/StatsCard";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import SmallCard from "../components/dashboard/SmallCard";
import Navbar from "../components/layout/Navbar";

const Dashboard = () => {
  const statsData = [
    {
      id: 1,
      title: "Total Employees",
      count: 124,
      highlight: "+12",
      status: "this month",
      icon: FaUsers,
    },
    {
      id: 2,
      title: "Active Tasks",
      count: 38,
      highlight: "+5",
      status: "new tasks",
      icon: FaTasks,
    },
    {
      id: 3,
      title: "Completed Tasks",
      count: 92,
      highlight: "+18",
      status: "completed",
      icon: FaCheckCircle,
    },
    {
      id: 4,
      title: "Pending Tasks",
      count: 11,
      highlight: "3",
      status: "urgent tasks",
      icon: FaClock,
    },
  ];

  return (
    <>
      <Navbar/>
      <div className="grid grid-cols-4 gap-6 p-6">
        {statsData.map((item) => (
          <StatsCard key={item.id} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 px-6 pb-6">
        <AnalyticsChart />

        <div className="grid grid-rows-2 gap-6">
          <SmallCard title="On Leave" count={8} status="employees today" />
          <SmallCard title="New Requests" count={14} status="waiting approval" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
