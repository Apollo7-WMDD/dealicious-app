// "use client";
// import { useRouter } from "next/navigation";
// import { useMemo } from "react";
// import Image from "next/image";
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
// import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
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
//   GraphicEqOutlined,
//   Campaign,
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
//     text: "Profile",
//     icon: <Groups2Outlined />,
//   },
// ];

// function ThemeWrapper({ children }) {
//   const router = useRouter();
//   const { mode, isSidebarOpen } = useStore();
//   const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const shadowColor = `${theme.palette.neutral[20]}1f`;
//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />

//         <Box
//           sx={{
//             // position: "static",
//             background: "none",
//             boxShadow: "none",
//             display: "flex",
//           }}
//         >
//           {isNonMobile && (
//             <Drawer
//               open={isSidebarOpen}
//               // open={true} //change this to use isSidebarOpen
//               // onClose={() => setIsSidebarOpen(false)}
//               variant="persistent"
//               anchor="left"
//               // transitionDuration={{
//               //     enter: 10000,
//               //     exit: 10000,
//               // }}
//               sx={{
//                 width: "250px",
//                 height: "100%",
//                 minHeight: "100vh",
//                 boxShadow: `4px 4px 20px ${shadowColor}`,
//                 "& .MuiDrawer-paper": {
//                   // boxShadow: "4px 4px 20px theme.palette.neutral[20]",
//                   padding: "2rem 0",
//                   color: theme.palette.neutral[20],
//                   background: theme.palette.background.alt,
//                   boxSizing: "border-box",
//                   // borderWidth: isNonMobile ? 0 : "2px",
//                   width: "250px",
//                 },
//               }}
//             >
//               <Box>
//                 <Image
//                   src="/logo.png"
//                   alt="logo"
//                   width={100}
//                   height={100}
//                   style={{ margin: "0 auto" }}
//                 />
//                 <List
//                   sx={{
//                     padding: "0",
//                   }}
//                 >
//                   <ListItem disablePadding>
//                     <ListItemButton
//                       onClick={() => {
//                         router.push(`/campaigns`);
//                         // setActive(lcText);
//                       }}
//                       sx={{
//                         backgroundColor:
//                           // active === lcText
//                           //   ? theme.palette.secondary[300]
//                           //   : "transparent",
//                           theme.palette.background.alt,
//                         // color:
//                         // active === lcText
//                         //   ? theme.palette.primary[600]
//                         //   : theme.palette.secondary[100],
//                         // theme.palette.primary[80],

//                         fontFamily: "Ubuntu",
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           ml: "2rem",
//                           // color:
//                           // active === lcText
//                           //   ? theme.palette.primary[600]
//                           //   : theme.palette.secondary[200],
//                           // theme.palette.primary[80],
//                         }}
//                       >
//                         <HomeOutlined />
//                       </ListItemIcon>
//                       <ListItemText
//                         disableTypography
//                         primary="Campaign"
//                         sx={{
//                           typography: "h4",
//                         }}
//                       >
//                         {/* {active === lcText && (
//                           <ChevronRightOutlined sx={{ ml: "auto" }} />
//                         )} */}
//                       </ListItemText>
//                     </ListItemButton>
//                   </ListItem>
//                   <ListItem disablePadding>
//                     <ListItemButton
//                       onClick={() => {
//                         router.push(`/insights`);
//                         // setActive(lcText);
//                       }}
//                       sx={{
//                         backgroundColor:
//                           // active === lcText
//                           //   ? theme.palette.secondary[300]
//                           //   : "transparent",
//                           theme.palette.background.alt,
//                         // color:
//                         // active === lcText
//                         //   ? theme.palette.primary[600]
//                         //   : theme.palette.secondary[100],
//                         // theme.palette.primary[80],

//                         fontFamily: "Ubuntu",
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           ml: "2rem",
//                           // color:
//                           // active === lcText
//                           //   ? theme.palette.primary[600]
//                           //   : theme.palette.secondary[200],
//                           // theme.palette.primary[80],
//                         }}
//                       >
//                         <HomeOutlined />
//                       </ListItemIcon>
//                       <ListItemText
//                         disableTypography
//                         primary="Insights"
//                         sx={{
//                           typography: "h4",
//                         }}
//                       >
//                         {/* {active === lcText && (
//                           <ChevronRightOutlined sx={{ ml: "auto" }} />
//                         )} */}
//                       </ListItemText>
//                     </ListItemButton>
//                   </ListItem>
//                   <ListItem disablePadding>
//                     <ListItemButton
//                       onClick={() => {
//                         router.push(`/burnCode`);
//                         // setActive(lcText);
//                       }}
//                       sx={{
//                         backgroundColor:
//                           // active === lcText
//                           //   ? theme.palette.secondary[300]
//                           //   : "transparent",
//                           theme.palette.background.alt,
//                         // color:
//                         // active === lcText
//                         //   ? theme.palette.primary[600]
//                         //   : theme.palette.secondary[100],
//                         // theme.palette.primary[80],

//                         fontFamily: "Ubuntu",
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           ml: "2rem",
//                           // color:
//                           // active === lcText
//                           //   ? theme.palette.primary[600]
//                           //   : theme.palette.secondary[200],
//                           // theme.palette.primary[80],
//                         }}
//                       >
//                         <HomeOutlined />
//                       </ListItemIcon>
//                       <ListItemText
//                         disableTypography
//                         primary="Burn a code"
//                         sx={{
//                           typography: "h4",
//                         }}
//                       >
//                         {/* {active === lcText && (
//                           <ChevronRightOutlined sx={{ ml: "auto" }} />
//                         )} */}
//                       </ListItemText>
//                     </ListItemButton>
//                   </ListItem>
//                   <ListItem disablePadding>
//                     <ListItemButton
//                       onClick={() => {
//                         //  THIS LINK NEED TO CHANGE TO DYNAMIC LINK, TO THIS PARTICULAR CAMPAIGN USER PROFILE
//                         router.push(`/profile`);
//                         // setActive(lcText);
//                       }}
//                       sx={{
//                         backgroundColor:
//                           // active === lcText
//                           //   ? theme.palette.secondary[300]
//                           //   : "transparent",
//                           theme.palette.background.alt,
//                         // color:
//                         // active === lcText
//                         //   ? theme.palette.primary[600]
//                         //   : theme.palette.secondary[100],
//                         // theme.palette.primary[80],

//                         fontFamily: "Ubuntu",
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           ml: "2rem",
//                           // color:
//                           // active === lcText
//                           //   ? theme.palette.primary[600]
//                           //   : theme.palette.secondary[200],
//                           // theme.palette.primary[80],
//                         }}
//                       >
//                         <HomeOutlined />
//                       </ListItemIcon>
//                       <ListItemText
//                         disableTypography
//                         primary="Profile"
//                         sx={{
//                           typography: "h4",
//                         }}
//                       >
//                         {/* {active === lcText && (
//                           <ChevronRightOutlined sx={{ ml: "auto" }} />
//                         )} */}
//                       </ListItemText>
//                     </ListItemButton>
//                   </ListItem>
//                 </List>

//                 <Box
//                   sx={{
//                     backgroundColor: theme.palette.secondary[60],
//                     borderRadius: "1rem 1rem 1rem 1rem",
//                     textAlign: "center",
//                     margin: "4rem 2rem",
//                     padding: "2rem 0",
//                   }}
//                 >
//                   <Typography variant="h3" sx={{
//                     fontWeight: "bold"
//                   }}>Today</Typography>
//                   <br/>
//                   <Typography variant="h5">Revenue</Typography>
//                   <Typography variant="h3" sx={{
//                     fontWeight: "bold"
//                   }}>$$$</Typography>
//                   <Typography variant="h5">Customers</Typography>
//                   <Typography variant="h3"sx={{
//                     fontWeight: "bold"
//                   }}>$$$</Typography>
//                 </Box>
//               </Box>
//             </Drawer>
//           )}
//           {children}
//         </Box>
//       </ThemeProvider>
//     </>
//   );
// }

// export default ThemeWrapper;
