"use client";

const handleInputData = async function (e) {
  e.preventDefault();

  // get the restauran data
  const spendingData = {
    phone: 9512357895,
    name: "Gyro Wolf",
    restaurantId: "649cb000ea1c8363ed630fdc",
    campaignId: "649cba58ed10c4f9baedfeda",
    billamount: 999,
    isSuperCustomer: true,
    dateRedeemed: new Date("2023-06-21T00:00:00.000Z"),
    suggestion: {
      foodQuality: false,
      foodQuantity: true,
      service: false,
      place: false,
      other: false,
    },
  };

  // send the form data to the server
  try {
    const res = await fetch("/api/addSpending", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spendingData),
    });
    if (!res.ok) {
      const data = await res.text();
      throw new Error(data);
    } else {
      const data = await res.json();
      console.log("Spending added! ", data);
    }
  } catch (error) {
    console.log(error);
  }
};

const Page = () => {
  return (
    <>
      <h1>Page to Create Fake Data for Testing</h1>
      <button
        onClick={handleInputData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Fake Data (Spending Bills)
      </button>
    </>
  );
};

export default Page;
