const IS_PRODUCTION = process.env.NODE_ENV === "production";

const SERVER_URL = IS_PRODUCTION
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

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
