import {
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import SubItem from "./SubItem.jsx";
import DealIcon from "../svg/dealIcon.svg";
import InsightIcon from "../svg/insighticon.svg";
import BurnCodeIcon from "../svg/burnCode.svg";
import ProfileIcon from "../svg/profileIcon.svg";
import { useStore } from "../../store.js";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import PassContext from "@/app/components/Dashboard/PassContext";
function SideBarItem() {
  const { data: session, status } = useSession();
  // const restaurantOwnerId = session?.user.id;
  // const restaurantData = await fetchRestaurants(session?.user.id);
  // const restaurantId = restaurantData.restaurantId;
  // console.log(restaurantData);
  // console.log(restaurantId);
  // console.log(restaurantOwnerId);

  const navItems = [
    {
      text: "Campaigns",
      icon: <DealIcon />,
      link: `/dashboard/campaigns/active/${session?.user.id}`,
    },
    {
      text: "Insights",
      icon: <InsightIcon />,
      // WRONG WAITNG FOR RESTAURANTID TO RESOVLE
      link: `/dashboard/insights/overview/${session?.user.id}`
    },
    {
      text: "Burn a Code",
      icon: <BurnCodeIcon />,
      link: "/burnCode",
    },
    {
      text: "Profile",
      icon: <ProfileIcon />,
      link: "/profile",
    },
  ];

  const campaignSubItems = [
    {
      text: "Ongoing",
      link: `/dashboard/campaigns/active/${session?.user.id}`,
    },
    {
      text: "Upcoming",
      link: `/dashboard/campaigns/upcoming/${session?.user.id}`,
    },
  ];

  const insightSubItems = [
    {
      text: "Overview",
      link: `dashboard/insights/overview/${session?.user.id}`,
    },
    {
      text: "Campaigns",
      // WRONG WAITNG FOR RESTAURANTID TO RESOVLE
      link: `/dashboard/insights/campaigns/${session?.user.id}`
    },
    {
      text: "Customers",
       // WRONG WAITNG FOR RESTAURANTID TO RESOVLE
       link: `/dashboard/insights/customers/${session?.user.id}`
    },
  ];
  const theme = useTheme();
  const { sideBarItemActive, setSideBarItemActive } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setSideBarItemActive(pathname.substring(1));
  }, [pathname]);
  // console.log("sideBarItemActive=", sideBarItemActive);
  return (
    <>
      {/* <PassContext
        restaurantOwnerId={restaurantOwnerId}
        restaurantId={restaurantId}
      /> */}
      <List
        sx={{
          padding: "0",
        }}
      >
        {navItems.map(({ text, icon, link }) => {
          const activeLink = `${link}`.substring("1");
          const activeLinkSplit = activeLink.split("/");
          const currentURL = pathname.split("/");
          // console.log("currentURL=", currentURL[2]);
          // console.log("activeLink=", activeLink);
          // console.log("activeLinkSplit=", activeLinkSplit[1]);

          return (
            <ListItem key={text} style={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  router.push(`${link}`);
                  setSideBarItemActive(activeLink);
                  // console.log("activeLink=", activeLink);
                }}
                sx={{
                  backgroundColor:
                  currentURL[2] === activeLinkSplit[1]
                      ? theme.palette.primary[120]
                      : "transparent",
                  // "transparent"
                  // theme.palette.background.alt,
                  // color:
                  // active === lcText
                  //   ? theme.palette.primary[600]
                  //   : theme.palette.secondary[100],
                  // theme.palette.primary[80],

                  padding: "0 2rem",
                }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: ".5rem",
                    color:
                      // active === lcText
                      //   ? theme.palette.primary[600]
                      //   : theme.palette.secondary[200],
                      theme.palette.background.alt,
                    // theme.palette.primary[80],
                    minWidth: "auto",
                    // width: "auto",
                    fontSize: "1.5rem",
                    // overflow: "clip"
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={text}
                  sx={{
                    typography: "h4",
                  }}
                >
                  {/* {active === lcText && (
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                  )} */}
                </ListItemText>
              </ListItemButton>
              {currentURL[2] === activeLinkSplit[1] &&
                currentURL[2] == `campaigns` && (
                  <SubItem list={campaignSubItems}></SubItem>
                )}
              {/* {(sideBarItemActive === activeLink &&
                (activeLink == `campaigns/upcoming`) && (
                  <SubItem list={campaignSubItems}></SubItem>
                ))} */}
              {currentURL[2] === activeLinkSplit[1] &&
                currentURL[2] == `insights` && (
                  <SubItem list={insightSubItems}></SubItem>
                )}
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default SideBarItem;
