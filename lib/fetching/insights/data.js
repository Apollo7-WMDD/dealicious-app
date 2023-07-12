import { SERVER_URL } from "@/utils/constants";

// INSIGHTS - OVERVIEW : CARD -> TOTAL REVENUE
export const fetchTotalRevenue = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/dashboard/insights/total_revenue/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - OVERVIEW : CARD -> AVERAGE BILL
export const fetchAverageBill = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/dashboard/insights/average_bill/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - OVERVIEW : CARD -> COSTUMER SPENDINGS
export const fetchCustomerSpendings = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/dashboard/insights/costumer_spendings/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - OVERVIEW : CARD -> NUMBER OF
export const fetchNumberOf = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/dashboard/insights/number_customers/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - OVERVIEW : CARD -> TO IMPROVE
export const fetchToImprove = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/dashboard/insights/improvements/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - OVERVIEW : CARD -> COSTUMER CAMPAIGN USAGE BY TIME
export const fetchCustomerCampaignUsageByTime = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/dashboard/insights/customer_campaign_time/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - OVERVIEW : CARD -> TOP SIX CAMPAIGNS
export const fetchTopSixCampaigns = async (restaurantOwnerId) => {
  const url = `${SERVER_URL}/api/dashboard/insights/top_six_campaigns/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
