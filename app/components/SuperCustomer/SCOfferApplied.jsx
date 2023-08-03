"use client";
import { React, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import SingleButton from "../Button/SingleButton";
import InputDropdown from "@/app/components/Input/InputDropdown";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Share = ({ props, status }) => {
    const theme = useTheme();
    const shadowColor = `${theme.palette.neutral[20]}1f`;
    const { data: session } = useSession();
    const pathname = usePathname();
    const restaurantId = pathname.split("/")[4];
    const [showCard, setShowCard] = useState(true);
    // const [open, setOpen] = useState(false);

    // const campaignTypes = [
    //     { value: "Happy hour", label: "Happy hour" },
    //     { value: "Lunch only", label: "Lunch only" },
    //     { value: "Buy one, get one", label: "Buy one, get one" },
    //     { value: "Group dining", label: "Group dining" },
    //     { value: "Birthday Party", label: "Birthday Party" },
    //     { value: "Weekdays only", label: "Weekdays only" },
    //     { value: "Special events", label: "Special events" },
    //     { value: "Seasonal Menu", label: "Seasonal Menu" },
    //     { value: "Demographic targeted", label: "Demographic targeted" },
    //     { value: "Other", label: "Other" },
    //   ];

      const [age, setAge] = useState('');
      const handleChange = (event) => {
        setAge(event.target.value);
      };

    const handleOpenConfirm = async () => {
    const burnCodeInfo = {
        username:
            session.user.name ||
            `${session.user?.firstname} ${session.user?.lastname}`,
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
        console.log("Success! ", data);
        // handleClose();
        setShowCard(false);
        } catch (error) {
        console.log(error);
        }
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
        const starClass = i <= rating ? 'star-filled' : 'star-empty';
        stars.push(
          <span
            key={i}
            className={`star ${starClass}`}
            onClick={() => handleRatingChange(i)}
          >
            &#9733;
          </span>
        );
      }
  
      return stars;
    };

    // const handleOpen = () => {
    //     setOpen(true);
    // }
    // const handleClose = () => {
    //     setOpen(false);
    // };

    if (!showCard) {
        return null; // Return null to hide the component when showCard is false
    }

    if(status)
    {
        // handleOpen();
        return (
        // <Modal
        // open={open}
        // onClose={handleClose}
        // >
            <Box
                sx={{
                    borderRadius: "10px",
                    // width:"400px"
                }}
            >
                <Typography 
                    variant="h2"
                    sx={{
                        color:"#ff5938",
                        m:'1rem 0',
                      }}
                >Offer Applied!</Typography>
                <Typography variant="p">We hope you have enjoyed your meal and come back soon.</Typography>
                <Box
                    sx={{
                        m:'1rem 0',
                        display:"flex",
                        gap:"1rem",
                        flexDirection: "column",
                        borderRadius: "10px",
                        // border: "1px solid #ff5938",
                        boxShadow: `0px 4px 20px 0px ${shadowColor}`,
                        p:"1rem",
                        alignItems:"center",
                    }}
                >
                    <Typography variant="h3">Rate your visit</Typography>
                    <Box 
                        className="rating"
                        sx={{
                            color:"#ff5938",
                            fontSize: '40px',
                        }}                    
                    >{renderStars()}</Box>
                    <Typography variant="p">Your Rating: {rating}/5</Typography>
                    <Typography variant="h4">What area do you think we should improve?</Typography>
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
                    <SingleButton
                    text="Submit"
                    width="144px"
                    onClick={handleOpenConfirm}
                    >  
                    </SingleButton>                 
                </Box>
            </Box>
        // </Modal>
        );
    }
    else
    {
        return (
            <Box>
                <Typography>Code Wrong!</Typography>
            </Box>
        );
    }
};

export default Share;
