"use client";
import { useState, useEffect } from "react";
import Header from "@/app/components/Header/Header";
import InputButton from "../../../../components/Button/InputButton";
import BusinessInfoForm from "@/app/components/OwnerProfile/BusinessInfoForm";
import BusinessHourForm from "@/app/components/OwnerProfile/BusinessHourForm";
import ReferralSystemForm from "@/app/components/OwnerProfile/ReferralSystemForm";
import MenuForm from "@/app/components/OwnerProfile/MenuForm";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const { restaurantOwnerId } = params;
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    category: "",
    manager: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
      city: "",
      province: "",
      country: "",
    },
    phone: "",
    website: "",
    businessHours: {
      monday: { open: "", close: "", Isclosed: false },
      tuesday: { open: "", close: "", Isclosed: false },
      wednesday: { open: "", close: "", Isclosed: false },
      thursday: { open: "", close: "", Isclosed: false },
      friday: { open: "", close: "", Isclosed: false },
      saturday: { open: "", close: "", Isclosed: false },
      sunday: { open: "", close: "", Isclosed: false },
      holiday: { open: "", close: "", Isclosed: false },
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

  console.log("This is the form data", formData);

  const uploadLogo = () => {
    console.log("Logo uploaded!");
  };

  const uploadMenu = (file) => {
    console.log("Menu uploaded!");
    console.log(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: CHANGE THIS
    formData["userId"] = restaurantOwnerId;
    formData["menu"] = "https://www.google.com/";
    formData["logo"] = "https://www.google.com/";

    try {
      const response = await fetch(
        `/api/dashboard/profile/create/${restaurantOwnerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const data = await response.json();
      alert("Restaurant profile created successfully!");

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
          monday: { open: "", close: "", isClosed: false },
          tuesday: { open: "", close: "", isClosed: false },
          wednesday: { open: "", close: "", isClosed: false },
          thursday: { open: "", close: "", isClosed: false },
          friday: { open: "", close: "", isClosed: false },
          saturday: { open: "", close: "", isClosed: false },
          sunday: { open: "", close: "", isClosed: false },
          holiday: { open: "", close: "", isClosed: false },
        },
        menu: "",
        logo: "",
        superCustomerPoints: "",
        qrCode: "",
      });

      router.push(`/dashboard/profile/${restaurantOwnerId}`);
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };

  // const handleSubmit = () => {
  //   console.log("This is the data to be submitted", formData);
  // };

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
          router.push(
            `/dashboard/campaigns/active/${restaurantOwnerId}`
          );
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
