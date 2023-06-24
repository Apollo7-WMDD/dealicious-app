"use client";

const FormCampaigns = () => {
  //submit function
  const handleSubmit = async function (e) {
    e.preventDefault();
    const formData = {
      restaurantId: e.target.restaurantId.value,
      name: e.target.name.value,
      availableCodes: e.target.availableCodes.value,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
    };
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.text();
        throw new Error(data);
      } else {
        const data = await res.json();
        console.log("Success! ", data);
      }
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center flex-col gap-2">
      <label htmlFor="name">RestaurantID</label>
      <input
        className="border-solid border-green-700 border-2 rounded-md"
        type="text"
        name="restaurantId"
        id="restaurantId"
      />
      <label htmlFor="name">Name</label>
      <input
        className="border-solid border-green-700 border-2 rounded-md"
        type="text"
        name="name"
        id="name"
      />

      <label htmlFor="availableCodes">Available Codes</label>
      <input
        className="border-solid border-green-700 border-2 rounded-md"
        type="number"
        name="availableCodes"
        id="availableCodes"
      />

      <label htmlFor="startDate">Start Date</label>
      <input
        className="border-solid border-green-700 border-2 rounded-md"
        type="date"
        name="startDate"
        id="startDate"
      />

      <label htmlFor="endDate">End Date</label>
      <input
        className="border-solid border-green-700 border-2 rounded-md"
        type="date"
        name="endDate"
        id="endDate"
      />
      <button
        type="submit"
        className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default FormCampaigns;
