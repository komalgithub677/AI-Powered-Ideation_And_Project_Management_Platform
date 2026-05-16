// src/components/Teams.jsx
import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import axios from "axios";

const Teams = forwardRef(({ onTeamSelect }, ref) => {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [members, setMembers] = useState(""); // comma-separated emails
  const [loading, setLoading] = useState(false);

  // Fetch all teams from backend
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/teams");
      setTeams(res.data);
    } catch (err) {
      console.error("Error fetching teams:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new team
  const handleCreateTeam = async () => {
    if (!name.trim()) return;

    const membersArray = members
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m);

    try {
      const res = await axios.post("http://localhost:5000/api/teams", {
        name,
        domain,
        members: membersArray,
      });

      // Add team to state so it shows immediately
      setTeams((prev) => [...prev, res.data]);

      // Reset input fields
      setName("");
      setDomain("");
      setMembers("");

      // Auto-select created team for dashboard
      if (onTeamSelect) onTeamSelect(res.data);
    } catch (err) {
      console.error("Error creating team:", err);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchTeams,
  }));

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="p-8 space-y-8">
      {/* Create Team Section */}
      <section className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Create a New Team</h2>
        <input
          type="text"
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Members (comma separated emails)"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />
        <button
          onClick={handleCreateTeam}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:opacity-90"
        >
          Create Team
        </button>
      </section>

      {/* Team List Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Your Teams</h2>
        {loading ? (
          <p className="text-gray-500">Loading teams...</p>
        ) : teams.length === 0 ? (
          <p className="text-gray-500">No teams created yet.</p>
        ) : (
          <div className="space-y-3">
            {teams.map((team) => (
              <div
                key={team._id}
                onClick={() => onTeamSelect?.(team)}
                className="p-4 border rounded-lg cursor-pointer bg-white hover:bg-gray-50"
              >
                <h3 className="font-semibold">{team.name}</h3>
                <p className="text-gray-500">Domain: {team.domain || "Not specified"}</p>
                <p className="text-sm text-gray-400">
                  Members: {team.members?.length > 0 ? team.members.join(", ") : "No members"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
});

export default Teams;
