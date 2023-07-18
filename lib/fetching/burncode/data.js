// fetch users codes
export const fetchUserCodes = async (restaurantId) => {
  const url = `/api/burnCode/customers/${restaurantId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};
