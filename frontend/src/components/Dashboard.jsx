import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Teams from "./Teams";
import KanbanBoard from "./KanbanBoard";
import axios from "axios";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

export default function DashboardPage() {
  const { user, isManager, logout, token } = useAuth();
  const navigate = useNavigate();

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [projects, setProjects] = useState([]);

  /* ---------------- Fetch Projects for Dashboard Sidebar ---------------- */
  useEffect(() => {
    axios.get("http://localhost:5000/api/projects", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProjects(res.data))
    .catch(err => console.error(err));
  }, []);

  /* ---------------- Fetch Tasks for Selected Team ---------------- */
  useEffect(() => {
    if (!selectedTeam) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const teamTasks = res.data.filter(t => t.teamId === selectedTeam._id);
        setTasks(teamTasks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [selectedTeam]);

  /* ---------------- Live Notifications via Socket.io ---------------- */
  useEffect(() => {
    socket.on("taskCreated", (task) => {
      setNotifications(prev => [
        `🆕 Task "${task.title}" assigned to ${task.assignedTo.join(", ")}`,
        ...prev,
      ]);

      if (selectedTeam && task.teamId === selectedTeam._id) {
        setTasks(prev => [...prev, task]);
      }
    });

    return () => socket.off("taskCreated");
  }, [selectedTeam]);


  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          AI-Powered Ideation & Project Workspace
        </h1>

        <div className="flex gap-4 items-center">
          <span className="text-yellow-300 font-semibold">Role: {user?.role}</span>
          <button className="px-4 py-2 bg-red-600 rounded" onClick={logout}>
            Logout
          </button>
        </div>
      </div>


      {/* MANAGER-ONLY CONTROLS */}
      {isManager && (
        <div className="p-5 bg-gray-900 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">Manager Controls</h2>

          <button
            onClick={() => navigate("/create-project")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg mr-3"
          >➕ Create Project</button>

          <button
            onClick={() => navigate("/invite")}
            className="px-5 py-2 bg-green-600 text-white rounded-lg"
          >📩 Invite Member</button>
        </div>
      )}


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ================= Left Side : Teams + Project Selection ================= */}
        <div>
          <Teams onTeamSelect={setSelectedTeam} />

          <div className="mt-6 bg-white rounded-xl p-5 shadow">
            <h2 className="font-bold text-lg mb-3">Your Projects</h2>

            {projects.length === 0 ? (
              <p className="text-gray-500">No projects yet.</p>
            ) : (
              <ul className="space-y-2">
                {projects.map(p => (
                  <li
                    key={p._id}
                    className="p-3 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                    onClick={() => navigate(`/project/${p._id}`)}
                  >
                    📁 {p.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>


        {/* ================= Right Side : Kanban Board ================= */}
        <div>
          {selectedTeam ? (
            <KanbanBoard selectedTeam={selectedTeam} tasks={tasks} />
          ) : (
            <div className="p-6 bg-gray-800 text-gray-300 rounded shadow-lg">
              👉 Select a team to view tasks and Kanban board
            </div>
          )}
        </div>

      </div>


      {/* ================= Notifications ================= */}
      <div className="mt-10 bg-white p-5 rounded shadow">
        <h2 className="font-bold mb-3">Notifications</h2>

        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">No notifications yet.</p>
        ) : (
          <ul className="space-y-2 max-h-56 overflow-y-auto">
            {notifications.map((n, i) => (
              <li key={i} className="p-2 bg-gray-50 border rounded text-sm">{n}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
