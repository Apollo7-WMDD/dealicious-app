"use client";
import { React, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import SingleButton from "../Button/SingleButton";
import InputDropdown from "@/app/components/Input/InputDropdown";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SingleButtonSC from "../Button/SingleButtonSC";

const Share = ({ props, status, setOpenThird }) => {
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;
  const { data: session } = useSession();
  const pathname = usePathname();
  //const restaurantId = pathname.split("/")[2];
  const scpath = pathname.split("/")[1];
  let restaurantId;
  let burnUserName;
  if (scpath == "newCustomer"){
     restaurantId = pathname.split("/")[2];
     burnUserName = "New Customer";
  }
  else {
    restaurantId = pathname.split("/")[4];
    burnUserName = session.user.name ||
    `${session.user?.firstname} ${session.user?.lastname}`;
  }
  const [showCard, setShowCard] = useState(true);
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleOpenConfirm = async () => {
    const burnCodeInfo = {
      username: burnUserName,
        //session.user.name ||
        //`${session.user?.firstname} ${session.user?.lastname}`,
      campaignname: props.name,
      offer: props.offer,
      burned: false,
      restaurantId: restaurantId,
      campaignId: props._id,
    };
    try {
      const res = await fetch(`/api/burnCode/customers/${restaurantId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(burnCodeInfo),
      });
      if (!res.ok) {
        const data = await res.text();
        throw new Error(data);
      }
      const data = await res.json();
      // console.log("Success! ", data);
      // handleClose();
      setShowCard(false);
    } catch (error) {
      console.log(error);
    }
    setOpenThird(false);
  };

  const [rating, setRating] = useState(0); // State to store the rating (starts with 0)

  // Function to handle the user's star rating selection
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Function to render the stars based on the rating
  const renderStars = () => {
    const stars = [];
    const maxRating = 5;

    for (let i = 1; i <= maxRating; i++) {
      const starClass = i <= rating ? "starFilled" : "starEmpty";
      stars.push(
        <span
          key={i}
          // className={`star ${starClass}`}
          style={
            i <= rating
              ? {
                  // color: 'gold', 
                  color: "#ff5938",
                  // color: theme.palette.background ,
                  // borderColor: '#ff5938',
                  // border: "1px solid",
                }
              : { 
                // color: 'hotpink'
                color: "#454545",
                // color: theme.palette.primary[80] 
              }
          }
          onClick={() => handleRatingChange(i)}
        >
          &#9733;
        </span>
      );
    }

    return stars;
  };
  

  if (!showCard) {
    return null; // Return null to hide the component when showCard is false
  }

  if (status) {
    return (
      <Box
        sx={{
          borderRadius: "10px",
          overflow: "auto",
          // backgroundColor: "gold",
          // width:"400px"
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#ff5938",
            m: "1rem 0",
          }}
        >
          Offer Applied!
        </Typography>
        <Typography variant="p">
          We hope you have enjoyed your meal and come back soon.
        </Typography>
        <Box
          sx={{
            m: "1rem 0",
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            borderRadius: "10px",
            boxShadow: `0px 4px 20px 0px ${shadowColor}`,
            p: "1rem",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">Rate your visit</Typography>
          <Box
            className="rating"
            sx={{
              
              // color: theme.palette.background,
              // borderColor: theme.palette.background.alt,
              // border: "1px solid",
              fontSize: "40px",
            }}
          >
            {renderStars()}
          </Box>
          <Typography variant="p">Your Rating: {rating}/5</Typography>
          <Typography variant="h4">
            What area do you think we should improve?
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">To improve:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="To improve:"
              onChange={handleChange}
            >
              <MenuItem value={1}>Service</MenuItem>
              <MenuItem value={2}>Food Quality</MenuItem>
              <MenuItem value={3}>Menu Variety</MenuItem>
              <MenuItem value={4}>Ambiance</MenuItem>
              <MenuItem value={5}>Cleanliness</MenuItem>
              <MenuItem value={6}>Speed of Service</MenuItem>
              <MenuItem value={7}>Online Presence</MenuItem>
              <MenuItem value={8}>Feedback and Reviews</MenuItem>
              <MenuItem value={9}>Staff Training</MenuItem>
              <MenuItem value={10}>Sustainability</MenuItem>
            </Select>
          </FormControl>
          {/* <SingleButton
            text="Submit"
            width="90%"
            onClick={handleOpenConfirm}
          ></SingleButton> */}
          <SingleButtonSC
            text="Submit"
            width="90%"
            onClick={handleOpenConfirm}
          ></SingleButtonSC>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography
          id="modal-modal-title"
          variant="h3"
          sx={{ color: "#ff5938" }}
        >
          Code Wrong!
        </Typography>
        {/* <Typography>Code Wrong!</Typography> */}
      </Box>
    );
  }
};

export default Share;
