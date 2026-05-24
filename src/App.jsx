import React from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <Sidebar />

      <div className="flex-1">
        <Navbar />
        <Dashboard />
        
      </div>
    </div>
  );
};

export default App;
