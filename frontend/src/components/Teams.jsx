import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";

const Teams = forwardRef(({ onTeamSelect }, ref) => {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [members, setMembers] = useState("");

  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const isManager =
    user?.role === "PROJECT_MANAGER";

  // ==========================
  // FETCH TEAMS
  // ==========================

  const fetchTeams = async () => {
    try {
      if (!token) return;

      setLoading(true);

      const res = await axios.get(
        "http://localhost:8080/api/manager/teams",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Teams Loaded:", res.data);

      setTeams(res.data || []);
    } catch (err) {
      console.error(
        "Fetch Teams Error:",
        err
      );

      console.log(
        "STATUS:",
        err.response?.status
      );

      console.log(
        "DATA:",
        err.response?.data
      );

      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // CREATE TEAM
  // ==========================

  const handleCreateTeam = async () => {
    if (!name.trim()) {
      alert("Team name is required");
      return;
    }

    try {
      setCreating(true);

      const membersArray = members
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);

      const res = await axios.post(
        "http://localhost:8080/api/manager/teams",
        {
          name,
          domain,
          members: membersArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setDomain("");
      setMembers("");

      alert(
        "Team created successfully. Invitations sent."
      );

      await fetchTeams();

      if (onTeamSelect) {
        onTeamSelect(res.data);
      }
    } catch (err) {
      console.error(
        "Create Team Error:",
        err
      );

      alert(
        err.response?.data ||
          "Failed to create team"
      );
    } finally {
      setCreating(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchTeams,
  }));

  useEffect(() => {
    if (isManager) {
      fetchTeams();
    }
  }, [isManager]);

  // ==========================
  // TEAM MEMBER VIEW
  // ==========================

  if (!isManager) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          My Team
        </h2>

        <p className="text-gray-500">
          Team information will appear here.
        </p>
      </div>
    );
  }

  // ==========================
  // PROJECT MANAGER VIEW
  // ==========================

  return (
    <div className="space-y-6">

      {/* Create Team */}

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-5">
          Create Team
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Team Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Domain"
            value={domain}
            onChange={(e) =>
              setDomain(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows={4}
            value={members}
            placeholder="member1@gmail.com, member2@gmail.com"
            onChange={(e) =>
              setMembers(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleCreateTeam}
            disabled={creating}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {creating
              ? "Creating..."
              : "Create Team & Send Invites"}
          </button>
        </div>
      </div>

      {/* Teams List */}

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          My Teams
        </h2>

        {loading ? (
          <p>Loading teams...</p>
        ) : teams.length === 0 ? (
          <p className="text-gray-500">
            No teams found
          </p>
        ) : (
          <div className="space-y-3">
            {teams.map((team) => (
              <div
                key={team.id}
                onClick={() =>
                  onTeamSelect?.(team)
                }
                className="border rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition"
              >
                <h3 className="font-semibold text-lg">
                  {team.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Domain: {team.domain}
                </p>

                <p className="text-sm text-gray-500">
                  Members: {team.memberCount || 0}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
});

export default Teams;