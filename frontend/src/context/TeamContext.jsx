import React, { createContext, useContext, useState } from "react";

const TeamContext = createContext();

export const useTeams = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const addTeam = (team) => setTeams([...teams, team]);

  const addNotification = (note) => setNotifications([note, ...notifications]);

  return (
    <TeamContext.Provider
      value={{ teams, addTeam, notifications, addNotification, setTeams }}
    >
      {children}
    </TeamContext.Provider>
  );
};
