"use client";

const handleInputData = async function (e) {
  e.preventDefault();

  // get the restauran data
  const superCustomerData = {
    firstname: "Angel",
    lastname: "Wu",
    birthDate: new Date("1994-01-15T00:00:00.000Z"),
    phone: 9887895465,
    restaurantIdArray: ["649cb095ea1c8363ed630fe5", "649caf44ea1c8363ed630fc4"],
    url: [
      "https://www.facebook.com/angelwu/",
      "https://www.instagram.com/angelwu/",
    ],
  };

  // send the form data to the server
  try {
    const res = await fetch("/api/addSuperCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(superCustomerData),
    });
    if (!res.ok) {
      const data = await res.text();
      throw new Error(data);
    } else {
      const data = await res.json();
      console.log("Super Customer added! ", data);
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
        Create Fake Data (Super Customer)
      </button>
    </>
  );
};

export default Page;
