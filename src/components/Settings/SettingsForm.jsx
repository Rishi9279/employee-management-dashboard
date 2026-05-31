import { motion } from "framer-motion";
import { useAppData } from "../../context/AppDataContext";
import ToggleSwitch from "./ToggleSwitch";

const settingsItems = [
  {
    key: "darkMode",
    title: "Dark Mode",
    description: "Enable dark theme across the dashboard.",
  },
  {
    key: "notifications",
    title: "Notifications",
    description: "Receive task and activity alerts.",
  },
  {
    key: "emailUpdates",
    title: "Email Updates",
    description: "Receive reports and weekly summaries.",
  },
];

const SettingsForm = () => {
  const {
    profile,
    preferences,
    lastSavedAt,
    updateProfileField,
    togglePreference,
    saveSettings,
    resetSettings,
  } = useAppData();

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-[#1e293b] p-5 shadow-xl md:p-8"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-2xl font-bold text-black">
          {profile.fullName.slice(0, 1).toUpperCase()}
        </div>

        <div>
          <h3 className="text-xl font-semibold">{profile.fullName}</h3>
          <p className="text-sm text-slate-400">{profile.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-400">Full Name</label>
          <input
            type="text"
            value={profile.fullName}
            onChange={(event) => updateProfileField("fullName", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(event) => updateProfileField("email", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">Password</label>
          <input
            type="password"
            value={profile.password}
            onChange={(event) => updateProfileField("password", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">Phone Number</label>
          <input
            type="text"
            value={profile.phone}
            onChange={(event) => updateProfileField("phone", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {settingsItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f172a] px-4 py-4"
          >
            <div>
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-slate-400">{item.description}</p>
            </div>

            <ToggleSwitch
              checked={preferences[item.key]}
              onChange={() => togglePreference(item.key)}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-500">
          {lastSavedAt ? `Last saved at ${lastSavedAt}` : "No changes saved yet."}
        </p>

        <div className="flex items-center gap-2">
          <button
            className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            onClick={resetSettings}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-xl bg-amber-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600"
            onClick={saveSettings}
            type="button"
          >
            Save Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsForm;

