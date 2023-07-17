import React from "react";
import { useState, useEffect } from "react";
import TimeDropdown from "../Profile/TimeDropdown";
import InputCheckbox from "../Input/InputCheckbox";
import Form from "../Card/Form";
import SubHeader from "../Header/SubHeader";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

const BusinessHourForm = ({
  weekdays,
  formData,
  setFormData,
  DayClosedChange,
  isEdit,
}) => {
  const [businessHoursVisible, setBusinessHoursVisible] = useState(true);

  return (
    <Form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <SubHeader>Business Hours</SubHeader>
        <KeyboardArrowDown
          onClick={() => setBusinessHoursVisible(!businessHoursVisible)}
        />
      </Box>
      {businessHoursVisible &&
        weekdays.map((day, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: "0", md: "30px" },
              marginBottom: "20px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                width: { xs: "auto", md: "200px" },
                gap: "5px",
              }}
            >
              <Typography
                sx={{
                  color: "#181818",
                  fontSize: "16px",
                  fontFamily: "Mukta",
                  fontStyle: "normal",
                  fontWeight: 600,
                  alignSelf: "center",
                  length: "50px",
                  marginRight: "10px",
                }}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Typography>
              <InputCheckbox
                label="Closed"
                onChecked={DayClosedChange(day)}
                labelPlacement="start"
                checked={formData.businessHours[day]?.closed}
              />
            </Box>
            <TimeDropdown
              day={day}
              isDisabled={formData.businessHours[day]?.closed}
              initialData={formData.businessHours[day]}
              setBusinessHours={(newHours) => {
                setFormData((prevState) => ({
                  ...prevState,
                  businessHours: {
                    ...prevState.businessHours,
                    [day]: {
                      ...newHours,
                      closed: formData.businessHours[day].closed,
                    },
                  },
                }));
              }}
            />
          </Box>
        ))}
    </Form>
  );
};

export default BusinessHourForm;
