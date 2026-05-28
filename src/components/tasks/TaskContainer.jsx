import React from "react";
import TaskCard from "./TaskCard";

const TaskContainer = () => {
  const tasks = [
    {
      id: 1,
      title: "Build Employee Dashboard",
      assignedTo: "Rishi Raj",
      deadline: "28 May",
      priority: "High",
      status: "In Progress",
    },

    {
      id: 2,
      title: "Design Login Page",
      assignedTo: "Aman Kumar",
      deadline: "2 June",
      priority: "Medium",
      status: "Pending",
    },

    {
      id: 3,
      title: "Fix Backend API",
      assignedTo: "Rahul Singh",
      deadline: "30 May",
      priority: "High",
      status: "Completed",
    },
  ];

  return (
    <div
      className="grid grid-cols-3  gap-6 p-8">
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
};

export default TaskContainer;
