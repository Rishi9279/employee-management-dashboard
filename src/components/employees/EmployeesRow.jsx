import { motion } from "framer-motion";
import { FiCheck, FiChevronDown, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

const EmployeesRow = ({
  employee,
  editingId,
  draft,
  setDraft,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}) => {
  const isEditing = editingId === employee.id;

  const statusClass =
    employee.status === "Active"
      ? "bg-emerald-500/15 text-emerald-400"
      : "bg-rose-500/15 text-rose-400";

  const changeDraft = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      className="rounded-lg border border-white/5 bg-[#1b2432] p-3 transition-all hover:border-white/10 md:bg-transparent md:p-0"
      whileHover={{ y: -1 }}
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:items-center md:px-2 md:py-3 md:hover:bg-white/5 md:rounded-lg">
        {isEditing ? (
          <>
            <input
              className="rounded-md border border-white/10 bg-[#1e293b] px-2 py-1.5 text-sm outline-none"
              value={draft?.name || ""}
              onChange={(event) => changeDraft("name", event.target.value)}
            />
            <input
              className="rounded-md border border-white/10 bg-[#1e293b] px-2 py-1.5 text-sm outline-none"
              value={draft?.role || ""}
              onChange={(event) => changeDraft("role", event.target.value)}
            />
            <input
              className="rounded-md border border-white/10 bg-[#1e293b] px-2 py-1.5 text-sm outline-none"
              value={draft?.department || ""}
              onChange={(event) => changeDraft("department", event.target.value)}
            />
            <div className="relative">
              <select
                className="w-full appearance-none rounded-md border border-white/10 bg-[#1e293b] py-1.5 pl-2 pr-8 text-sm outline-none"
                value={draft?.status || "Active"}
                onChange={(event) => changeDraft("status", event.target.value)}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <FiChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <input
              className="rounded-md border border-white/10 bg-[#1e293b] px-2 py-1.5 text-sm outline-none"
              value={draft?.email || ""}
              onChange={(event) => changeDraft("email", event.target.value)}
            />
            <div className="flex items-center justify-end gap-2 md:justify-center">
              <button
                className="rounded-md bg-emerald-500/20 p-2 text-emerald-300 hover:bg-emerald-500/30"
                onClick={onSave}
                aria-label="Save"
              >
                <FiCheck />
              </button>
              <button
                className="rounded-md bg-slate-600/40 p-2 text-slate-300 hover:bg-slate-600/60"
                onClick={onCancel}
                aria-label="Cancel"
              >
                <FiX />
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-xs text-slate-500 md:hidden">Name</p>
              <p className="font-medium">{employee.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 md:hidden">Role</p>
              <p className="text-slate-300">{employee.role}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 md:hidden">Department</p>
              <p className="text-slate-300">{employee.department}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 md:hidden">Status</p>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}>
                {employee.status}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500 md:hidden">Email</p>
              <p className="truncate text-slate-300">{employee.email}</p>
            </div>
            <div className="flex items-center justify-end gap-2 md:justify-center">
              <button
                className="rounded-md bg-blue-500/15 p-2 text-blue-300 hover:bg-blue-500/25"
                onClick={() => onEdit(employee)}
                aria-label="Edit"
              >
                <FiEdit2 />
              </button>
              <button
                className="rounded-md bg-rose-500/15 p-2 text-rose-300 hover:bg-rose-500/25"
                onClick={() => onDelete(employee.id)}
                aria-label="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default EmployeesRow;

