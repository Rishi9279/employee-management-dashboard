import { motion } from "framer-motion";

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <button
      className={`relative flex h-8 w-14 items-center rounded-full px-1 transition-all ${
        checked ? "bg-amber-500" : "bg-slate-600"
      }`}
      onClick={onChange}
      type="button"
      aria-pressed={checked}
    >
      <motion.div
        className="h-6 w-6 rounded-full bg-white"
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
      />
    </button>
  );
};

export default ToggleSwitch;

