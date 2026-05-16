import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Tasks({ selectedTeam }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignedTo, setAssignedTo] = useState(""); // comma separated emails
  const [loading, setLoading] = useState(false);

  // Fetch tasks for selected team
  const fetchTasks = async () => {
    if (!selectedTeam?._id) return;
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/tasks");
      const teamTasks = res.data.filter((t) => t.teamId === selectedTeam._id);
      setTasks(teamTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedTeam]);

  const handleAddTask = async () => {
    if (!title.trim() || !desc.trim()) return;
    try {
      const emails = assignedTo
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e);

      const res = await axios.post("http://localhost:5000/api/tasks", {
        title,
        desc,
        teamId: selectedTeam._id,
        assignedTo: emails,
        createdBy: "lead@example.com", // TODO: replace with logged-in user's email
      });

      setTasks((prev) => [...prev, res.data]);
      setTitle("");
      setDesc("");
      setAssignedTo("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        Tasks for {selectedTeam?.name || "Team"} (
        {selectedTeam?.domain || "No domain"})
      </h2>

      {/* Add Task Form */}
      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Task Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Assign to emails (comma separated)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {/* Modern Add Task Button */}
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-200 ease-in-out flex items-center justify-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>Add Task</span>
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {loading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">No tasks assigned yet.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="p-4 border rounded-lg shadow bg-white"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-gray-600 text-sm">{task.desc}</p>
              <p className="text-xs mt-1">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={
                    task.status === "completed"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {task.status}
                </span>
              </p>
              <p className="text-xs mt-1">
                <span className="font-medium">Assigned To:</span>{" "}
                {task.assignedTo?.join(", ") || "None"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
