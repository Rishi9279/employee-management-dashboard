import React from "react";
import SettingsContainer from "../components/Settings/SettingsContainer";

const Settings = () => {
  return (
    <div className="flex-1 bg-[#0f172a] text-white">
      {/* Header */}
      <div className="p-10 border-b border-white/10">
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
      </div>

      {/* Main */}
      <SettingsContainer />
    </div>
  );
};

export default Settings;
