"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/context/user_context/store";
import React, { useState, useEffect } from "react";
// import components
import Form from "@/app/components/Card/Form";
import Header from "@/app/components/Header/Header";
import InputButton from "@/app/components/Button/InputButton";
import ViewNewCampaign from "@/app/components/Campaign/ViewNewCampaign";
import { Box, Modal, Grid } from "@mui/material";
import InputTextareaWithButton from "@/app/components/Input/InputTextareaWithButton";
import Notification from "@/app/components/Card/Notification";
import CampaignImage from "@/app/components/Campaign/CampaignImage";
import CampaignForm1 from "@/app/components/Campaign/CampaignForm1";
import CampaignForm2 from "@/app/components/Campaign/CampaignForm2";
import Loader from "@/app/components/Loader";

import { GET } from "@/app/api/dashboard/campaigns/openAI/route";

import Link from "next/link";
const fetchOpenAIAPI = async (formData) => {
  const url = `/api/dashboard/campaigns/openAI`;

  const response = await fetch(
    url +
      `?name=${formData.name}&offer=${formData.offer}&condition=${formData.condition}&startDate=${formData.startDate}&endDate=${formData.endDate}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

const Page = () => {
  const { restaurantId, restaurantOwnerId } = useStore();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    restaurantId: restaurantId,
    superCustomerIdArray: [],
    name: "",
    status: "active",
    type: [],
    offer: "",
    allowSuperCustomer: false,
    allowNewCustomer: false,
    expiredByNumber: false,
    availableCodes: 1,
    superCustomerPoints: 0,
    state: true,
    startDate: "",
    endDate: "",
    media: "",
    description: "",
    condition: "",
    favorite: false,
    autoDescription: "No auto description",
  });

  // AI GENERATED CAMPAIGN ADVERTISEMENT
  const [aiResult, setAiResult] = useState(null);

  const getDataToAI = async () => {
    console.log(formData);
    const fetchAI = async () => {
      setFormData({
        ...formData,
        description: "loading...",
      });
      try {
        const result = await fetchOpenAIAPI(formData);
        setAiResult(await result);

        setFormData({
          ...formData,
          description: await result,
        });

        console.log(aiResult);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAiResult(`"Error fetching data:", ${error}`);
        setFormData({
          ...formData,
          description: `"Error fetching data:", ${error}`,
        });
      }
    };
    fetchAI();
  };

  // The first save button - submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name) {
      errors.name = "Campaign name is required.";
    }
    if (!formData.startDate || !formData.endDate) {
      errors.date = "Campaign start and end dates are required.";
    }
    if (!formData.description) {
      errors.description = "Campaign advertisement is required.";
    }
    if (!formData.availableCodes) {
      errors.availableCodes = "This input is required.";
    }
    if (!formData.allowNewCustomer && !formData.allowSuperCustomer) {
      errors.customerType = "At least one customer type should be selected.";
    }
    if (!formData.media) {
      errors.media = "Image is required.";
    }

    if (!imagePreview) {
      errors.media = "Campaign image is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    localStorage.setItem("uploadedImageURL", localStorage.getItem("media"));
    localStorage.setItem("formData", JSON.stringify(formData));
    setIsSubmitted(true);
    console.log("formData1: first submit", formData);
  };

  const handleEdit = () => {
    const uploadedImageURL = localStorage.getItem("media");
    setFormData((prevFormData) => ({
      ...prevFormData,
      media: uploadedImageURL,
    }));
    setIsSubmitted(false);
  };

  ////////////////////// Final Submit button for campaign preview /////////////////////
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = async () => {
        const base64String = reader.result;

        try {
          const response = await fetch(`/api/image/upload`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ file: base64String }),
          });

          if (response.ok) {
            console.log("image uploaded successfully!");
            const data = await response.json();

            const newFormData = {
              ...formData,
              media: data.secure_url,
            };
            setFormData(newFormData);

            // then POST the formData
            try {
              const response = await fetch(
                `/api/dashboard/campaigns/new/${restaurantId}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newFormData),
                }
              );

              console.log("THIS IS THE RESPONSE ✅", response);

              if (response.ok) {
                console.log("Campaign created successfully!");
                console.log(newFormData);
                setIsLoading(false);
                setShowNotification(true);
              }
            } catch (error) {
              console.log("Error creating campaign:", error.message);
            }
          }
        } catch (error) {
          console.log("Error uploading image:", error.message);
        }
      };

      reader.onerror = (error) => {
        console.log("Error reading file:", error);
      };
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

  const typeValue = (event) => {
    setSelectedType(event.target.value);
    setFormData({
      ...formData,
      type: event.target.value,
    });
  };

  const dateValue = (dates) => {
    const [formattedStartDate, formattedEndDate] = dates;
    setFormData(prevState => ({
        ...prevState,
        startDate: formattedStartDate,
        endDate: formattedEndDate
    }));
    console.log('Start Date:', formattedStartDate);
    console.log('End Date:', formattedEndDate);
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

  //upload image
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadMenu = async (fileList) => {
    if (fileList.length === 0) {
      console.error("No files found in fileList.");
      return;
    }

    const file = fileList[0];
    const fileURL = URL.createObjectURL(file);
    await localStorage.setItem("media", fileURL);
    setImagePreview(fileURL);
    setSelectedFile(file);
    setFormData({
      ...formData,
      media: fileURL,
    });
  };

  const removeImage = async () => {
    setImagePreview(null);
    await localStorage.removeItem("media");
    setFormData({
      ...formData,
      media: "",
    });
  };

  const [inspirationVisible, setInspirationVisible] = useState(true);

  return (
    <>
      <div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              width: "100vw",
            }}
          >
            <Loader />
          </div>
        ) : (
          <>
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
                imagePreview={imagePreview}
              />
            ) : (
              <>
                <Header>Create a New Campaign</Header>
                <Form>
                  <Grid
                    container
                    spacing={2}
                    sx={{ marginBottom: { md: "10px" } }}
                  >
                    <Grid item xs={12} md={8}>
                      <CampaignForm1
                        formData={formData}
                        formErrors={formErrors}
                        handleInputChange={inputValue}
                        handleDateChange={dateValue}
                        handletypeValue={typeValue}
                        handleAllowNewCustomerToggle={toggleAllowNewCustomer}
                        handleAllowSuperCustomerToggle={
                          toggleAllowSuperCustomer
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <CampaignImage
                        imagePreview={imagePreview}
                        handleUploadMenu={uploadMenu}
                        handleRemoveImage={removeImage}
                        error={formErrors.media}
                      />
                    </Grid>
                  </Grid>

                  <CampaignForm2
                    formData={formData}
                    formErrors={formErrors}
                    toggleExpiredByNumber={toggleExpiredByNumber}
                    inputValue={inputValue}
                    inspirationVisible={inspirationVisible}
                    setInspirationVisible={setInspirationVisible}
                  />
                </Form>

                <Form>
                  <InputTextareaWithButton
                    label={`Write an attractive campaign advertisement`}
                    value={formData.description}
                    onChange={inputValue}
                    onClick={getDataToAI}
                    name="description"
                    id="description"
                    placeholder="campaign advertisement"
                    buttonText={
                      aiResult == null
                        ? "...or simply click here to have a compelling ad ready!"
                        : "generate again"
                    }
                    error={formErrors.description}
                  />
                </Form>

                <InputButton
                  onFirstButtonClick={(e) => {
                    e.preventDefault();
                    router.push(
                      `/dashboard/campaigns/active/${restaurantOwnerId}`
                    );
                  }}
                  onSecondButtonClick={handleSubmit}
                  firstButtonText="Cancel"
                  secondButtonText="Create"
                  type="submit"
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Page;
