// src/components/SignupPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PROJECT_MANAGER",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      console.log("Registration Success:", response.data);

      if (formData.role === "USER") {
        setSuccess(
          "Team Member account created successfully. Please login."
        );
      } else {
        setSuccess(
          "Project Manager account created successfully."
        );
      }

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Signup Error:", err);

      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          setError(err.response.data);
        } else {
          setError(
            err.response.data.message ||
              err.response.data.error ||
              "Registration failed."
          );
        }
      } else if (err.request) {
        setError(
          "Cannot connect to Spring Boot server on port 8080."
        );
      } else {
        setError("Something went wrong.");
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
          Create Account
        </h2>

        <p className="text-center text-white/80 mb-6">
          Join the collaborative workspace 🚀
        </p>

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-400 text-green-200">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-400 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-white mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
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
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-white mb-1">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="PROJECT_MANAGER">
                Project Manager
              </option>

              <option value="USER">
                Team Member
              </option>
            </select>

            {formData.role === "USER" && (
              <p className="text-xs text-yellow-300 mt-2">
                Team Members must receive and accept an invitation
                before registering.
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
              loading
                ? "bg-blue-500 opacity-50 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-white/80 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-300 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}