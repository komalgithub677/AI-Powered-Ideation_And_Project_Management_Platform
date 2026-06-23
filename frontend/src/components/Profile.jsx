import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Shield,
  Users,
  Bell,
  ClipboardList,
  Briefcase,
} from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
    } catch (error) {
      console.error("Profile Error:", error);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-900 text-white">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-lg">

        <div className="flex items-center gap-6">

          <div className="w-28 h-28 rounded-full bg-white text-blue-700 flex items-center justify-center text-4xl font-bold">
            {profile.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              {profile.name}
            </h1>

            <p className="text-lg opacity-90">
              {profile.email}
            </p>

            <span className="inline-block mt-2 px-4 py-1 bg-white text-blue-700 rounded-full font-semibold">
              {profile.role}
            </span>
          </div>

        </div>

      </div>

      {/* Stats Cards */}

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div className="bg-slate-800 p-6 rounded-2xl">
          <Users size={35} />
          <h2 className="text-3xl font-bold mt-3">
            {profile.teamMembersCount}
          </h2>
          <p>Team Members</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <ClipboardList size={35} />
          <h2 className="text-3xl font-bold mt-3">
            {profile.assignedTasksCount}
          </h2>
          <p>Assigned Tasks</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <Briefcase size={35} />
          <h2 className="text-3xl font-bold mt-3">
            {profile.createdTasksCount}
          </h2>
          <p>Created Tasks</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <Bell size={35} />
          <h2 className="text-3xl font-bold mt-3">
            {profile.notificationsCount}
          </h2>
          <p>Notifications</p>
        </div>

      </div>

      {/* Details Section */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            User Information
          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <User />
              <div>
                <p className="text-gray-400">
                  Name
                </p>
                <h3>{profile.name}</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail />
              <div>
                <p className="text-gray-400">
                  Email
                </p>
                <h3>{profile.email}</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield />
              <div>
                <p className="text-gray-400">
                  Role
                </p>
                <h3>{profile.role}</h3>
              </div>
            </div>

          </div>

        </div>

        {/* Team Details */}

        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            Team Information
          </h2>

          <div className="space-y-5">

            <div>
              <p className="text-gray-400">
                Team Name
              </p>

              <h3 className="text-lg">
                {profile.teamName}
              </h3>
            </div>

            <div>
              <p className="text-gray-400">
                Team Domain
              </p>

              <h3 className="text-lg">
                {profile.teamDomain}
              </h3>
            </div>

            <div>
              <p className="text-gray-400">
                Members
              </p>

              <h3 className="text-lg">
                {profile.teamMembersCount}
              </h3>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}