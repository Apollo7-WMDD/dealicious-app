import { SERVER_URL } from "@/utils/constants";

// FETCH THE RESTAURANT ID
export const fetchRestaurantId = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/owner/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
