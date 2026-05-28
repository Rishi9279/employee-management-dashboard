import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const EmployeesRow = ({ name, role, department, status, email }) => {
  return (
    <div className="grid grid-cols-6 items-center py-5 px-4 border-b border-white/5 hover:bg-white/5 transition-all rounded-xl">
      {/* Name */}
      <div className="font-medium">{name}</div>

      {/* Role */}
      <div className="text-gray-300">{role}</div>

      {/* Department */}
      <div className="text-gray-300">{department}</div>

      {/* Status */}
      <div>
        <span className={`px-3 py-1 rounded-full text-sm ${status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{status}</span>
      </div>

      {/* Email */}
      <div className="text-gray-300 truncate">{email}</div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4">
        <button className="text-blue-400 hover:text-blue-300 transition-all">
          <FiEdit size={18} />
        </button>

        <button className="text-red-400 hover:text-red-300 transition-all">
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default EmployeesRow;
