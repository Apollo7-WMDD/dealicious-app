"use client";

// user context
import { useContext, useEffect } from "react";
import { DashBoardContext } from "@/app/dashboard/context/DashboardContext";

const PassContext = ({ restaurantOwnerId, restaurantId }) => {
  const { updateuser } = useContext(DashBoardContext);

  useEffect(() => {
    updateuser(restaurantOwnerId, restaurantId);
  }, []);

  return <div>PassContext</div>;
};

export default PassContext;
