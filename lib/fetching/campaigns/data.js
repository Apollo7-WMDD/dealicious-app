import { SERVER_URL } from "@/utils/constants";

// OVERVIEW CAMPAIGNS - TOTAL REVENUE - CUSTOMERS
export const fetchCampaignsData = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/dashboard/campaigns/overview/${restaurantOwnerId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// ALL CAMPAIGNS - PREVIEW DATA
export const fetchAllCampaigns = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/dashboard/campaigns/all/${restaurantOwnerId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
