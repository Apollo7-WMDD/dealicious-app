"use client";

import StarIcon from "@mui/icons-material/Star";
import { Card, CardActions, CardContent, Box, Typography } from "@mui/material";
import Image from "next/image";

const SCCard = ({ props }) => {
  return (
    <Box>
      <Card
        sx={{
          maxWidth: 324,
          borderRadius: "16px",
        }}
      >
        <img
          src="https://media.istockphoto.com/id/1415525222/photo/fire-and-chinese-chefs.jpg?s=1024x1024&w=is&k=20&c=zdg6cOC9XSu1Xw9Adys82VBZxHWkHupFiAqxBbxyqxU="
          alt="new"
          height="189"
          width="324"
        />
        <Box
          sx={{
            display: "flex",
          }}
        >
          <img
            src={props?.logo}
            alt="new"
            width="30"
            height="30"
            style={{ borderRadius: "50%" }}
          />
          <CardContent
            sx={{
              p: 0,
              m: 0,
              textAlign: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {props?.name}
            </Typography>
            <Typography variant="p" color="text.secondary">
              4.5
              <StarIcon />
              {props?.campaigns.length} Active campaigns
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
    </Box>
  );
};

export default SCCard;
