import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiTrash2 } from "react-icons/fi";

const priorityStyles = {
  High: "bg-rose-500/20 text-rose-300",
  Medium: "bg-amber-500/20 text-amber-300",
  Low: "bg-emerald-500/20 text-emerald-300",
};

const statusStyles = {
  Completed: "bg-emerald-500/20 text-emerald-300",
  Pending: "bg-orange-500/20 text-orange-300",
  "In Progress": "bg-cyan-500/20 text-cyan-300",
};

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const nextStatus =
    task.status === "Pending"
      ? "In Progress"
      : task.status === "In Progress"
        ? "Completed"
        : "Pending";

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-[#1e293b] p-5 shadow-lg transition-all hover:border-amber-400/20"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22 }}
    >
      <h2 className="mb-4 text-lg font-semibold">{task.title}</h2>

      <div className="space-y-2 text-sm">
        <p className="text-slate-400">
          Assigned To: <span className="text-white">{task.assignedTo}</span>
        </p>
        <p className="text-slate-400">
          Deadline: <span className="text-white">{task.deadline}</span>
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[task.status]}`}>
          {task.status}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-200 hover:bg-slate-700"
          onClick={() => onStatusChange(task.id, nextStatus)}
        >
          {task.status === "Completed" ? <FiClock size={14} /> : <FiCheckCircle size={14} />}
          {task.status === "Completed" ? "Reopen" : "Update"}
        </button>

        <button
          className="rounded-lg bg-rose-500/20 p-2 text-rose-300 hover:bg-rose-500/30"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;

