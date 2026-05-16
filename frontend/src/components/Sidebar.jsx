import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Bell,
  Calendar,
  User,
  LogOut,
  MessageSquare,
  ClipboardList,
  Lightbulb,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar({ activeSection, setActiveSection }) {
  const [comments, setComments] = useState([
    { user: "Alice", text: "Great work team!" },
    { user: "Bob", text: "Let's finish the tasks." },
  ]);
  const [newComment, setNewComment] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, { user: "You", text: newComment }]);
    setNewComment("");
  };

  return (
    <aside
      className={`bg-[#0a2540] text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/20">
        {!collapsed && <span className="text-xl font-extrabold">AI Platform</span>}
        <button className="focus:outline-none" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-1">
          <li
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg mx-3 ${
              activeSection === "dashboard" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            <LayoutDashboard size={20} /> {!collapsed && "Dashboard"}
          </li>
          <li
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg mx-3 ${
              activeSection === "teams" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setActiveSection("teams")}
          >
            <Users size={20} /> {!collapsed && "Teams"}
          </li>
          <li
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg mx-3 ${
              activeSection === "tasks" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setActiveSection("tasks")}
          >
            <ClipboardList size={20} /> {!collapsed && "Tasks"}
          </li>
          {/* Idea Generation */}
          <li
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg mx-3 ${
              activeSection === "idea" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setActiveSection("idea")}
          >
            <Lightbulb size={20} /> {!collapsed && "Idea Generation"}
          </li>
          <li
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg mx-3 ${
              activeSection === "notifications" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setActiveSection("notifications")}
          >
            <Bell size={20} /> {!collapsed && "Notifications"}
          </li>
          <li
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg mx-3 ${
              activeSection === "calendar" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setActiveSection("calendar")}
          >
            <Calendar size={20} /> {!collapsed && "Calendar"}
          </li>
          <li
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg mx-3 ${
              activeSection === "profile" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
            }`}
            onClick={() => setActiveSection("profile")}
          >
            <User size={20} /> {!collapsed && "Profile"}
          </li>
          <li className="flex items-center gap-3 p-3 mx-3 cursor-pointer rounded-lg hover:bg-red-600/30">
            <LogOut size={20} /> {!collapsed && "Logout"}
          </li>
        </ul>
      </nav>

      {/* Comments Section */}
      {!collapsed && (
        <div className="bg-[#0f2f52] p-4 border-t border-white/20">
          <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
            <MessageSquare size={18} className="text-blue-300" /> Comments
          </h2>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {comments.map((c, i) => (
              <div
                key={i}
                className="p-2 bg-white/10 rounded-lg text-sm text-gray-200"
              >
                <span className="font-bold text-blue-300">{c.user}: </span>
                {c.text}
              </div>
            ))}
          </div>
          <form className="flex gap-2 mt-3" onSubmit={handleAddComment}>
            <input
              type="text"
              className="flex-1 border border-gray-500 rounded-lg px-2 py-1 text-sm outline-none text-black"
              placeholder="Add comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm">
              Post
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
