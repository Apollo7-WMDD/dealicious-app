"use client";
import StarIcon from "@/app/components/svg/star.svg";
import { Card, CardContent, Box, Typography, useTheme } from "@mui/material";
import Link from "next/link";

const SCCard = ({ props, superCustomerId }) => {
  // console.log("This is the props SC!!!!", superCustomerId);
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  return (
    <Box
      sx={{
        maxWidth: '350px',
        
        // display: 'grid',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // flexBasis: '30%', 
        // display: "flex",
        // flexDirection: "column",
        // gap: "24px",
        // m: "32px 0 32px 0",
        // alignItems: "center",
        // width: "100%",
          // display: 'flex',
          // flexDirection: 'row',
          // flexBasis: '50%', // You can adjust this value as needed
          // Add more styles here if needed

        "@media screen and (min-width:800px)": {
          // gridTemplateColumns: "1fr 1fr 1fr 1fr",
          // display: 'flex',
          // flexDirection: 'row',
          // flexBasis: '30%', // You can adjust this value as needed
        },
      }}
    >
      <Link
        underline="none"
        href={`/superCustomer/restaurants/${superCustomerId}/${props._id}`}
        style={{ textDecoration: "none" }}
      >
        <Card
          sx={{
            borderRadius: "10px",
            boxShadow: `0px 4px 20px 0px ${shadowColor}`,
            Width:'350px',
            Height:'500px',

            "@media screen and (min-width:800px)": {
              // display: 'flex',
              // flexDirection: 'row',
              // flexBasis: '30%', // You can adjust this value as needed
              flexGrow: '1',
              flexShrink: '0',
              flexBasis: '30%',
            },
          }}
        >
        <img
            src={props?.menu}
            style={{
              borderRadius: "10px",
              width:'350px',
              height:"230px", // adjust the size as needed
            }}
            alt="new"
          />  
          <Box
            sx={{
              display: "flex",
              direction: "row",
              alignItems: "center",
              m: "0 1rem",
            }}
          >
            <Box>
              <img
                src={props.logo}
                style={{
                  borderRadius: "50%",
                  width: "50px", // adjust the size as needed
                  height: "50px", // adjust the size as needed
                  objectFit: "cover",
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
                padding: "1rem 0",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {props.name}
              </Typography>
              <Typography variant="p" color="text.secondary">
                4.5{" "}
                <StarIcon
                  sx={{
                    m: 0,
                    p: 0,
                  }}
                />{" "}
                {props?.campaigns?.length} Active campaigns
              </Typography>
            </CardContent>
          </Box>
          <Box
            sx={{
              textAlign: "end",
              p: 1,
              bgcolor: "#FFD8C8",
            }}
          >
            <Typography>Points earned {props?.points[0]?.points}</Typography>
          </Box>
        </Card>
      </Link>
    </Box>
  );
};

export default SCCard;
