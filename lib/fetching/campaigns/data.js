const IS_PRODUCTION = process.env.NODE_ENV === "production";

const SERVER_URL = IS_PRODUCTION
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

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

// ALL CAMPAIGNS - CARD: PREVIEW DATA
export const fetchAllCampaigns = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/dashboard/campaigns/all/${restaurantOwnerId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// ONGOING/UPCOMING CAMPAIGNS - CHART: RANGE OF DATES
export const fetchCampaignsTiming = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/dashboard/campaigns/dates/${restaurantOwnerId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
