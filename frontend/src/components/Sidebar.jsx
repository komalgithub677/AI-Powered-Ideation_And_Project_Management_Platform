import { useState } from "react";

import {
  LayoutDashboard,
  Users,
  Bell,
  Calendar,
  User,
  LogOut,
  ClipboardList,
  Lightbulb,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar({
  activeSection,
  setActiveSection,
  logout,
}) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "teams",
      label: "Teams",
      icon: Users,
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: ClipboardList,
    },
    {
      id: "chat",
      label: "Live Chat",
      icon: MessageCircle,
    },
    {
      id: "idea",
      label: "Idea Generation",
      icon: Lightbulb,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: Calendar,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <aside
      className={`bg-[#0A2540] text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
        {!collapsed && (
          <span className="text-xl font-bold">
            AI Platform
          </span>
        )}

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="text-white"
        >
          {collapsed ? (
            <Menu size={20} />
          ) : (
            <X size={20} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li
                key={item.id}
                onClick={() =>
                  setActiveSection(item.id)
                }
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg cursor-pointer transition-all ${
                  activeSection === item.id
                    ? "bg-white/20 font-semibold"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon size={20} />

                {!collapsed &&
                  item.label}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/20">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-600/30 transition-all"
        >
          <LogOut size={20} />

          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}