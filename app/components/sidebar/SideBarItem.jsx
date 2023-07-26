import {
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import SubItem from "./SubItem.jsx";
import SubItemInsight from "./SubItemInsight.jsx";
import DealIcon from "../svg/dealIcon.svg";
import InsightIcon from "../svg/insighticon.svg";
import BurnCodeIcon from "../svg/burnCode.svg";
import ProfileIcon from "../svg/profileIcon.svg";
import SideBarSelect from "../svg/sideBarSelect.svg";
import { useStore } from "@/lib/context/sidebar_context/store.js";
import { useStore as useStoreOwner } from "@/lib/context/user_context/store.js";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { fetchRestaurantId } from "@/lib/fetching/restaurant/restaurant_id/data";

function SideBarItem() {
  // const { data: session, status } = useSession();
  const {
    restaurantOwnerId,
    restaurantId,
    setRestaurantOwner,
    setRestaurantId,
  } = useStoreOwner();
  const { sideBarItemActive, setSideBarItemActive } = useStore();
  const pathname = usePathname();
  console.log("This is the pathname: ", pathname.split("/")[4]);
  useEffect(() => {
    const getRestaurantId = async () => {
      if (!restaurantOwnerId) {
        setRestaurantOwner(pathname.split("/")[4]);
        const data = await fetchRestaurantId(pathname.split("/")[4]);
        setRestaurantId(data.restaurantId);
      } else {
        const data = await fetchRestaurantId(restaurantOwnerId);
        setRestaurantId(data.restaurantId);
      }
    };

    getRestaurantId();
  }, []);
  const theme = useTheme();
  const router = useRouter();

  const navItems = [
    {
      text: "Campaigns",
      icon: <DealIcon />,
      link: `/dashboard/campaigns/active/${restaurantOwnerId}/#ongoing`,
    },
    {
      text: "Insights",
      icon: <InsightIcon />,
      // WRONG WAITNG FOR RESTAURANTID TO RESOVLE
      link: `/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`,
    },
    {
      text: "Burn a Code",
      icon: <BurnCodeIcon />,
      link: `/dashboard/burnCode/${restaurantOwnerId}`,
    },
    {
      text: "Profile",
      icon: <ProfileIcon />,
      link: `/dashboard/profile/${restaurantOwnerId}`,
    },
  ];

  const campaignSubItems = [
    {
      text: "Ongoing",
      link: `/dashboard/campaigns/active/${restaurantOwnerId}/#ongoing`,
    },
    {
      text: "Upcoming",
      link: `/dashboard/campaigns/active/${restaurantOwnerId}/#upcoming`,
    },
  ];

  const insightSubItems = [
    {
      text: "Overview",
      link: `/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`,
    },
    {
      text: "Campaigns",
      // WRONG WAITNG FOR RESTAURANTID TO RESOVLE
      link: `/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId} `,
    },
    {
      text: "Customers",
      // WRONG WAITNG FOR RESTAURANTID TO RESOVLE
      link: `/dashboard/insights/customers/${restaurantOwnerId}/${restaurantId}`,
    },
  ];

  useEffect(() => {
    setSideBarItemActive(pathname.substring(1));
  }, [pathname]);

  return (
    <>
      <List
        sx={{
          padding: "0",
        }}
      >
        {navItems.map(({ text, icon, link }) => {
          const activeLink = `${link}`.substring("1");
          const activeLinkSplit = activeLink.split("/");
          const currentURL = pathname.split("/");
          return (
            <ListItem key={text} style={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  router.push(`${link}`);
                  setSideBarItemActive(activeLink);
                }}
                sx={{
                  // backgroundColor:
                  // currentURL[2] === activeLinkSplit[1]
                  //     ? theme.palette.primary[120]
                  //     : "transparent",
                  padding: "0 2rem",
                  // position: "relative",
                }}
              >
                {currentURL[2] === activeLinkSplit[1] && (
                  <SideBarSelect
                    style={{
                      position: "absolute",
                      left: "12%",
                    }}
                    // sx={{
                    //   position: "absolute",
                    //   // justifyContent: "center",
                    //   left: "40%",
                    //   zIndex: "1",
                    // }}
                  ></SideBarSelect>
                )}
                <ListItemIcon
                  sx={{
                    marginRight: ".5rem",
                    color: theme.palette.background.alt,
                    minWidth: "auto",
                    fontSize: "1.5rem",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={text}
                  sx={{
                    typography: "h5",
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
                  <SubItemInsight list={insightSubItems}></SubItemInsight>
                )}
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default SideBarItem;
