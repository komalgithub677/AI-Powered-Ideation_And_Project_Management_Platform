import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, isManager } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name}
        </h1>

        <p className="text-gray-500 mt-2">
          AI-Powered Ideation & Project Workspace
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold">
            Role
          </h2>

          <p className="mt-3 text-blue-600 font-bold">
            {isManager
              ? "PROJECT MANAGER"
              : "TEAM MEMBER"}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold">
            Projects
          </h2>

          <p className="mt-3 text-3xl font-bold">
            --
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold">
            Tasks
          </h2>

          <p className="mt-3 text-3xl font-bold">
            --
          </p>
        </div>
      </div>
    </div>
  );
}