import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";
import { useState } from "react";

function DashboardLayout() {

  const [authPopup, setAuthPopup] = useState({
    open: false,
    type: "login"
  });


  return (
    <div className="h-screen flex flex-col bg-[#000] text-white">

      {/* Header */}
      <Header setAuthPopup={setAuthPopup} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="w-64 border-r border-gray-800 p-4 flex flex-col">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;