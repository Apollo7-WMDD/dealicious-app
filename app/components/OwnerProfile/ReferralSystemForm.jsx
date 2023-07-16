import React from 'react';
import { useState } from "react";
import InputText from "../Input/InputText";
import { Box, Typography } from "@mui/material";
import SubHeader from "../Header/SubHeader";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Form from '../Card/Form';

const ReferralSystemForm = ({ formData, handleInputChange }) => {
  const [referralSystemVisible, setReferralSystemVisible] = useState(true);

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
        <SubHeader>Referral System</SubHeader>
        <KeyboardArrowDown
          onClick={() => setReferralSystemVisible(!referralSystemVisible)}
        />
      </Box>
      {referralSystemVisible && (
        <>
          <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "25px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "8px",
                    width: { xs: "326px", md: "400px" },
                    marginTop: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#181818",
                      fontSize: "19px",
                      fontFamily: "Mukta",
                      fontStyle: "normal",
                      fontWeight: 600,
                    }}
                  >
                    How many points the Super Customers can earn for each
                    hundred dollar they spend?
                  </Typography>
                  <InputText
                    type='number'
                    name="points"
                    id="points"
                    value={formData.points}
                    onChange={handleInputChange}
                    placeholder="Points"
                    style={{ whiteSpace: "nowrap" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: "5px",
                    width: { xs: "326px", md: "400px" },
                  }}
                >
                  <ErrorOutlineIcon />
                  <Typography>
                    You set up this number only when you’re creating your
                    profile. The Super Customers can redeem their points to get
                    $1.00 discount per point.
                  </Typography>
                </Box>
              </Box>
        </>
      )}
    </Form>
  );
};

export default ReferralSystemForm;
