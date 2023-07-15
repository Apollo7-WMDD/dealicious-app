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
import { Typography, Box, Modal, Grid } from "@mui/material";
import InputTextarea from "@/app/components/Input/InputTextarea";
import BulletPoints from "@/app/components/Profile/BulletPoints";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import ImagePreview from "@/app/components/Profile/ImagePreview";
import Notification from "@/app/components/Card/Notification";

// import router
import { useRouter } from "next/navigation";

// import store
import { useStore } from "@/lib/context/user_context/store";

const Page = () => {
  const { restaurantId, restaurantOwnerId } = useStore();
  // const obj = { restaurantId: '649caf44ea1c8363ed630fc4' };
  // const { restaurantId } = obj;
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    restaurantId: restaurantId,
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
    condition: "",
    favorite: false,
    autoDescription: "No auto description",
  });

  console.log("restaurantId", restaurantId);

  // The first save button - submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name) {
      errors.name = "Campaign name is required.";
    }
    if (!formData.description) {
      errors.description = "Campaign advertisement is required.";
    }
    if (!formData.availableCodes) {
      errors.availableCodes = "This input is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    localStorage.setItem("uploadedImageURL", localStorage.getItem("media"));
    localStorage.setItem("formData", JSON.stringify(formData));
    setIsSubmitted(true);
    console.log(formData);
  };

  const handleEdit = () => {
    const uploadedImageURL = localStorage.getItem("uploadedImageURL");
    setFormData((prevFormData) => ({
      ...prevFormData,
      media: uploadedImageURL,
    }));
    setIsSubmitted(false);
  };

  ////////////////////// Final Submit button for campaign preview /////////////////////
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
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Campaign created successfully!");
        setShowNotification(true);
      }
    } catch (error) {
      console.log("Error creating campaign:", responseData.message);
    }
  };
  //////////////////////////////////////////////////////////////////////

  const [showNotification, setShowNotification] = useState(false);
  const onClick = () => {
    router.push(`/dashboard/campaigns/active/${restaurantOwnerId}`);
    setShowNotification(false);
  };
  const closeNotification = () => {
    setShowNotification(false);
  };

  // input and date value save
  const inputValue = (e) => {
    let value =
      e.target.type === "number"
        ? parseInt(e.target.value, 10)
        : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const dateValue = (dates) => {
    const [startDate, endDate] = dates;
    setFormData((prevState) => ({
      ...prevState,
      startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
      endDate: endDate ? endDate.format("YYYY-MM-DD") : null,
    }));
  };

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

  // Expire by number allowed
  const toggleExpiredByNumber = () => {
    setFormData({
      ...formData,
      expiredByNumber: !formData.expiredByNumber,
    });
  };

  //upload menu
  const [imagePreview, setImagePreview] = useState(null);

  const uploadMenu = (file) => {
    console.log("campaign image uploaded");
    console.log(file);

    const fileURL = URL.createObjectURL(file);
    localStorage.setItem("media", fileURL);
    setImagePreview(fileURL);

    const media =
      "https://fitmencook.com/wp-content/uploads/2023/03/mix-and-match-meal-prep11.jpg";
    setFormData({
      ...formData,
      media: media,
    });
  };

  const removeImage = () => {
    setImagePreview(null);
    localStorage.removeItem("media");
    setFormData({
      ...formData,
      media: "",
    });
  };

  const [inspirationVisible, setInspirationVisible] = useState(true);

  return (
    <>
      <div>
        <Modal open={showNotification} onClose={closeNotification}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              p: 4,
              width: "100%",
            }}
          >
            <Notification
              header="Congratulations!"
              text="You successfully created a new campaign. You can examine its real time outcomes."
              buttonText="Go to Campaigns"
              buttonAction={onClick}
            />
          </Box>
        </Modal>
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
              <Grid container spacing={2} sx={{ marginBottom: { md: "40px" } }}>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <InputText
                        label="Campaign Name"
                        value={formData.name}
                        onChange={inputValue}
                        name="name"
                        id="name"
                        placeholder="Name"
                        error={formErrors.name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputDropdown
                        label="Specify the type of campaign"
                        value={selectedType}
                        onChange={TypeChange}
                        name="dropdown"
                        id="dropdown"
                        placeholder="Type"
                        options={campaignTypes}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DateDropdown
                        label="Start and end date"
                        value={[formData.startDate, formData.endDate]}
                        onChange={dateValue}
                        name="dateRange"
                        id="dateRange"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontFamily: "Mukta",
                          fontSize: "19px",
                          fontStyle: "normal",
                          fontWeight: "600",
                        }}
                      >
                        Who can participate this campaign? Super customers don’t
                        gain points when themselves participate in the campaign.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputCheckbox
                        label="New Customers"
                        onChecked={toggleAllowNewCustomer}
                        checked={formData.allowNewCustomer}
                      />
                      <InputCheckbox
                        label="Super Customers"
                        onChecked={toggleAllowSuperCustomer}
                        checked={formData.allowSuperCustomer}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  {imagePreview ? (
                    <ImagePreview
                      src={localStorage.getItem("media")}
                      alt="preview"
                      width="280px"
                      height="320px"
                      onRemove={removeImage}
                    />
                  ) : (
                    <PictureUploadCard
                      phrase="Add a campaign image"
                      onFileSelected={uploadMenu}
                      sx={{ height: { md: "320px" } }}
                    />
                  )}
                </Grid>
              </Grid>

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
                  checked={formData.expiredByNumber}
                />
              </Box>
              <InputText
                label="Number of available codes"
                type="number"
                value={formData.availableCodes}
                onChange={inputValue}
                name="availableCodes"
                id="availableCodes"
                placeholder="Available Codes"
                error={formErrors.availableCodes}
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
                  type="number"
                  value={formData.superCustomerPoints}
                  onChange={inputValue}
                  name="superCustomerPoints"
                  id="superCustomerPoints"
                  placeholder="Customers’ spending($)"
                />
              </Box>
              <InputTextarea
                label="Specify the offers"
                value={formData.offer}
                onChange={inputValue}
                name="offer"
                id="offer"
                placeholder="describe the offers"
              />
              <InputTextarea
                label="Specify the conditions of campaign"
                value={formData.condition}
                onChange={inputValue}
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
                onChange={inputValue}
                name="description"
                id="description"
                placeholder="campaign advertisement"
                error={formErrors.description}
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
