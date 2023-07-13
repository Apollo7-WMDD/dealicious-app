import { SERVER_URL } from "@/utils/constants";

// PROFILE - POPULATE PAGE WITH DATA
export const fetchRestaurants = async (superCustomerId) => {
  const response = await fetch(
    `${SERVER_URL}/api/superCustomer/restaurants/${superCustomerId}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};