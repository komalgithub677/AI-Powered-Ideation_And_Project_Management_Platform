// src/components/SignupPage.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";   // ✅ FIXED PATH
import axios from "axios";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      const { token, user } = response.data;
      setAuthData(token, user);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response.data.error || "Email already exists.");
      } else {
        setError("Network error. Please try again later.");
      }
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="relative z-10 bg-[#0A2540] rounded-3xl shadow-2xl w-full max-w-md p-8">

        <h1 className="text-xl font-bold text-white text-center mb-4">
          AI-Powered Ideation & Project Management Platform
        </h1>

        <h2 className="text-3xl font-extrabold text-center text-white mb-1">
          Create Account
        </h2>
        <p className="text-white/80 text-sm text-center mb-6">
          Join the collaborative workspace 🚀
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-400/50 text-red-200 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSignup}>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                required
                minLength={6}
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-white/90 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
