"use client";

// import next-auth hooks
import { useSession, signOut } from "next-auth/react";
import { useStore } from "@/lib/context/user_context/store";

// nextjs components
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import Home from "./components/LandingPage/Home";

//  loader
import Loader from "./components/Loader";
import { Button, useTheme } from "@mui/material";

const Page = () => {
  const { data: session, status } = useSession();
  const { setRestaurantOwner, restaurantOwnerId } = useStore();
  const theme = useTheme();

  console.log("This is the session", session);

  useEffect(() => {
    const getRestaurantOwnerId = async () => {
      if (status === "authenticated") {
        setRestaurantOwner(session.user.id);
      }
    };
    getRestaurantOwnerId();
  }, [status]);

  return (
    <main>
      <Home />
      {status === "loading" ? (
        <Loader />
      ) : status === "authenticated" ? (
        <div>
          <Link href={`/dashboard/campaigns/active/${session?.user.id}`}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary[80],
                marginTop: "20px",
                marginRight: "20px",
                ":hover": {
                  backgroundColor: "white",
                  color: theme.palette.primary[80],
                },
              }}
            >
              Dashboard
            </Button>
          </Link>
          <Link href={`/home/superCustomer`}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary[80],
                marginTop: "20px",
                marginRight: "20px",
                ":hover": {
                  backgroundColor: "white",
                  color: theme.palette.primary[80],
                },
              }}
            >
              Homepage - Restaurant - Super Customer
            </Button>
          </Link>
          <Button
            onClick={signOut}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary[80],
              marginTop: "20px",
              marginRight: "20px",
              ":hover": {
                backgroundColor: "white",
                color: theme.palette.primary[80],
              },
            }}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <>
          <Link href={`/login/owner`}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary[80],
                marginTop: "20px",
                marginRight: "20px",
                ":hover": {
                  backgroundColor: "white",
                  color: theme.palette.primary[80],
                },
              }}
            >
              Login
            </Button>
          </Link>
          <Link href={`/register`}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary[80],
                marginTop: "20px",
                marginRight: "20px",
                ":hover": {
                  backgroundColor: "white",
                  color: theme.palette.primary[80],
                },
              }}
            >
              Sign Up!
            </Button>
          </Link>
        </>
      )}
    </main>
  );
};

export default Page;
