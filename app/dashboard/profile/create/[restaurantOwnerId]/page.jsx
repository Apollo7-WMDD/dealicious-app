"use client";
import { useState, useEffect } from "react";
import Header from "@/app/components/Header/Header";
import InputButton from "../../../../components/Button/InputButton";
import BusinessInfoForm from "@/app/components/OwnerProfile/BusinessInfoForm";
import BusinessHourForm from "@/app/components/OwnerProfile/BusinessHourForm";
import ReferralSystemForm from "@/app/components/OwnerProfile/ReferralSystemForm";
import MenuForm from "@/app/components/OwnerProfile/MenuForm";

const Page = () => {
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
    superCustomerPoints: "",
    qrCode: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/restaurant", {
      method: "POST",
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
        setRestaurants((prevRestaurants) => [...prevRestaurants, data]);
        setFormData({
          userId: "",
          name: "",
          manager: "",
          email: "",
          phone: "",
          website: "",
          address: {
            street: "",
            postalCode: "",
            city: "",
            province: "",
            country: "",
          },
          businessHours: {
            monday: { open: "", close: "" },
            tuesday: { open: "", close: "" },
            wednesday: { open: "", close: "" },
            thursday: { open: "", close: "" },
            friday: { open: "", close: "" },
            saturday: { open: "", close: "" },
            sunday: { open: "", close: "" },
            holiday: { open: "", close: "" },
          },
          menu: "",
          logo: "",
          superCustomerPoints: "",
          qrCode: "",
        });
        router.push(`/dashboard/profile/${restaurantOwnerId}`);
      })
      .catch((error) => console.error("Error creating restaurant:", error));
  };

  return (
    <div>
      <Header>Create Profile</Header>
        <BusinessInfoForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleAddressChange={handleAddressChange}
          uploadLogo={uploadLogo}
          isEdit={false}
        />
        <BusinessHourForm 
          weekdays={weekdays} 
          DayClosedChange={DayClosedChange} 
          formData={formData} 
          setFormData={setFormData} 
        />

        <MenuForm uploadMenu={uploadMenu} />

        <ReferralSystemForm
          formData={formData}
          handleInputChange={handleInputChange}
        />

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

