// INSIGHTS - OVERVIEW : CARD -> TOTAL REVENUE
export const fetchTotalRevenue = async (restaurantOwnerId) => {
  const url = `/api/dashboard/insights/total_revenue/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

// INSIGHTS - OVERVIEW : CARD -> AVERAGE BILL
export const fetchAverageBill = async (restaurantOwnerId) => {
  const url = `/api/dashboard/insights/average_bill/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - OVERVIEW : CARD -> COSTUMER SPENDINGS
export const fetchCustomerSpendings = async (restaurantOwnerId) => {
  const url = `/api/dashboard/insights/costumer_spendings/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - OVERVIEW : CARD -> NUMBER OF
export const fetchNumberOf = async (restaurantOwnerId) => {
  const url = `/api/dashboard/insights/number_customers/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - OVERVIEW : CARD -> TO IMPROVE
export const fetchToImprove = async (restaurantOwnerId) => {
  const url = `/api/dashboard/insights/improvements/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - OVERVIEW : CARD -> COSTUMER CAMPAIGN USAGE BY TIME
export const fetchCustomerCampaignUsageByTime = async (restaurantOwnerId) => {
  const url = `/api/dashboard/insights/customer_campaign_time/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - OVERVIEW : CARD -> TOP SIX CAMPAIGNS
export const fetchTopSixCampaigns = async (restaurantOwnerId) => {
  const url = `/api/dashboard/insights/top_six_campaigns/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - SINGLE CAMPAIGN : CARD -> NUMBER OF CUSTOMERS
export const fetchNumberOfCustomersSingle = async (campaignId) => {
  const url = `/api/dashboard/insights_single/number_of/${campaignId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
// INSIGHTS - SINGLE CAMPAIGN : CARD -> SPENDING OF CUSTOMERS
export const fetchSpendingCustomersSingle = async (campaignId) => {
  const url = `/api/dashboard/insights_single/customer_spendings/${campaignId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
// INSIGHTS - SINGLE CAMPAIGN : CARD -> TOTAL REVENUE
export const fetchTotalRevenueSingle = async (campaignId) => {
  const url = `/api/dashboard/insights_single/total_revenue/${campaignId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - SINGLE CAMPAIGN : CARD -> AVERAGE BILL
export const fetchAverageBillSingle = async (campaignId) => {
  const url = `/api/dashboard/insights_single/average_bill/${campaignId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - SINGLE CAMPAIGN : CARD -> POINTS
export const fetchPointsSingle = async (restaurantOwnerId) => {
  const url = `/api/dashboard/insights_single/points/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - SINGLE CAMPAIGN : CARD -> POINTS
export const fetchCustomerCampaignTimeSingle = async (restaurantOwnerId) => {
  // export const fetchCustomerCampaignTimeSingle = async (restaurantOwnerId
  //   // , showTextSource
  //   ) => {
  const url = `/api/dashboard/insights_single/customer_campaign_time/${restaurantOwnerId}`;
  const response = await fetch(url);
  // const response = await fetch(
  //   url
  //   // +`?showTextSource=${showTextSource}`
  // );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

export const fetchNCbecameSC = async (campaignId) => {
  const url = `/api/dashboard/insights_single/nc_became_sc/${campaignId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// INSIGHTS - CAMPAIGNS : CARD -> CAMPAIGN PREVIEW
export const fetchCampaignsPreview = async (restaurantOwnerId) => {
  const url = `/api/dashboard/insights/campaigns_preview/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};
