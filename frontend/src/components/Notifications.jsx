import React from "react";

export default function Notifications({ tasks = [] }) {
  const pendingTasks = tasks.filter(
    (task) => task.status === "pending" || task.status === "assigned"
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {pendingTasks.length > 0 ? (
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          {pendingTasks.map((task, index) => (
            <li key={index}>
              {task.title} - <span className="text-sm text-gray-400">Team ID: {task.teamId}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No pending tasks 🎉</p>
      )}
    </div>
  );
}
