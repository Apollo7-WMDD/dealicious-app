import React from "react";
import { CardContent, Button, Box, useTheme, Typography, Modal } from "@mui/material";
import Share from "@/app/components/svg/shareIcon.svg";
import QRCode from "qrcode";
import { useState } from "react";
import StarIcon from "@/app/components/svg/star.svg";

const SCShare = ({ text, width, superCustomerId, restaurantId }) => {
  const theme = useTheme();

  // <Bug AP-220 #143 - SC Share button>
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const url = `${serverUrl}/newCustomer/${restaurantId}/${superCustomerId}`;
  //const url = `http://localhost:3000/newCustomer/${restaurantId}/${superCustomerId}}`;
  //console.log(url);
  // </Bug AP-220 #143 - SC Share button>

  const [qr, setQr] = useState("");
  const [open, setOpen] = React.useState(false);
  //const handleOpen = () => setOpen(true);
  const handleOpen = () => {
    setOpen(true);
    GenerateQRCode();
  };
  const handleClose = () => setOpen(false);

  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 400,
        // margin: 2,
        color: {
          // dark: '#335383FF',
          // light: '#EEEEEEFF'
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        //console.log(url)
        setQr(url);
      }
    );
  };

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
    <Box
      sx={{
        textAlign: "end",
        p: "1rem",
      }}
    >
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
        <Box
          // sx={{
          //   maxWidth: "auto",
          //   display: "flex",
          //   flexDirection: "column",
          //   gap: "3%",
          //   textAlign: "center",
          //   justifyContent: "center",
          //   border: 1,
          //   borderColor: '#ff5938',          
          //   borderRadius: "10px",
          //   boxShadow: 20,
          // }}
        >
          <Box>
              {/* <Typography variant="h2">{props.name}</Typography> */}
              <Typography variant="p">Invited you to experience culinary bliss. 
              Activate your favourite cmpaign at our place and embark on a remarkable
              culinary adventure unlike any other.</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              direction: "row",
              alignItems: "center",
              m: "0 1rem",
              p: "0 0 2rem 0",
            }}
          >
            <Box>
              <img
                // src={props?.logo}
                style={{
                  borderRadius: "50%",
                  width: "90px", // adjust the size as needed
                  height: "90px", // adjust the size as needed
                }}
                alt="Logo"
              />
            </Box>
            <CardContent
              sx={{
                m: "0 0 0 1rem",
                textAlign: "start",
              }}
              style={{
                padding: "0",
              }}
            >
              <Typography gutterBottom variant="h3" component="div">
                {/* {props?.name} */}
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
            </CardContent>
          </Box>
        </Box>
        {/* <Box sx={style}>
          <Typography variant="p">Link to New Customer Page</Typography>
          <img src={qr} />
        </Box> */}
      </Modal>
    </Box>
  );
};

export default SCShare;
