import { SERVER_URL } from "@/utils/constants";

// PROFILE - POPULATE PAGE WITH DATA
export const fetchProfileData = async (restaurantOwnerId) => {
  const response = await fetch(
    `${SERVER_URL}/api/dashboard/profile/data/${restaurantOwnerId}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

import { SERVER_URL } from "@/utils/constants";

// PROFILE - POPULATE PAGE WITH DATA
export const fetchProfileDataSC = async (restaurantOwnerId) => {
  const response = await fetch(
    `${SERVER_URL}/api/dashboard/profile/data_sc/${restaurantOwnerId}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
