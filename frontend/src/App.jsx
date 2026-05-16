// src/App.jsx
import React, { useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // ⬅ BrowserRouter removed
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TeamProvider } from "./context/TeamContext";

import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import Teams from "./components/Teams";
import IdeaGeneration from "./components/IdeaGeneration";


// ------------------ ROUTE GUARDS ------------------
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
};


// ------------------ 404 PAGE ------------------
const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen text-center">
    <div>
      <h1 className="text-4xl font-bold text-gray-600 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-4">The page you are looking for does not exist.</p>
      <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Go Home
      </a>
    </div>
  </div>
);


// ------------------ APP CONTENT ROUTING ------------------
function AppContent() {
  const { user, setAuthData } = useAuth();
  const teamsRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken && !user) {
      setAuthData(storedToken, JSON.parse(storedUser));
    }
  }, [user, setAuthData]);

  const handleScrollToTask = (taskId) => {
    if (teamsRef.current) teamsRef.current.scrollToTask(taskId);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/signup" />} />

        {/* Public Pages */}
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

        {/* Protected Dashboard Pages */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage onScrollToTask={handleScrollToTask} /></ProtectedRoute>} />
        <Route path="/teams" element={<ProtectedRoute><Teams ref={teamsRef} /></ProtectedRoute>} />
        <Route path="/idea" element={<ProtectedRoute><IdeaGeneration /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}


// ------------------ EXPORT APP (NO BROWSER ROUTER here) ------------------
export default function App() {
  return (
    <AuthProvider>
      <TeamProvider>
        <AppContent />
      </TeamProvider>
    </AuthProvider>
  );
}
