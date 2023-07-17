"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/context/user_context/store";
import Header from "@/app/components/Header/Header";
import InputButton from "../../../../components/Button/InputButton";
import BusinessInfoForm from "@/app/components/OwnerProfile/BusinessInfoForm";
import BusinessHourForm from "@/app/components/OwnerProfile/BusinessHourForm";
import MenuForm from "@/app/components/OwnerProfile/MenuForm";

const Page = () => {
  const { restaurantId, restaurantOwnerId } = useStore();
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    manager: "",
    email: "",
    phone: "",
    website: "",
    category: "",
    address: {
      street: "",
      postalCode: "",
      city: "",
      province: "",
      country: "",
    },
    businessHours: {
      monday: { open: "", close: "", closed: false },
      tuesday: { open: "", close: "", closed: false },
      wednesday: { open: "", close: "", closed: false },
      thursday: { open: "", close: "", closed: false },
      friday: { open: "", close: "", closed: false },
      saturday: { open: "", close: "", closed: false },
      sunday: { open: "", close: "", closed: false },
      holiday: { open: "", close: "", closed: false },
    },
    menu: "",
    logo: "",
    qrCode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch(`/api/dashboard/profile/data/${restaurantOwnerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Server error: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setRestaurants((prevRestaurants) =>
          prevRestaurants.map((restaurant) =>
            restaurant._id === restaurantId ? data : restaurant
          )
        );
        router.push(`/dashboard/campaigns/active/${restaurantOwnerId}`);
      })
      .catch((error) => {
        console.error("Error updating restaurant:", error);
      });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.name]: e.target.value },
    });
  };

  const weekdays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
    "holiday",
  ];

  const fakeData = {
    _id: "649caf44ea1c8363ed630fc4",
    userId: "64a735418ff9fb2c44c58a75",
    name: "Tim Hortons",
    manager: "Tony Stark",
    email: "timmies@hotmail.com",
    category: "cafe",
    address: {
      street: "123 Main Street",
      postalCode: "V3L 3L3",
      city: "Vancouver",
      province: "BC",
      country: "Canada",
    },
    phone: "1234567890",
    website: "https://www.myrestaurant.com",
    businessHours: {
      monday: {
        open: "8:00 AM",
        close: "8:00 PM",
        closed: false,
      },
      tuesday: {
        open: "8:00 AM",
        close: "8:00 PM",
        closed: false,
      },
      wednesday: {
        open: "8:00 AM",
        close: "8:00 PM",
        closed: false,
      },
      thursday: {
        open: "8:00 AM",
        close: "8:00 PM",
        closed: false,
      },
      friday: {
        open: "8:00 AM",
        close: "8:00 PM",
        closed: false,
      },
      saturday: {
        open: "8:00 AM",
        close: "8:00 PM",
        closed: false,
      },
      sunday: {
        open: "8:00 AM",
        close: "8:00 PM",
        closed: false,
      },
      holiday: {
        open: "0:00 AM",
        close: "0:00 PM",
        closed: true,
      },
    },
    superCustomerIdArray: [
      "649cfdb69ff81655bdc3cbc5",
      "64a9918f8f2748a9b781ad59",
      "649be44234ccc8cbad46d38c",
      "64a735418ff9fb2c44c58a75",
    ],
    menu: "https://img.freepik.com/free-photo/happy-waiter-serving-food-group-cheerful-friends-pub_637285-12525.jpg?w=2000&t=st=1689475566~exp=1689476166~hmac=c4fdbc153dd49daaa33bb4128530d9c35bfe65bb50e5333d891549766e194561",
    logo: "https://randompicturegenerator.com/img/car-generator/g55938cab3ca5e1d6a85a240c8d3a1c3a732aca43a41b7b3cce22c49d27d96615d3fd1d16170172bff6920861c0e851cb_640.jpg",
    qrCode: "https://www.myrestaurant.com/qrcode",
  };

  const DayClosedChange = (day) => (newState) => {
    setFormData((prevState) => ({
      ...prevState,
      businessHours: {
        ...prevState.businessHours,
        [day]: {
          ...prevState.businessHours[day],
          closed: newState,
        },
      },
    }));
  };

  const uploadLogo = () => {
    console.log("Logo uploaded!");
  };

  const uploadMenu = (file) => {
    console.log("Menu uploaded!");
    console.log(file);
  };

  return (
    <div>
      <Header>Edit Profile</Header>
      <BusinessInfoForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddressChange={handleAddressChange}
        uploadLogo={uploadLogo}
        isEdit={true}
      />
      <BusinessHourForm
        weekdays={weekdays}
        DayClosedChange={DayClosedChange}
        formData={formData}
        setFormData={setFormData}
        isEdit={true}
      />

      <MenuForm uploadMenu={uploadMenu} initialImages={formData.menu} />

      <InputButton
        onFirstButtonClick={(e) => {
          e.preventDefault();
          console.log("Cancel");
        }}
        onSecondButtonClick={handleSubmit}
        firstButtonText="Cancel"
        secondButtonText="Save Profile"
        type="submit"
      />
    </div>
  );
};

export default Page;
