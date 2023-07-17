// fetch users codes
export const fetchUserCodes = async (restaurantId) => {
  const url = `/api/dashboard/burnCode/customers/${restaurantId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  console.log(response);
  const data = await response.json();
  return data;
};
