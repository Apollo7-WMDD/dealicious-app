const IS_PRODUCTION = process.env.NODE_ENV === "production";

const SERVER_URL = IS_PRODUCTION
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

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
