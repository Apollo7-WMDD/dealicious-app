// "use client";
import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import {
  Button,
  Modal,
  CardContent,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import SCActive from "../../components/Button/SCActive";
import SingleButton from "../Button/SingleButton";
import SCSubmitBtn from "../Button/SCSubmitBtn";
import { sendSMS } from "../../../lib/sms/sms";
import { usePathname } from "next/navigation";


// require('dotenv').config();
// import twilio from 'twilio';
// import { URL } from 'url';

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// const test = () => {
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// // const client = require('twilio')(accountSid, authToken);
// const client = require('twilio')('ACbfab2bb79da6d6e59471055f10216ea9', '838a8c275189d7f62f5b9faccdf75111');

// client.messages
//   .create({
//     body: 'DEALicious Test',
//     from: '+15416157617',
//     to: '+14372105501'
//   })
//   .then(message => console.log(message.sid));

const CampaignCard = ({ props }) => {
  // const { restaurantId } = useStore();
  console.log(props._id)
  const pathname = usePathname();
  console.log(pathname.split("/")[4]);
  const restaurantId = pathname.split("/")[4];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSecond, setOpenSecond] = React.useState(false);

  // * no SMS verification version
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const handleOpenConfirm = async () => {
    const campaignRedeemed = {
      username: "NEW CUSTOMER",
      campaignname: props.name,
      offer: props.offer,
      burned:false,
      restaurantId: restaurantId,
      campaignId: props._id,
    };
    try {
      const res = await fetch(`/api/burnCode/customers/${restaurantId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignRedeemed),
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
    setOpenConfirm(true);
    setOpenSecond(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setOpenSecond(false);
  };

  // const handleOpenSecond = () => setOpenSecond(true);
  const handleOpenSecond = () => {
    setOpen(false);
    setOpenSecond(true);

    // const handleSendSMS = async () => {
    //   try {
    //     const success = await sendSMS();
    //     if (success) {
    //       console.log('SMS sent successfully!');
    //     } else {
    //       console.log('Failed to send SMS.');
    //     }
    //   } catch (error) {
    //     console.error('Error sending SMS:', error);
    //   }
    // };

    // handleSendSMS();

    //test();
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const client = require('twilio')(accountSid, authToken);

    // client.messages
    //   .create({
    //     body: 'DEALicious Test',
    //     from: '+15416157617',
    //     to: '+14372105501'
    //   })
    //   .then(message => console.log(message.sid));

    // const client = require('twilio')(accountSid, authToken);
    // const client = require('twilio')('ACbfab2bb79da6d6e59471055f10216ea9', '838a8c275189d7f62f5b9faccdf75111');
    // const client = twilio('ACbfab2bb79da6d6e59471055f10216ea9', '838a8c275189d7f62f5b9faccdf75111');
    // const client = require('twilio')('ACbfab2bb79da6d6e59471055f10216ea9', '838a8c275189d7f62f5b9faccdf75111', {
    //   httpClientOptions: {
    //     agent: new URL(process.env.http_proxy || 'http://0.0.0.0'),
    //   },
    // });

    // await client.messages
    //   .create({
    //     body: 'DEALicious Test SMS',
    //     to: '+14372105501', // Text your number
    //     from: '+15416157617', // From a valid Twilio number
    //   })
    //   .then((message) => console.log(message.sid));
  };

  const handleCloseSecond = () => setOpenSecond(false);
  // const handleCloseSecond = () => {
  //   setOpenSecond(false);
  //   test();
  // }

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

  return (
    <Paper elevation={10}>
      <Box
        sx={{
          // boxShadow: '5px 5px 5px 5px rgba(255, 255, 0, 0.5)',
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
              {/* <SingleButton text="Activate" width="144px" onClick={test}></SingleButton> */}
              {/* <SingleButton text="Activate" width="144px" onClick={() =>{
                handleClose;
                handleOpenSecond;
              }}></SingleButton> */}
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
            <br />
            <br />
            <Typography variant="p" sx={{ color: "red" }}>
              NO SMS VERIFICATION AT TESTING PHASE. JUST CLICK SUBMIT.
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "1ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id="standard-basic" variant="standard" />
              <TextField id="standard-basic" variant="standard" />
              <TextField id="standard-basic" variant="standard" />
              <TextField id="standard-basic" variant="standard" />
            </Box>
            <SCSubmitBtn
              text="Submit"
              width="144px"
              onClick={handleOpenConfirm}
            ></SCSubmitBtn>
          </Box>
        </Modal>
        <Modal
          open={openConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Waiting for confirmation...
            </Typography>
            <br />
            <Typography variant="p">
              You request to activate
              <Typography variant="h5" color="primary">
                {props.name}
              </Typography>
              campaign has been sent to the restaurant owner. Please show this
              screen to restaurant staff.
            </Typography>
            <br />
            <Typography variant="p">
              Customer phone number : "XXX-XXX-XXXX"
            </Typography>
            <br />
            <br />
            <br />
            <Button
              variant="text"
              onClick={handleCloseConfirm}
              style={{ fontSize: "14px", fontWeight: "lighter", padding: "0" }}
            >
              Tap here to close
            </Button>
            {/* <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "1ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id="standard-basic" variant="standard" />
              <TextField id="standard-basic" variant="standard" />
              <TextField id="standard-basic" variant="standard" />
              <TextField id="standard-basic" variant="standard" />
            </Box> */}
            {/* <SCSubmitBtn
              text="Submit"
              width="144px"
              onClick={noSMSValidation}
            ></SCSubmitBtn> */}
          </Box>
        </Modal>
      </Box>
    </Paper>
  );
};

export default CampaignCard;
