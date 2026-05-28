import React from "react";

const ToggleSwitch = () => {
  return (
    <button className="w-16 h-9 bg-amber-500 rounded-full relative flex items-center px-1 transition-all">

      <div className="w-7 h-7 bg-white rounded-full absolute right-1 transition-all"></div>

    </button>
  );
};

export default ToggleSwitch;