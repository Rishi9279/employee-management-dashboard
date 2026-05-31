import { AnimatePresence, motion } from "framer-motion";
import TaskCard from "./TaskCard";

const TaskContainer = ({ tasks, onStatusChange, onDeleteTask }) => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <TaskCard task={task} onStatusChange={onStatusChange} onDelete={onDeleteTask} />
          </motion.div>
        ))}
      </AnimatePresence>

      {tasks.length === 0 ? (
        <div className="col-span-full rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-slate-400">
          No tasks match this filter.
        </div>
      ) : null}
    </motion.div>
  );
};

export default TaskContainer;

