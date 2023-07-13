"use client";

import React, { useState, useEffect } from "react";

// import components
import Form from "@/app/components/Card/Form";
import Header from "@/app/components/Header/Header";
import InputText from "@/app/components/Input/InputText";
import DateDropdown from "@/app/components/Profile/DateDropdown";
import InputDropdown from "@/app/components/Input/InputDropdown";
import InputCheckbox from "@/app/components/Input/InputCheckbox";
import InputButton from "@/app/components/Button/InputButton";
import PictureUploadCard from "@/app/components/Button/PictureUploadCard";
import ViewNewCampaign from "@/app/components/Dashboard/ViewNewCampaign";
import { Typography, Box } from "@mui/material";
import InputTextarea from "@/app/components/Input/InputTextarea";
import BulletPoints from "@/app/components/Profile/BulletPoints";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

// import router
import { useRouter } from "next/navigation";

// import store
import { useStore } from "@/lib/context/user_context/store";

const Page = () => {
  const router = useRouter();
  const { restaurantId } = useStore();
  const [campaigns, setCampaigns] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    restaurantId: "",
    superCustomerIdArray: [],
    name: "",
    status: "active",
    type: [],
    offer: "No offer",
    allowSuperCustomer: false,
    allowNewCustomer: false,
    expiredByNumber: false,
    availableCodes: 1,
    superCustomerPoints: 0,
    state: true,
    startDate: "",
    endDate: "",
    media: [],
    description: "",
    favorite: false,
    autoDescription: "No auto description",
  });

  console.log("restaurantId", restaurantId);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (dateRange) => {
    setFormData({
      ...formData,
      startDate: dateRange[0],
      endDate: dateRange[1],
    });
  };

  const handleSubmit = (e) => {
    localStorage.setItem("formData", JSON.stringify(formData));
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  const fakeData = {
    restaurantId: restaurantId,
    superCustomerIdArray: [],
    name: "Tony's Pizza",
    status: "active",
    type: "Discount on pizzas",
    offer: "25% on pizza",
    allowSuperCustomer: true,
    allowNewCustomer: true,
    expiredByNumber: false,
    availableCodes: 156,
    superCustomerPoints: 100,
    state: true,
    startDate: "2023-10-01",
    endDate: "2023-10-31",
    media: "https://picsum.photos/id/27/200/300",
    description: "This is a description of the campaign",
    favorite: false,
    autoDescription: "No auto description",
  };

  // ///////////////////////////////////////////////////////////////////
  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/dashboard/campaigns/new/${restaurantId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fakeData),
        }
      );

      if (response.ok) {
        console.log("Campaign created successfully!");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };
  //////////////////////////////////////////////////////////////////////

  // useEffect(() => {}, []);

  // SELECT campaign type
  const [selectedType, setSelectedType] = useState("");

  const campaignTypes = [
    { value: "Happy hour", label: "Happy hour" },
    { value: "Lunch only", label: "Lunch only" },
    { value: "Buy one, get one", label: "Buy one, get one" },
    { value: "Group dining", label: "Group dining" },
    { value: "Birthday Party", label: "Birthday Party" },
    { value: "Weekdays only", label: "Weekdays only" },
    { value: "Special events", label: "Special events" },
    { value: "Seasonal Menu", label: "Seasonal Menu" },
    { value: "Demographic targeted", label: "Demographic targeted" },
    { value: "Other", label: "Other" },
  ];

  //SELECT campaign type
  const TypeChange = (event) => {
    setSelectedType(event.target.value);
    setFormData({
      ...formData,
      type: event.target.value,
    });
  };

  //SC AND NC allowed
  const toggleAllowNewCustomer = () => {
    setFormData({
      ...formData,
      allowNewCustomer: !formData.allowNewCustomer,
    });
  };

  const toggleAllowSuperCustomer = () => {
    setFormData({
      ...formData,
      allowSuperCustomer: !formData.allowSuperCustomer,
    });
  };

  //Upload campaign image
  const uploadMenu = (file) => {
    console.log("campaign image uploaded");
    console.log(file);
    const media =
      "https://animaljustice.ca/wp-content/uploads/2021/08/Press-Release-McDonalds-Sustainable-Ad-Animal-Justice.jpeg";
    localStorage.setItem("media", media);
    setFormData({
      ...formData,
      media: media,
    });
  };

  const toggleExpiredByNumber = () => {
    setFormData({
      ...formData,
      expiredByNumber: !formData.expiredByNumber,
    });
  };

  const [inspirationVisible, setInspirationVisible] = useState(true);

  return (
    <>
      <div>
        {isSubmitted ? (
          <ViewNewCampaign
            formData={formData}
            handleFinalSubmit={handleFinalSubmit}
            handleEditProp={handleEdit}
            setFormData={setFormData}
          />
        ) : (
          <>
            <Header>Create a New Campaign</Header>
            <Form>
              <InputText
                label="Campaign Name"
                value={formData.name}
                onChange={handleInputChange}
                name="name"
                id="name"
                placeholder="Name"
              />
              <InputDropdown
                label="Specify the type of campaign"
                value={selectedType}
                onChange={TypeChange}
                name="dropdown"
                id="dropdown"
                placeholder="Type"
                options={campaignTypes}
              />
              <DateDropdown
                label="Start and end date"
                value={[formData.startDate, formData.endDate]}
                onChange={handleDateChange}
                name="dateRange"
                id="dateRange"
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontFamily: "Mukta",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: "600",
                  }}
                >
                  Who can participate this campaign? Super customers don’t gain
                  points when themselves participate in the campaign.
                </Typography>
                <InputCheckbox
                  label="New Customers"
                  onChecked={toggleAllowNewCustomer}
                />
                <InputCheckbox
                  label="Super Customers"
                  onChecked={toggleAllowSuperCustomer}
                />
              </Box>

              <PictureUploadCard
                phrase="Add a campaign image"
                onFileSelected={uploadMenu}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <InputCheckbox
                  label="This campaign expire after a specific number of customers use it"
                  onChecked={toggleExpiredByNumber}
                />
              </Box>
              <InputText
                label="Number of available codes"
                type="numbers"
                value={formData.availableCodes}
                onChange={handleInputChange}
                name="availableCodes"
                id="availableCodes"
                placeholder="Available Codes"
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontFamily: "Mukta",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: "600",
                  }}
                >
                  How much spending by referred customers converts to 1 earning
                  point for your super customer to receive $1.00 discount?
                </Typography>
                <InputText
                  label="$ = 1 point for super customer"
                  value={formData.superCustomerPoints}
                  onChange={handleInputChange}
                  name="superCustomerPoints"
                  id="superCustomerPoints"
                  placeholder="Customers’ spending($)"
                />
              </Box>
              <InputTextarea
                label="Specify the offers"
                value={formData.offer}
                onChange={handleInputChange}
                name="offer"
                id="offer"
                placeholder="describe the offers"
              />
              <InputTextarea
                label="Specify the conditions of campaign"
                value={formData.condition}
                onChange={handleInputChange}
                name="condition"
                id="condition"
                placeholder="Discount on all the menu items except alcoholic drinks "
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#FF5938",
                    fontFamily: "Mukta",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: "600",
                  }}
                >
                  Get inspiration for campaign offer and condition
                </Typography>
                <KeyboardArrowDown
                  sx={{ color: "#FF5938" }}
                  onClick={() => setInspirationVisible(!inspirationVisible)}
                />
              </Box>
              {inspirationVisible && (
                <BulletPoints
                  items={[
                    '"Buy One, Get One Free": Purchase any pizza from our menu and get a second pizza of equal or lesser value for free, valid for dine-in only.',
                    '"Weekend Brunch Bonanza": Indulge in our delectable brunch menu items every Saturday and Sunday, with 10% off for reservations made before 11 am.',
                    '"Happy Hour Delights": Join us for happy hour between 4 pm and 6 pm, and enjoy 50% off select appetizers and discounted drinks.',
                    '"Sweet Treats for Students": Present your valid student ID and get a 15% discount on all desserts and beverages, perfect for satisfying your sweet tooth during study breaks.',
                    '"Family Feast": Feed the whole family with our Family Feast package, including two pizzas, garlic bread, and a family-sized salad for only $35.',
                  ]}
                />
              )}
            </Form>


          <Form>
              <InputTextarea
                label="Write an attractive campaign advertisement or simply click here to have a compelling ad ready!"
                value={formData.description}
                onChange={handleInputChange}
                name="description"
                id="description"
                placeholder="campaign advertisement"
              />
          </Form>

            <InputButton
              onFirstButtonClick={(e) => {
                e.preventDefault();
                console.log("Cancel");
              }}
              onSecondButtonClick={handleSubmit}
              firstButtonText="Cancel"
              secondButtonText="Create"
              type="submit"
            />
          </>
        )}
      </div>
    </>
  );
};
export default Page;
