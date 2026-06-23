import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between">
      <h1 className="font-bold text-xl">
        AI-Powered Ideation Platform
      </h1>

      <div>
        {user?.email}
      </div>
    </nav>
  );
}