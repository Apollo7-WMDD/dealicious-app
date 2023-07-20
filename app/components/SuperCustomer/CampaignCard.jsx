"use client";
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import Link from "next/link";
import SCActive from "../../components/Button/SCActive";
import SingleButton from "../Button/SingleButton";
import SCSubmitBtn from "../Button/SCSubmitBtn";
// import { usePathname } from "next/navigation";
// import { useSession } from "next-auth/react";
import SCOfferApplied from "@/app/components/SuperCustomer/SCOfferApplied";

const CampaignCard = ({ props }) => {
  // const { data: session } = useSession();
  // const pathname = usePathname();
  // const restaurantId = pathname.split("/")[4];
  
  const [code, setCode] = useState('');
  const [validate, setValidate] = useState(false);

  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [openThird, setOpenThird] = useState(false);

  const handleSubmit = async function () {
    try {
      console.log('a')
      const res = await fetch("/api/superCustomer/phoneAuth/1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const data = await res.text();
        throw new Error(data);
      } else {
        const data = await res.json();
        console.log("Success! ", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCode = async () => {

    const url = `/api/superCustomer/phoneAuth/${code}`;
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    const data = await response.json();
    // console.log("👌👌👌"+data.validate);
    setValidate(data.validate);

    setOpen(false);
    setOpenSecond(false);
    setOpenThird(true);
  };  

  // const handleOpenConfirm = async () => {
  //   const burnCodeInfo = {
  //     username:
  //       session.user.name ||
  //       `${session.user?.firstname} ${session.user?.lastname}`,
  //     campaignname: props.name,
  //     offer: props.offer,
  //     burned: false,
  //     restaurantId: restaurantId,
  //     campaignId: props._id,
  //   };
  //   try {
  //     const res = await fetch(`/api/burnCode/customers/${restaurantId}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(burnCodeInfo),
  //     });
  //     if (!res.ok) {
  //       const data = await res.text();
  //       throw new Error(data);
  //     }
  //     const data = await res.json();
  //     console.log("Success! ", data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setOpenConfirm(true);
  //   setOpenSecond(false);
  // };

  // 1st Modal
  const handleOpen = () => {
    setOpen(true);
    setOpenSecond(false);
    setOpenThird(false);

  }
  const handleClose = () => {
    setOpen(false);
    setOpenSecond(true);
    setOpenThird(false);
  };

  // 2nd Modal
  const handleOpenSecond = () => {
    setOpen(false);
    setOpenSecond(true);
    setOpenThird(false);
    handleSubmit();
  };
  const handleCloseSecond = () => {
    setOpen(false);
    setOpenSecond(false);
    setOpenThird(true);
  };
  
  // 3th Modal
  const handleCloseThird = () => {
    setOpen(false);
    setOpenSecond(false);
    setOpenThird(false);
  }  
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #ff5938",
    boxShadow: 24,
    p: 4,
  };

// console.log('👍 this is the code'+code);

  return (
    <Box
      sx={{
        maxWidth: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "3%",
        borderRadius: "5%",
      }}
    >
      <Typography variant="h3">{props.name}</Typography>
      <Typography variant="p">{props.offer}</Typography>
      <Link href="#">More information</Link>
      <SCActive text="Active" width="144px" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3">
            {props.name}
          </Typography>
          <Box>
            <img
              src={props.media[0]}
              alt="new"
              width="500px"
              height="500px"
              style={{ borderRadius: "5%" }}
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Offer: {props.offer}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Date: {props.startDate}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.endDate}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Time: {props.startDate}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.endDate}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.description}
            </Typography>
            <SingleButton
              text="Activate"
              width="144px"
              onClick={handleOpenSecond}
            ></SingleButton>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openSecond}
        onClose={handleCloseSecond}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Thanks for visiting us!
          </Typography>
          <Typography variant="p">
            To verify your activation, please input the code you recieved in
            your message and receive the offer.
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 6, width: "6ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField onChange={(e)=>{setCode(e.target.value)}} id="standard-basic" variant="standard" />
          </Box>
          <SCSubmitBtn
            text="Submit"
            width="144px"
            onClick={getCode}
          ></SCSubmitBtn>
        </Box>
      </Modal>
      <Modal
        open={openThird}
        onClose={handleCloseThird}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SCOfferApplied
              props={props}
              status={validate}
            ></SCOfferApplied>
        </Box>
      </Modal>
    </Box>
  );
};

export default CampaignCard;
