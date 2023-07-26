"use client";
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import SCActive from "../../components/Button/SCActive";
import SingleButton from "../Button/SingleButton";
import SCSubmitBtn from "../Button/SCSubmitBtn";
import SCOfferApplied from "@/app/components/SuperCustomer/SCOfferApplied";

const CampaignCard = ({ props }) => {
  // const { data: session } = useSession();
  // const pathname = usePathname();
  // const restaurantId = pathname.split("/")[4];
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;
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
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // width: '600px',
    // bgcolor: "background.paper",
    // border: "2px solid #ff5938",
    // boxShadow: `0px 4px 20px 0px ${shadowColor}`,
    // p: 4,
    // borderRadius: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #ff5938",
    borderRadius: "10px",
    boxShadow: `0px 4px 20px 0px ${shadowColor}`,
    p: 4,
    '@media screen and (min-width:800px)': {
      width: 800,
    },
  };

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const date = new Date(dateString);

  // Format the day without the ordinal suffix
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const value = day +" "+month+","+year;

  return value;//date.toLocaleDateString(undefined, options).replace(/\d{1,2}$/, day);
};
const formattedStartDate = formatDate(props.startDate);
const formattedEndDate = formatDate(props.endDate);


  return (
    <Box
      sx={{
        p:'1rem',
        // m:'1rem',
        borderRadius: "10px",
        boxShadow: `0px 4px 20px 0px ${shadowColor}`,
        maxWidth: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography variant="h3">{props.name}</Typography>
      <Typography variant="p">{props.offer}</Typography>
      <Box
       sx={{
          display:'flex',
          flexDirection:'column',
          textAlign:'end',
          p:'1rem',
          marginLeft: 'auto',
          gap:'1rem',
        }}
      >
        <Typography variant="p">More information</Typography>
        <SCActive
          text="Activate"
          width="auto"
          onClick={handleOpen}
        ></SCActive>
      </Box>
      <Modal
        sx={{
          // minWidth:'300px',
          // width:'200px',
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3">
            {props.name}
          </Typography>
          <Box
            sx={{
              display:'flex',
              flexDirection:'column',
              gap:'1rem',
              alignItems:'center',
              m:'1rem 0',
              '@media screen and (min-width:800px)': {
                display: 'flex',
                flexDirection:'row',
              },
            }}
          >
            <Box
              sx={{
                // flex:'1 0 40%',
              }}
            >
              <img
                src={props.media[0]}
                alt="new"
                width="auto"
                height="auto"
                style={{ borderRadius: "10px" }}
              />
            </Box>
            <Box
              sx={{
                display:'flex',
                flexDirection:'column',
              }}
            >
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Offer: <Typography variant="p">{props.offer}</Typography>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {/* Date: {props.startDate} */}
                Date: <Typography variant="p">{formattedStartDate} to {formattedEndDate}</Typography>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Time: <Typography variant="p">11:00AM to 8:00PM</Typography>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Typography variant="p">{props.description}</Typography>
              </Typography>
              <Box
                sx={{
                  m:'1rem 0 0 0',
                }}
              >
                <SingleButton
                  text="Activate"
                  width="auto"
                  onClick={handleOpenSecond}
                ></SingleButton>
            </Box>
            </Box>            
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
            sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              justifyItems:'center',
              flexFlow:'wrap',
            }}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 6, width: "6ch" },
                flexGrow:1,
                flexBasis:'100%',
              }}
              noValidate
              autoComplete="off"
            >
              <TextField 
                onChange={(e)=>{setCode(e.target.value)}} 
                id="standard-basic" 
                variant="standard" 
                sx={{
                  fontSize: "2rem", // Set the font size to be double the default size
                }}
              />
            </Box>
            <SCSubmitBtn
              text="Submit"
              width="144px"
              onClick={getCode}
            ></SCSubmitBtn>
          </Box>
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
