"use client";

const handleInputData = async function (e) {
  e.preventDefault();

  // get the restauran data
  const campaignData = {
    restaurantId: "649cb000ea1c8363ed630fdc",
    superCustomerIdArray: [
      "60db68a679ecb4b7c8a85c25",
      "60db68a679ecb4b7c8a85c24",
    ],
    name: "Coffee bags",
    status: "active",
    type: ["discount", "coffee"],
    offer: "Get your coffee bags with 50% discount!",
    allowSuperCustomer: true,
    allowNewCustomer: true,
    expiredByNumber: true,
    availableCodes: 20,
    superCustomerPoints: 10,
    state: true,
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-08-05"),
    media: [
      "https://randompicturegenerator.com/img/car-generator/g4d1c879a6da5a78caef9f1c01a14286fe8178ed6d469708ffae2c064be5942e977145da83019076285ae398124796792_640.jpg",
      "https://randompicturegenerator.com/img/car-generator/g93e2464d449a46aa0c9ec6dc85a9822cdc4a7c2c2728e7c25946856cf5e769641455240403d69de5dd837792c37c9e24_640.jpg",
    ],
    description: "Coffee bags for you!",
    favorite: false,
    autoDescription: "No auto description",
  };

  // send the form data to the server
  try {
    const res = await fetch("/api/addCampaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaignData),
    });
    if (!res.ok) {
      const data = await res.text();
      throw new Error(data);
    } else {
      const data = await res.json();
      console.log("Campaign added! ", data);
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
        Create Fake Data (Campaign)
      </button>
    </>
  );
};

export default Page;
