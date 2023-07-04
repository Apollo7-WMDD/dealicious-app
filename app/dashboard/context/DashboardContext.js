"use client";
import { createContext, useState } from "react";

const DashBoardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [user, setuser] = useState({
    restaurantOwnerId: "",
    restaurantId: "",
  });

  const updateuser = (restaurantOwnerId, restaurantId) => {
    setuser({
      restaurantOwnerId: restaurantOwnerId,
      restaurantId: restaurantId,
    });
  };

  return (
    <DashBoardContext.Provider value={{ user, updateuser }}>
      {children}
    </DashBoardContext.Provider>
  );
};

export { DashBoardContext, DashboardProvider };
