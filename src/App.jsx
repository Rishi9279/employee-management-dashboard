import React from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div>
      <Sidebar />

      <div>
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
