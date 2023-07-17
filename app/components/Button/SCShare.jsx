import React from "react";
import { Button, Box, useTheme, Typography, Modal } from "@mui/material";
import Share from "@/app/components/svg/shareIcon.svg";
import QRCode from "qrcode";
import { useState } from "react";

const SCShare = ({ text, width, superCustomerId, restaurantId }) => {
  const theme = useTheme();
  const url = `http://localhost:3000/newCustomer/${restaurantId}/${superCustomerId}}`;
  console.log(url);
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
        // onClick={GenerateQRCode}
        // onClick={open}
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
          <Typography variant="p">Link to New Customer Page</Typography>
          <img src={qr} />
        </Box>
      </Modal>
    </Box>
  );
};

export default SCShare;
