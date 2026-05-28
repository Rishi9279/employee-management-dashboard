import React from "react";
import ToggleSwitch from "./ToggleSwitch";

const SettingsForm = () => {
  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-3xl p-8 shadow-xl">
      {/* Profile Image */}
      <div className="flex items-center gap-5 mb-10">
        <div className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center text-3xl font-bold text-black">R</div>

        <div>
          <h2 className="text-3xl font-bold">Rishi Raj</h2>

          <p className="text-gray-400 mt-1">Frontend Developer</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block mb-3 text-gray-400">Full Name</label>

          <input type="text" placeholder="Enter your name" className="w-full bg-[#0f172a] border border-white/10 px-5 py-4 rounded-2xl outline-none focus:border-amber-400" />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-3 text-gray-400">Email</label>

          <input type="email" placeholder="Enter your email" className="w-full bg-[#0f172a] border border-white/10 px-5 py-4 rounded-2xl outline-none focus:border-amber-400" />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-3 text-gray-400">Password</label>

          <input type="password" placeholder="********" className="w-full bg-[#0f172a] border border-white/10 px-5 py-4 rounded-2xl outline-none focus:border-amber-400" />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-3 text-gray-400">Phone Number</label>

          <input type="text" placeholder="+91 9876543210" className="w-full bg-[#0f172a] border border-white/10 px-5 py-4 rounded-2xl outline-none focus:border-amber-400" />
        </div>
      </div>

      {/* Preferences */}
      <div className="mt-10 space-y-6">
        {/* Dark Mode */}
        <div className="flex items-center justify-between bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-5">
          <div>
            <h3 className="text-xl font-semibold">Dark Mode</h3>

            <p className="text-gray-400 text-sm mt-1">Enable dark theme across dashboard</p>
          </div>

          <ToggleSwitch />
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-5">
          <div>
            <h3 className="text-xl font-semibold">Notifications</h3>

            <p className="text-gray-400 text-sm mt-1">Receive task and activity alerts</p>
          </div>

          <ToggleSwitch />
        </div>

        {/* Email Updates */}
        <div className="flex items-center justify-between bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-5">
          <div>
            <h3 className="text-xl font-semibold">Email Updates</h3>

            <p className="text-gray-400 text-sm mt-1">Receive email updates and reports</p>
          </div>

          <ToggleSwitch />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-4 mt-10">
        <button className="px-6 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition-all">Cancel</button>

        <button className="bg-amber-500 hover:bg-amber-600 transition-all px-7 py-3 rounded-2xl font-medium shadow-lg shadow-amber-500/20">Save Changes</button>
      </div>
    </div>
  );
};

export default SettingsForm;
