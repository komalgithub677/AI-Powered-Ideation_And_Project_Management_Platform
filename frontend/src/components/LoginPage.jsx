// src/components/LoginPage.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email,
          password,
        }
      );

      const { token, email: userEmail, role } = res.data;

      setAuthData(token, {
        email: userEmail,
        role,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);

      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          setError(err.response.data);
        } else {
          setError(
            err.response.data.message ||
              err.response.data.error ||
              "Invalid Credentials"
          );
        }
      } else {
        setError("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-[#0A2540] rounded-3xl shadow-2xl p-8">

        <h1 className="text-xl font-bold text-center text-white mb-2">
          AI-Powered Ideation & Project Management Platform
        </h1>

        <h2 className="text-3xl font-extrabold text-center text-white mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-white/80 mb-6">
          Login to continue 🚀
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-400 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-white mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
              loading
                ? "bg-blue-500 opacity-50 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center text-white/80 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-yellow-300 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}