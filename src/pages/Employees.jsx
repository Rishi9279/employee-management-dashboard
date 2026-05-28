import React from "react";
import EmployeesTable from "../components/employees/EmployeesTable";

const Employees = () => {
  return (
    <>
      <div className="flex items-center justify-between p-8 border-b border-white/5">
        <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
        <div className="flex items-center gap-4">
          <input
            className="w-56 bg-[#1e293b] border border-white/10 text-sm focus:border-amber-400 text-white placeholder:text-slate-400. rounded-full px-4 py-2 outline-none"
            type="text"
            placeholder="Search Employees..."
          />
          <button className="bg-amber-500 px-4 py-2 rounded-full shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all">+ Add Employee </button>
        </div>
      </div>

      <EmployeesTable />
    </>
  );
};

export default Employees;
