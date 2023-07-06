"use client";
import { createContext, useState } from "react";

const UserTypeContext = createContext();

const UserTypeProvider = ({ children }) => {
  const [user, setuser] = useState({
    restaurantOwnerId: "",
    restaurantId: "",
  });
  const [isOwner, setIsOwner] = useState(true);

  const [restaurantId, setRestaurantId] = useState("");

  const updateIsOwner = (isOwner) => {
    setIsOwner(() => isOwner);
  };

  const updateuser = (restaurantOwnerId, restaurantId) => {
    setuser({
      restaurantOwnerId: restaurantOwnerId,
      restaurantId: restaurantId,
    });
  };

  const updateRestaurantId = (restaurantId) => {
    setRestaurantId(restaurantId);
  };

  return (
    <UserTypeContext.Provider
      value={{
        user,
        updateuser,
        isOwner,
        updateIsOwner,
        restaurantId,
        updateRestaurantId,
      }}
    >
      {children}
    </UserTypeContext.Provider>
  );
};

export { UserTypeContext, UserTypeProvider };
