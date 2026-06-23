import { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import Dashboard from "./Dashboard";
import Teams from "./Teams";
import Tasks from "./Tasks";
import Notifications from "./Notifications";
import Calendar from "./Calendar";
import Profile from "./Profile";
import IdeaGeneration from "./IdeaGeneration";
import ChatPage from "./ChatPage";

export default function DashboardPage() {
  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [selectedTeam, setSelectedTeam] =
    useState(null);

  const { user, logout } = useAuth();

  const isManager =
    user?.role === "PROJECT_MANAGER";

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <Dashboard />
        );

      case "teams":
        return (
          <Teams
            onTeamSelect={
              setSelectedTeam
            }
          />
        );

      case "tasks":
        return (
          <Tasks
            selectedTeam={
              selectedTeam
            }
            user={user}
          />
        );

      case "chat":
        return (
          <ChatPage
            user={user}
          />
        );

      case "idea":
        return isManager ? (
          <IdeaGeneration
            user={user}
          />
        ) : (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-red-600">
              Access Denied
            </h2>

            <p className="mt-2 text-gray-600">
              Only Project Managers can access
              Idea Generation.
            </p>
          </div>
        );

      case "notifications":
        return <Notifications />;

      case "calendar":
        return (
          <Calendar
            user={user}
          />
        );

      case "profile":
        return (
          <Profile
            user={user}
          />
        );

      default:
        return (
          <Dashboard />
        );
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        logout={logout}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">

          {/* Role Badge */}
          <div className="flex justify-end mb-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isManager
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {isManager
                ? "PROJECT MANAGER"
                : "TEAM MEMBER"}
            </span>
          </div>

          {renderContent()}

        </main>

      </div>

    </div>
  );
}