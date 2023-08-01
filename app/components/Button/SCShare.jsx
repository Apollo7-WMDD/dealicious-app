import React from "react";
import { RWebShare } from "react-web-share";
import { Button, Box, useTheme, Typography, Modal } from "@mui/material";
import Share from "@/app/components/svg/shareIcon.svg";
import { useState } from "react";
import StarIcon from "@/app/components/svg/star.svg";
import Location from "@/app/components/svg/location.svg";
import CopyIcon from "@/app/components/svg/copyIcon.svg";
import Clock from "@/app/components/svg/clock.svg";
import Phone from "@/app/components/svg/phone.svg";
import URL from "@/app/components/svg/url.svg";
import { useSession } from "next-auth/react";

const SCShare = ({
  text,
  width,
  superCustomerId,
  restaurantId,
  restaurantData,
}) => {
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  // <Bug AP-220 #143 - SC Share button>
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? "https://dealicious.site"
    : "http://localhost:3000";

  const url = `${serverUrl}/newCustomer/${restaurantId}/${superCustomerId}`;
  //const url = `http://localhost:3000/newCustomer/${restaurantId}/${superCustomerId}}`;
  //console.log(url);
  // </Bug AP-220 #143 - SC Share button>

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const style = {
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
  };

  const { data: session } = useSession();
  const username = `${session?.user?.firstname} ${session?.user?.lastname}`;
  // const [user, setUserName] = useState("");
  // setUserName(username);

  // console.log(restaurantData)
  // console.log(username)

  return (
    <Box>
      <Button
        variant="contained"
        size="medium"
        startIcon={<Share />}
        onClick={handleOpen}
        sx={{
          width: width,
          height: "44px",
          justifySelf: "end",
          alignSelf: "end",
          borderRadius: "12px",
          backgroundColor: theme.palette.primary[80],
          ":hover": {
            backgroundColor: theme.palette.primary[60],
          },
          [theme.breakpoints.down("lg")]: {
            width: "265px",
            fontSize: "16px",
          },
          [theme.breakpoints.down("md")]: {
            width: "180px",
            fontSize: "14px",
            lineHeight: "16px",
            margin: "1rem 0",
            // alignSelf: "start",
            justifySelf: "start",
          },
        }}
      >
        <Typography variant="p">{text}</Typography>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="p">
            Experience culinary bliss with a special invitation from{" "}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "#ff5938",
              m: "1rem 0",
            }}
          >
            {username}
          </Typography>
          <Typography variant="p">
            Activate your favourite campaign at our place and embark on a
            remarkable culinary adventure unlike any other.
          </Typography>
          <Box
            sx={{
              display: "flex",
              direction: "row",
              alignItems: "center",
              m: "1rem 0",
              p: "0 0 2rem 0",
            }}
          >
            <Box>
              <img
                src={restaurantData?.logo}
                style={{
                  borderRadius: "50%",
                  width: "90px", // adjust the size as needed
                  height: "90px", // adjust the size as needed
                  objectFit: "cover",
                }}
                alt="Logo"
              />
            </Box>
            <Box
              sx={{
                m: "0 0 0 1rem",
                textAlign: "start",
              }}
              style={{
                padding: "0",
              }}
            >
              <Typography gutterBottom variant="h3" component="div">
                {restaurantData?.name}
              </Typography>
              <Typography variant="p" color="text.secondary">
                4.5{" "}
                <StarIcon
                  sx={{
                    m: 0,
                    p: 0,
                  }}
                />{" "}
                Peruvian * Cafe * Bistro
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              m: "0",
              gap: "1rem",
            }}
          >
            <Typography variant="p" color="text.secondary">
              <Location /> {restaurantData?.address?.street},{" "}
              {restaurantData?.address?.city},{" "}
              {restaurantData?.address?.province},{" "}
              {restaurantData?.address?.zipcode} <CopyIcon />
            </Typography>
            <Typography variant="p" color="text.secondary">
              <Clock /> Everyday: 5 pm - 10 pm
            </Typography>
            <Typography variant="p" color="text.secondary">
              <Phone /> {restaurantData?.phone}
            </Typography>
            <Typography variant="p" color="text.secondary">
              <URL /> {restaurantData?.website}
            </Typography>
          </Box>
          <RWebShare
            data={{
              text: `I invite you to experience ${restaurantData?.name}. Activate your favourite campaign at the place and enjoy a DEALicious adventure!`,
              url: url,
              title: "DEALicious share",
            }}
            onClick={handleClose}
          >
            <Box
              sx={{
                justifyContent: "end",
                display: "flex",
              }}
            >
              <Button
                variant="contained"
                size="medium"
                startIcon={<Share />}
                // onClick={onClick}
                sx={{
                  width: width,
                  height: "44px",
                  // justifySelf: "end",
                  // alignSelf: "end",
                  borderRadius: "12px",
                  // justifyContent:'end',
                  // justifyItems:'end',
                  // alignContent:'end',
                  // alignSelf:'end',
                  left: "0",
                  m: "2rem 0 0 0",
                  backgroundColor: theme.palette.primary[80],
                  ":hover": {
                    backgroundColor: theme.palette.primary[60],
                  },
                  [theme.breakpoints.down("lg")]: {
                    width: "265px",
                    fontSize: "16px",
                  },
                  [theme.breakpoints.down("md")]: {
                    width: "180px",
                    fontSize: "14px",
                    lineHeight: "16px",
                    margin: "1rem 0",
                    // alignSelf: "start",
                    justifySelf: "start",
                  },
                }}
              >
                <Typography variant="p">{text}</Typography>
              </Button>
            </Box>
          </RWebShare>
        </Box>
      </Modal>
    </Box>
  );
};

export default SCShare;
