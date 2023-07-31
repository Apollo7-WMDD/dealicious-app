"use client";
import { useState } from "react";
import { Modal, Box, Typography, TextField, useTheme } from "@mui/material";
import Link from "next/link";
import SCActive from "../../components/Button/SCActive";
import SingleButton from "../Button/SingleButton";
import SCSubmitBtn from "../Button/SCSubmitBtn";
import SCOfferApplied from "@/app/components/SuperCustomer/SCOfferApplied";
import BurnBtn from "../Button/BurnBtn";

const BurnCodeCard = ({ props, setOpenModal, setCampaignCode }) => {
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  return (
    <>
      <Box
        sx={{
          p: "1rem",
          borderRadius: "10px",
          boxShadow: `0px 4px 20px 0px ${shadowColor}`,
          maxWidth: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography variant="h2">{props?.username}</Typography>
        <Typography sx={{ fontWeight: "bold" }} variant="h3">
          {props?.campaignname}
        </Typography>
        <Typography variant="p" sx={{ fontSize: "1.25rem" }}>
          Details: {props?.offer}
        </Typography>
        <Typography variant="p" sx={{ fontSize: "1.25rem" }}>
          Please check the code that customer has received and if it matches
          with this code, click the button
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "end",
            marginLeft: "auto",
            gap: "1rem",
            justifyContent: "end",
          }}
        >
          <BurnBtn
            text="Burn the Code"
            width="auto"
            onClick={() => {
              setOpenModal(true);
              setCampaignCode({
                id: props._id,
                restaurantId: props.restaurantId,
                campaignId: props.campaignId,
                username: props.username,
              });
            }}
          ></BurnBtn>
        </Box>
      </Box>
    </>
  );
};

export default BurnCodeCard;
