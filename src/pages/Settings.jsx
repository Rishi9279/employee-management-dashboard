import SettingsContainer from "../components/Settings/SettingsContainer";

const Settings = () => {
  return (
    <section className="space-y-4">
      <div className="px-4 pt-4 md:px-6 md:pt-6">
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <h3 className="text-lg font-semibold">Account Settings</h3>
          <p className="text-sm text-slate-400">
            Manage profile details, preferences, and notification behavior.
          </p>
        </div>
      </div>

      <SettingsContainer />
    </section>
  );
};

export default Settings;

