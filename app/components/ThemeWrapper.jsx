// "use client";
// import { useMemo } from "react";
// import {
//   Box,
//   AppBar,
//   List,
//   Drawer,
//   ListItemIcon,
//   ListItemText,
//   ListItem,
//   ListItemButton,
//   Typography,
// } from "@mui/material";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import { themeSettings } from "../theme.js";
// import { useStore } from "../store.js";
// import {
//   HomeOutlined,
//   ShoppingCartOutlined,
//   Groups2Outlined,
//   ReceiptLongOutlined,
//   PublicOutlined,
//   PointOfSaleOutlined,
//   GraphicEqOutlined
// } from "@mui/icons-material";

// const navItems = [
//   {
//     text: "Campaign",
//     icon: <HomeOutlined />,
//   },
//   {
//     text: "Insight",
//     icon: <GraphicEqOutlined />,
//   },
//   {
//     text: "Burn a code",
//     icon: <ShoppingCartOutlined />,
//   },
//   {
//     text: "My Profile",
//     icon: <Groups2Outlined />,
//   }
// ];

// function ThemeWrapper() {
//   const { mode } = useStore();
//   const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
        
//         <AppBar
//           sx={{
//             position: "static",
//             background: "none",
//             boxShadow: "none",
//           }}
//         >
//           <Box
//             // open={isSidebarOpen}
//             // onClose={() => setIsSidebarOpen(false)}
//             // variant="persistent"
//             // anchor="left"
//             // transitionDuration={{
//             //     enter: 10000,
//             //     exit: 10000,
//             // }}
//             sx={{
//               width: "250px",
//               "& .MuiDrawer-paper": {
//                 color: theme.palette.text.secondary[200],
//                 // color: "gold",
//                 background: theme.palette.background.alt,
//                 boxSizing: "border-box",
//                 // borderWidth: isNonMobile ? 0 : "2px",
//                 width: "250px",
//               },
//             }}
//           >
//             <List>
//               {navItems.map(({ text, icon }) => {
//                 if (!icon) {
//                   return (
//                     <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
//                       {text}
//                     </Typography>
//                   );
//                 }
//                 const lcText = text.toLowerCase();

//                 return (
//                   <ListItem key={text} disablePadding>
//                     <ListItemButton
//                       onClick={() => {
//                         navigate(`/${lcText}`);
//                         // setActive(lcText);
//                       }}
//                       sx={{
//                         backgroundColor:
//                           // active === lcText
//                           //   ? theme.palette.secondary[300]
//                           //   : "transparent",
//                           theme.palette.secondary[300],
//                         color:
//                           // active === lcText
//                           //   ? theme.palette.primary[600]
//                           //   : theme.palette.secondary[100],
//                           theme.palette.primary[600],
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           ml: "2rem",
//                           color:
//                             // active === lcText
//                             //   ? theme.palette.primary[600]
//                             //   : theme.palette.secondary[200],
//                             theme.palette.primary[600],
//                         }}
//                       >
//                         {icon}
//                       </ListItemIcon>
//                       <ListItemText primary={text}>
//                         {/* {active === lcText && (
//                           <ChevronRightOutlined sx={{ ml: "auto" }} />
//                         )} */}
//                       </ListItemText>
//                     </ListItemButton>
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </Box>
//         </AppBar>
        
//       </ThemeProvider>
//     </>
//   );
// }

// export default ThemeWrapper;
