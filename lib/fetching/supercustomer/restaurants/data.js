// PROFILE - POPULATE PAGE WITH DATA
export const fetchRestaurants = async (superCustomerId) => {
  const response = await fetch(
    `/api/superCustomer/restaurants/${superCustomerId}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
