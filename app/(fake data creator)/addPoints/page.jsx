"use client";

const handlePoints = async function (e) {
  e.preventDefault();

  // get the restauran data
  const pointsData = {
    restaurantId: "649cb000ea1c8363ed630fdc",
    superCustomerId: "649cff0f9ff81655bdc3cbd0",
    points: 564,
  };

  // send the form data to the server
  try {
    const res = await fetch("/api/addPoints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pointsData),
    });
    if (!res.ok) {
      const data = await res.text();
      throw new Error(data);
    } else {
      const data = await res.json();
      console.log("Points added! ", data);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleRedeemedPoints = async function (e) {
  e.preventDefault();

  // get the restauran data
  const redeemedData = {
    restaurantId: "649cb000ea1c8363ed630fdc",
    superCustomerId: "649cff0f9ff81655bdc3cbd0",
    spendingBillId: "649cc45ddbf4d52ccf553edd",
    points: 10236,
  };

  // send the form data to the server
  try {
    const res = await fetch("/api/addRedeemedPoints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(redeemedData),
    });
    if (!res.ok) {
      const data = await res.text();
      throw new Error(data);
    } else {
      const data = await res.json();
      console.log("Redeemed added! ", data);
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
        onClick={handlePoints}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Fake Data (Points)
      </button>
      <button
        onClick={handleRedeemedPoints}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Fake Data (Redeemed Points)
      </button>
    </>
  );
};

export default Page;
