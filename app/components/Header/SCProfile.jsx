"use client";
import { React, useState } from 'react';
import Link from "next/link";
import { Box, Button, Menu, MenuItem, Fade, useTheme, Typography } from "@mui/material";
import Arrowdown from "@/app/components/svg/arrowdown.svg";
import { useSession, signOut } from "next-auth/react";

const SelectComponent = () => {
  // const handleLogout = () => {
  //   // Add your logout logic here
  //   alert("Logout clicked!");
  // };
  const theme = useTheme();  
  const [anchorEl, setAnchorEl] = useState(null);

  let open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const { data: session } = useSession();

  return (
    <Box>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          padding: 0,
          typography: "p",
          color: theme.palette.background.alt,
        }}
      >
        {`${session?.user?.firstname} ${session?.user?.lastname}`}
        <Arrowdown
          style={{
            fontSize: "14px",
            marginLeft: ".5rem",
          }}
        />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{ width: '100%' }}
      >
        <MenuItem onClick={signOut}>
          <Link href={`/`}>
            <Typography variant="p">Log out</Typography>
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SelectComponent;