import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import InputCheckbox from "@/app/components/Input/InputCheckbox";
import InputText from "@/app/components/Input/InputText";
import InputTextarea from "@/app/components/Input/InputTextarea";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import BulletPoints from "../Profile/BulletPoints";

const CampaignForm2 = ({
  formData,
  formErrors,
  toggleExpiredByNumber,
  inputValue,
  inspirationVisible,
  setInspirationVisible,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "36px",
              width: "100%",
            }}
          >
            <InputCheckbox
              label="This campaign expires after a specific number of customers use it"
              onChecked={toggleExpiredByNumber}
              checked={formData.expiredByNumber}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <InputText
            label="Number of available codes"
            type="number"
            value={formData.availableCodes}
            onChange={inputValue}
            name="availableCodes"
            id="availableCodes"
            placeholder="Available Codes"
            error={formErrors.availableCodes}
            disabled={!formData.expiredByNumber}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontFamily: "Mukta",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "600",
              }}
            >
              How much spending by referred customers converts to 1 earning
              point for your super customer to receive $1.00 discount?
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <InputText
            label="$ = 1 point for super customer"
            type="number"
            value={formData.superCustomerPoints}
            onChange={inputValue}
            name="superCustomerPoints"
            id="superCustomerPoints"
            placeholder="Customers’ spending($)"
            marginTop="0"
          />
        </Grid>
      </Grid>
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
          justifyContent: "start",
          alignContent: "center",
          flexDirection: "row",
          width: "100%",
          gap:"10px",
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
    </>
  );
};

export default CampaignForm2;
