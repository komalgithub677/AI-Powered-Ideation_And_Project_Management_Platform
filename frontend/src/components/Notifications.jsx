import React, { useState, useEffect } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: "success",
        message:
          "Team 'Java Development Team' created successfully.",
        time: "2 minutes ago",
      },
      {
        id: 2,
        type: "email",
        message:
          "Invitation email sent successfully to john@gmail.com",
        time: "5 minutes ago",
      },
      {
        id: 3,
        type: "email",
        message:
          "Invitation email sent successfully to alex@gmail.com",
        time: "5 minutes ago",
      },
      {
        id: 4,
        type: "info",
        message:
          "Project 'AI Workspace' created successfully.",
        time: "10 minutes ago",
      },
      {
        id: 5,
        type: "success",
        message:
          "Team member joined using invitation link.",
        time: "20 minutes ago",
      },
    ]);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "email":
        return "📧";
      case "info":
        return "📌";
      default:
        return "🔔";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Notifications
        </h2>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {notifications.length} Notifications
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No notifications available
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-4 p-4 border rounded-xl hover:bg-gray-50 transition"
            >
              <div className="text-2xl">
                {getIcon(notification.type)}
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {notification.message}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}