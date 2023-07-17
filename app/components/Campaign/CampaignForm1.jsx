import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import InputText from "@/app/components/Input/InputText";
import DateDropdown from "@/app/components/Profile/DateDropdown";
import InputDropdown from "@/app/components/Input/InputDropdown";
import InputCheckbox from "@/app/components/Input/InputCheckbox";

const ViewCampaignForm1 = ({ formData, formErrors, handleInputChange, handleDateChange, handleAllowNewCustomerToggle, handleAllowSuperCustomerToggle }) => {

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

  const TypeChange = (event) => {
    setSelectedType(event.target.value);
    handleInputChange({
      target: {
        name: "type",
        value: event.target.value,
      },
    });
  };

  return (
      <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <InputText
          label="Campaign Name"
          value={formData.name}
          onChange={handleInputChange}
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
          onChange={handleDateChange}
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
          onChecked={handleAllowNewCustomerToggle}
          checked={formData.allowNewCustomer}
          error={formErrors.customerType}
        />
        <InputCheckbox
          label="Super Customers"
          onChecked={handleAllowSuperCustomerToggle}
          checked={formData.allowSuperCustomer}
          error={formErrors.customerType}
        />
      </Grid>
    </Grid>
  );
}

export default ViewCampaignForm1;