
import React, {
  createContext,
  useContext,
  useState,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () =>
  useContext(AuthContext);

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem("user")
      )
    );

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  const setAuthData = (
    jwtToken,
    userData
  ) => {

    localStorage.setItem(
      "token",
      jwtToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${jwtToken}`;

    setToken(jwtToken);
    setUser(userData);
  };

  const clearAuth = () => {

    delete axios.defaults.headers.common[
      "Authorization"
    ];

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);
    setToken(null);
  };

  const logout = () => {
    localStorage.clear();

    delete axios.defaults.headers.common[
      "Authorization"
    ];

    setUser(null);
    setToken(null);
  };

  const isManager =
    user?.role ===
    "PROJECT_MANAGER";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logout,
        clearAuth,
        setAuthData,
        isManager,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

