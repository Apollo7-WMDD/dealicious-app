export const updatePinStatus = async (campaignId) => {
  try {
    const response = await fetch(
      `/api/dashboard/insights/toggle_pin/${campaignId}`,
      {
        method: "PATCH",
      }
    );

    if (response.ok) {
      // Update the pin status in the state
      console.log("Successfully updated the pin status");
      // do something meaningful here...
    }
  } catch (error) {
    console.log(error);
  }
};
