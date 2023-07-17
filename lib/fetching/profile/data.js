// Fetch Restaurant Info
export const fetchBusinessInfo = async (restaurantOwnerId) => {
  const url = `/api/dashboard/profile/business_info/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// Fetch Business Hours
export const fetchBusinessHours = async (restaurantOwnerId) => {
  const url = `/api/dashboard/profile/business_hours/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// Fetch Referral System
export const fetchReferralSystem = async (restaurantOwnerId) => {
  const url = `/api/dashboard/profile/referral_system/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

// Fetch Images & Menus
export const fetchImagesMenus = async (restaurantOwnerId) => {
  const url = `/api/dashboard/profile/images_menus/${restaurantOwnerId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};


//Fetch restaurant card info
export const fetchRestaurantCard = async (restaurantId) => {
  const url = `/api/dashboard/profile/restaurantCard/${restaurantId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};