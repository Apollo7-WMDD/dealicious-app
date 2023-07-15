// FETCH ALL THE CAMPAGINS FOR THE RESTAURANT
export const fetchRestaurantCampaigns = async (restaurantId) => {
  const url = `/api/restaurant/all_campaigns/${restaurantId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
