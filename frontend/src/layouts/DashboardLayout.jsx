import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";
import { useState } from "react";
import ProfilePopup from "../components/ProfilePopup";

function DashboardLayout() {
  const [authPopup, setAuthPopup] = useState({
    open: false,
    type: "login"
  });
  const [profilePopup, setProfilePopup] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">

      {/*  HEADER (ALWAYS VISIBLE) */}
      <Header 
        setAuthPopup={setAuthPopup} 
        toggleSidebar={() => setIsSidebarOpen(true)} 
      />

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* desktop Sidebar */}
        <div className="hidden md:flex border-r border-white/10 p-4">
          <Sidebar 
  openProfile={() => setProfilePopup(true)}
  closeSidebar={() => setIsSidebarOpen(false)} 
/>
        </div>

        {/*  Mobile Menu Button (inside content area, NOT header) */}
        <button
          className="md:hidden fixed top-20 left-4 z-40 bg-white/10 px-3 py-2 rounded-lg"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>

        {/*  Mobile Sidebar Fullscreen */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black flex flex-col">

            {/* Top bar */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h2 className="text-lg">Menu</h2>
              <button onClick={() => setIsSidebarOpen(false)}>✕</button>
            </div>

            {/* Sidebar content */}
            <div className="flex-1 overflow-y-auto p-4">
              <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/*  Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </div>
        <ProfilePopup
  open={profilePopup}
  onClose={() => setProfilePopup(false)}
  user={JSON.parse(localStorage.getItem("userData")).user.username}
  email={JSON.parse(localStorage.getItem("userData")).user.email}
  totalChats={0} // we’ll improve later
/>
      </div>
    </div>
  );
}

export default DashboardLayout;