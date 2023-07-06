"use client";

// user context
import { useContext, useEffect } from "react";
import { UserTypeContext } from "@/app/context/UserTypeContext";

const PassContext = ({ restaurantOwnerId, restaurantId }) => {
  const { updateuser } = useContext(UserTypeContext);

  useEffect(() => {
    updateuser(restaurantOwnerId, restaurantId);
  }, []);

  return null;
};

export default PassContext;
