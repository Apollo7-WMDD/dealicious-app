/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../svg/dealIcon.svg";

// import next js
import Link from "next/link";

// import theme
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Button from "@mui/material/Button";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const theme = useTheme();
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    },
  ];
  return (
    <nav>
      <div className="nav-logo-container">
        {/* <img src={Logo} alt="" /> */}
      </div>
      <div className="navbar-links-container">
        <Link href="/">
          <Button
            sx={{
              textTransform: "none",
              color: theme.palette.primary.dark,
              fontSize: "1.2rem",
              letterSpacing: "1px",
              padding: "15px 20px",
              transition: "all 0.25s ease",

              ":hover": {
                backdropFilter: "blur(10px)",
              },
            }}
          >
            Home
          </Button>
        </Link>
        <Link href="/">
          <Button
            sx={{
              textTransform: "none",
              color: theme.palette.primary.dark,
              fontSize: "1.2rem",
              letterSpacing: "1px",
              padding: "15px 20px",
              transition: "all 0.25s ease",
              ":hover": {
                backdropFilter: "blur(10px)",
              },
            }}
          >
            About
          </Button>
        </Link>
        <Link href="/">
          <Button
            sx={{
              textTransform: "none",
              color: theme.palette.primary.dark,
              fontSize: "1.2rem",
              letterSpacing: "1px",
              padding: "15px 20px",
              transition: "all 0.25s ease",
              ":hover": {
                backdropFilter: "blur(10px)",
              },
            }}
          >
            Testimonials
          </Button>
        </Link>
        <Link href="/">
          <Button
            sx={{
              textTransform: "none",
              color: theme.palette.primary.dark,
              fontSize: "1.2rem",
              letterSpacing: "1px",
              padding: "15px 20px",
              transition: "all 0.25s ease",

              ":hover": {
                backdropFilter: "blur(10px)",
              },
            }}
          >
            Contact
          </Button>
        </Link>

        <Button
          variant="outlined"
          sx={{
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            borderRadius: "20px",
            padding: "10px 30px",
            textTransform: "none",
            fontSize: "1.2rem",
            transition: "all 0.25s ease",

            ":hover": {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.common.white,
              borderColor: theme.palette.secondary.main,
            },
          }}
        >
          Join now
        </Button>
      </div>
      <div className="navbar-menu-container">
        <button onClick={() => setOpenMenu(true)}>CLICK BURGER MENU</button>
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
