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

// BURN CODE - CARD: TOTAL AMOUNT
const submitSpending = async function (campaignId, spending) {
  try {
    const res = await fetch(`/api/burnCode/${campaignId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ spending }),
    });
    if (!res.ok) {
      const data = await res.text();
      throw new Error(data);
    } else {
      const data = await res.json();
      console.log("Spending posted! ", data);
    }
  } catch (error) {
    console.log(error);
  }
};
