import React from "react";
import EmployeesRow from "./EmployeesRow";


const employees = [
  {
    id: 1,
    name: "Rishi Raj",
    role: "Frontend Developer",
    department: "Engineering",
    status: "Active",
    email: "rishi@gmail.com",
  },

  {
    id: 2,
    name: "Aman Kumar",
    role: "UI Designer",
    department: "Design",
    status: "Active",
    email: "aman@gmail.com",
  },

  {
    id: 3,
    name: "Rahul Singh",
    role: "Backend Developer",
    department: "Engineering",
    status: "Inactive",
    email: "rahul@gmail.com",
  },

  {
    id: 4,
    name: "Priya Sharma",
    role: "HR Manager",
    department: "HR",
    status: "Active",
    email: "priya@gmail.com",
  },
];

const EmployeesTable = () => {
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-2xl p-5 m-3">
      {/* Heading Row */}
      <div className="grid grid-cols-6 text-gray-400 border-b border-white/10 pb-4 font-medium">
        <div>Name</div>
        <div>Role</div>
        <div>Department</div>
        <div>Status</div>
        <div>Email</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Employee Rows */}
      <div className="mt-2">
        {employees.map((employee) => (
          <EmployeesRow key={employee.id} {...employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeesTable;
