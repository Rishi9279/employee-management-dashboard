import { useState } from "react";
import { motion } from "framer-motion";
import EmployeesRow from "./EmployeesRow";

const EmployeesTable = ({ employees, onUpdateEmployee, onDeleteEmployee }) => {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);

  const startEdit = (employee) => {
    setEditingId(employee.id);
    setDraft(employee);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const saveEdit = () => {
    if (!draft) return;
    onUpdateEmployee(editingId, draft);
    cancelEdit();
  };

  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-[#111827] p-3 md:p-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
    >
      <div className="hidden grid-cols-6 border-b border-white/10 pb-3 text-sm font-medium text-slate-400 md:grid">
        <span>Name</span>
        <span>Role</span>
        <span>Department</span>
        <span>Status</span>
        <span>Email</span>
        <span className="text-center">Actions</span>
      </div>

      <div className="mt-1 space-y-2">
        {employees.map((employee) => (
          <EmployeesRow
            key={employee.id}
            employee={employee}
            editingId={editingId}
            draft={draft}
            setDraft={setDraft}
            onEdit={startEdit}
            onCancel={cancelEdit}
            onSave={saveEdit}
            onDelete={onDeleteEmployee}
          />
        ))}

        {employees.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/15 px-4 py-6 text-center text-sm text-slate-400">
            No employees found for this filter.
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default EmployeesTable;

