// FETCH THE RESTAURANT ID
export const fetchRestaurantId = async (restaurantOwnerId) => {
  const url = `/api/owner/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
