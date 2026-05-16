import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login delay
    setTimeout(() => {
      setAuthData("dummy-token", { email });
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="relative z-10 bg-[#0A2540] rounded-3xl shadow-2xl w-full max-w-md p-8">
        {/* Project Title */}
        <div className="mb-4 text-center">
          <h1 className="text-xl font-bold text-white">
            AI-Powered Ideation & Project Management Platform
          </h1>
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-white/80 text-sm mt-1">Log in to continue 🚀</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-sm text-blue-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
            }`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-white/80 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-300 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
