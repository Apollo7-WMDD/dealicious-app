import { SERVER_URL } from "@/utils/constants";

// fetch users codes
export const fetchUserCodes = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/dashboard/burn_code/${restaurantOwnerId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
