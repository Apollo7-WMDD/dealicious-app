"use client";

const handleInputData = async function (e) {
  e.preventDefault();

  // get the restauran data
  const restaurantData = {
    userId: "649be69a34ccc8cbad46d3b1",
    name: "JJ Bean Coffe Roasters",
    manager: "Bruce Banner",
    email: "jjcoffee@hotmail.com",
    address: {
      street: "789 Science World Street",
      postalCode: "V5K 0A1",
      city: "Langley",
      province: "BC",
      country: "Canada",
    },
    phone: 6512432012,
    website: "https://www.jjbean.com",
    businessHours: {
      monday: {
        open: "11:00",
        close: "19:00",
      },
      tuesday: {
        open: "11:00",
        close: "19:00",
      },
      wednesday: {
        open: "11:00",
        close: "19:00",
      },
      thursday: {
        open: "09:00",
        close: "19:00",
      },
      friday: {
        open: "09:00",
        close: "19:00",
      },
      saturday: {
        open: "09:00",
        close: "22:00",
      },
      sunday: {
        open: "08:00",
        close: "16:00",
      },
    },
    superCustomerIdArray: [
      "60db68a679ecb4b7c8a85c27",
      "60db68a679ecb4b7c8a85c29",
    ],
    superCustomerPoints: 20000,
    menu: "https://www.myrestaurant.com/menu",
    logo: "https://randompicturegenerator.com/img/car-generator/gd4bacbd6972d21d93a99ef3e16e8a577bb49f3ad917acf3eefa98ee44b6acb90a055cf53d852f38005d878209ecb23d8_640.jpg",
    qrCode: "https://www.myrestaurant.com/qrcode3",
  };

  // send the form data to the server
  try {
    const res = await fetch("/api/addRestaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurantData),
    });
    if (!res.ok) {
      const data = await res.text();
      throw new Error(data);
    } else {
      const data = await res.json();
      console.log("Restaurant added! ", data);
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
        Create Fake Data (Restaurant)
      </button>
    </>
  );
};

export default Page;
