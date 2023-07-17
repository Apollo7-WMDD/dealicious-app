"use client";

import StarIcon from "@/app/components/svg/star.svg";
import { Card, CardContent, Box, Typography } from "@mui/material";
import Link from "next/link";

const SCCard = ({ props }) => {
  return (
    <Box>
      <Link
        underline="none"
        href={`/superCustomer/restaurants/64a9918f8f2748a9b781ad59/649caf44ea1c8363ed630fc4`}
        style={{ textDecoration: "none" }}
      >
        <Card
          sx={{
            maxWidth: 324,
            borderRadius: "16px",
            boxShadow: 20,
          }}
        >
          <img
            src="https://media.istockphoto.com/id/1415525222/photo/fire-and-chinese-chefs.jpg?s=1024x1024&w=is&k=20&c=zdg6cOC9XSu1Xw9Adys82VBZxHWkHupFiAqxBbxyqxU="
            alt="new"
            height="189px"
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
                }}
                alt="Logo"
              />
            </Box>
            <CardContent
              sx={{
                m: "0 0 0 2rem",
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
              bgcolor: "#ffd8c8",
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
