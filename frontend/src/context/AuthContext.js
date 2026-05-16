import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

  // ✅ Shared helper for login & signup
  const setAuthData = (token, userData) => {
    // Save token
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Save user
    setUser(userData);

    // Connect socket (if not already connected)
    if (!socket) {
      const newSocket = io("http://localhost:5000");
      newSocket.emit("join", userData._id); // use MongoDB _id
      setSocket(newSocket);
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      setAuthData(token, user);

      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  // ✅ On initial load, check token & fetch user
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios
        .get("http://localhost:5000/api/auth/me")
        .then((res) => {
          setUser(res.data);

          if (!socket) {
            const newSocket = io("http://localhost:5000");
            newSocket.emit("join", res.data._id);
            setSocket(newSocket);
          }
        })
        .catch(() => {
          logout();
        });
    }
  }, []); // run once on mount

  return (
    <AuthContext.Provider value={{ user, login, logout, setAuthData, socket }}>
      {children}
    </AuthContext.Provider>
  );
};
