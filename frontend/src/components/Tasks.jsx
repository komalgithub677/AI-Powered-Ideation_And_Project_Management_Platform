import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Tasks({ selectedTeam }) {
const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
const [assignedTo, setAssignedTo] = useState("");
const [loading, setLoading] = useState(false);

// ================= FETCH TASKS =================

const fetchTasks = async () => {
try {
const token = localStorage.getItem("token");

  setLoading(true);

  const res = await axios.get(
    "http://localhost:8080/api/user/tasks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setTasks(res.data);
} catch (err) {
  console.error("Error fetching tasks:", err);
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchTasks();
}, []);

// ================= CREATE TASK =================

const handleAddTask = async () => {
if (!title.trim()) {
alert("Please enter task title");
return;
}


if (!desc.trim()) {
  alert("Please enter task description");
  return;
}

if (!assignedTo.trim()) {
  alert("Please enter assigned user email");
  return;
}

if (!selectedTeam?.id) {
  alert("Please select a team");
  return;
}

try {
  const token = localStorage.getItem("token");

  await axios.post(
    "http://localhost:8080/api/manager/tasks",
    {
      title,
      description: desc,
      assignedTo,
      teamId: selectedTeam.id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  alert("✅ Task Assigned Successfully");

  setTitle("");
  setDesc("");
  setAssignedTo("");

  fetchTasks();
} catch (err) {
  console.error("Task Creation Error:", err);

  alert(
    err?.response?.data?.message ||
      err?.response?.data ||
      "Task creation failed"
  );
}


};

// ================= COMPLETE TASK =================

const markCompleted = async (taskId) => {
try {
const token = localStorage.getItem("token");


  await axios.put(
    `http://localhost:8080/api/user/tasks/${taskId}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  fetchTasks();
} catch (err) {
  console.error(err);
  alert("Failed to mark task completed");
}


};

return ( <div className="p-6 bg-white rounded-2xl shadow-lg"> <h2 className="text-2xl font-bold mb-6">
Task Management </h2>

  {selectedTeam && (
    <div className="mb-5 p-4 bg-blue-50 rounded-xl border">
      <h3 className="font-semibold text-lg">
        {selectedTeam.name}
      </h3>

      <p className="text-gray-600">
        {selectedTeam.domain}
      </p>
    </div>
  )}

  <div className="bg-gray-50 p-5 rounded-xl mb-8 border">
    <h3 className="font-bold text-lg mb-4">
      Create New Task
    </h3>

    <div className="space-y-3">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        placeholder="Task Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows="4"
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="email"
        placeholder="Assign User Email"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />

      <button
        onClick={handleAddTask}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
      >
        Assign Task
      </button>
    </div>
  </div>

  <div>
    <h3 className="font-bold text-lg mb-4">
      My Tasks
    </h3>

    {loading ? (
      <p>Loading tasks...</p>
    ) : tasks.length === 0 ? (
      <p className="text-gray-500">
        No tasks found.
      </p>
    ) : (
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg">
                {task.title}
              </h4>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  task.status === "COMPLETED"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {task.status}
              </span>
            </div>

            <p className="mt-2 text-gray-600">
              {task.description}
            </p>

            <div className="mt-3 text-sm text-gray-500">
              <p>
                <strong>Assigned To:</strong>{" "}
                {task.assignedTo?.email}
              </p>

              <p>
                <strong>Created By:</strong>{" "}
                {task.createdBy?.email}
              </p>

              <p>
                <strong>Team:</strong>{" "}
                {task.team?.name}
              </p>
            </div>

            {task.status !== "COMPLETED" && (
              <button
                onClick={() =>
                  markCompleted(task.id)
                }
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Mark Completed
              </button>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
</div>


);
}
