import React from "react";
import SettingsForm from "./SettingsForm";

const SettingsContainer = () => {
  return (
    <div className="p-10 flex justify-center">
      <div className="w-full max-w-4xl">
        <SettingsForm />
      </div>
    </div>
  );
};

export default SettingsContainer;
