import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import TaskContainer from "../components/tasks/TaskContainer";
import { useAppData } from "../context/AppDataContext";

const emptyTask = {
  title: "",
  assignedTo: "",
  deadline: "",
  priority: "Medium",
};

const Tasks = ({ globalSearch = "" }) => {
  const { tasks, addTask, updateTask, deleteTask } = useAppData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(emptyTask);

  const mergedSearch = (search || globalSearch).trim().toLowerCase();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = statusFilter === "All" ? true : task.status === statusFilter;
      const matchesSearch = mergedSearch
        ? [task.title, task.assignedTo, task.priority].join(" ").toLowerCase().includes(mergedSearch)
        : true;
      return matchesStatus && matchesSearch;
    });
  }, [tasks, statusFilter, mergedSearch]);

  const submitTask = (event) => {
    event.preventDefault();
    if (!form.title || !form.assignedTo || !form.deadline) return;
    addTask(form);
    setForm(emptyTask);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-5 p-4 md:p-6">
      <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#111827] p-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Task Board</h3>
          <p className="text-sm text-slate-400">{filteredTasks.length} tasks visible</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:w-auto">
          <input
            type="text"
            placeholder="Search tasks..."
            className="rounded-full border border-white/10 bg-[#1e293b] px-4 py-2 text-sm text-white outline-none placeholder:text-slate-400"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="relative">
            <select
              className="w-full appearance-none rounded-full border border-white/10 bg-[#1e293b] py-2 pl-4 pr-9 text-sm outline-none"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <motion.button
            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600"
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowAddForm((prev) => !prev)}
          >
            + Add Task
          </motion.button>
        </div>
      </div>

      {showAddForm ? (
        <motion.form
          className="grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-[#111827] p-4 md:grid-cols-2 xl:grid-cols-5"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={submitTask}
        >
          <input
            className="rounded-lg border border-white/10 bg-[#1e293b] px-3 py-2 text-sm outline-none"
            placeholder="Task title"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          />
          <input
            className="rounded-lg border border-white/10 bg-[#1e293b] px-3 py-2 text-sm outline-none"
            placeholder="Assigned to"
            value={form.assignedTo}
            onChange={(event) => setForm((prev) => ({ ...prev, assignedTo: event.target.value }))}
          />
          <input
            type="date"
            className="rounded-lg border border-white/10 bg-[#1e293b] px-3 py-2 text-sm outline-none"
            value={form.deadline}
            onChange={(event) => setForm((prev) => ({ ...prev, deadline: event.target.value }))}
          />
          <div className="relative">
            <select
              className="w-full appearance-none rounded-lg border border-white/10 bg-[#1e293b] py-2 pl-3 pr-9 text-sm outline-none"
              value={form.priority}
              onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
            >
              Create
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300"
              onClick={() => {
                setShowAddForm(false);
                setForm(emptyTask);
              }}
            >
              Cancel
            </button>
          </div>
        </motion.form>
      ) : null}

      <TaskContainer
        tasks={filteredTasks}
        onStatusChange={(id, nextStatus) => updateTask(id, { status: nextStatus })}
        onDeleteTask={deleteTask}
      />
    </div>
  );
};

export default Tasks;

