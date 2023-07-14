import { SERVER_URL } from "@/utils/constants";

// OVERVIEW CAMPAIGNS - TOTAL REVENUE - CUSTOMERS
export const fetchCampaignsData = async (restaurantOwnerId) => {
  const url = `/api/dashboard/campaigns/overview/${restaurantOwnerId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// ALL CAMPAIGNS - CARD: PREVIEW DATA
export const fetchAllCampaigns = async (restaurantOwnerId) => {
  const url = `/api/dashboard/campaigns/all/${restaurantOwnerId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// ONGOING/UPCOMING CAMPAIGNS - CHART: RANGE OF DATES
export const fetchCampaignsTiming = async (restaurantOwnerId) => {
  const url = `/api/dashboard/campaigns/dates/${restaurantOwnerId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
