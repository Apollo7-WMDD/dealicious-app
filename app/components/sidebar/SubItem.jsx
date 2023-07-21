import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useStore } from "../../../lib/context/sidebar_context/store";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// import {useLocation} from 'react-router-dom';

function SubItem({ list }) {
  const { sideBarSubItemActive, setSideBarSubItemActive, sideBarItemActive } =
    useStore();
  const router = useRouter();  
  const pathname = usePathname();
  const [hash, setHash] = useState(window.location.hash.split("#")[1]);

  
  useEffect(() => {
    setHash(window.location.hash.split("#")[1]);
  },[])
  
  console.log(hash);

  useEffect(() => {
    setSideBarSubItemActive(pathname.substring(1));
  }, [pathname]);
  const theme = useTheme();
  return (
    <>
      <List sx={{ display: "block", margin: "0 4rem 0", padding: "0" }}>
        {list.map(({ text, link }) => {
          const activeLink = `${link}`.substring("1");
          const activeLinkSplit = activeLink.split("/");
          // console.log(activeLinkSplit[2]);
          console.log(activeLinkSplit[4].split("#")[1]);

          const currentURL = pathname.split("#");
          console.log(pathname);
          console.log(currentURL);

          return (
            <ListItem key={text} sx={{ padding: "0.25rem 0 0 0" }}>
              <ListItemButton
                onClick={() => {
                  router.push(`${link}`);
                  // router.push(`${link}`.substring(1));
                  setSideBarSubItemActive(activeLink);
                  setHash(
                    hash == 'ongoing' ? 'upcoming' : 'ongoing'
                     )
                }}
                sx={{
                

                  padding: "0",
                }}
              >
                <ListItemText
                  disableTypography
                  primary={text}
                  sx={{
                    margin: 0,
                    typography: "h6",
                    color: theme.palette.neutral[40],
                    borderBottom:
                    // currentURL[3] == text.toLowerCase()
                    // currentURL[3] == activeLinkSplit[2] &&
                    // currentURL[1] == activeLinkSplit[4].split("#")[1]
                    hash == activeLinkSplit[4].split("#")[1]
                      ? `.15rem solid ${theme.palette.primary[80]}`
                      : "none",
                  }}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default SubItem;
