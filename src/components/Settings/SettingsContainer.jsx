import { motion } from "framer-motion";
import SettingsForm from "./SettingsForm";

const SettingsContainer = () => {
  return (
    <motion.div
      className="p-4 md:p-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <div className="mx-auto w-full max-w-4xl">
        <SettingsForm />
      </div>
    </motion.div>
  );
};

export default SettingsContainer;

