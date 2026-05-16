import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Teams from "./Teams";
import Tasks from "./Tasks";
import Notifications from "./Notifications";
import Calendar from "./Calendar";
import Profile from "./Profile";
import IdeaGeneration from "./IdeaGeneration"; // ✅ Import IdeaGeneration component

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, logout, socket } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard user={user} />;
      case "teams":
        return <Teams user={user} setActiveSection={setActiveSection} />;
      case "tasks":
        return <Tasks user={user} />;
      case "idea":
        return <IdeaGeneration user={user} />; // ✅ Render IdeaGeneration
      case "notifications":
        return <Notifications user={user} socket={socket} />;
      case "calendar":
        return <Calendar user={user} />;
      case "profile":
        return <Profile user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar user={user} onLogout={logout} />
      <div className="flex flex-1">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-8 overflow-y-auto">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}
