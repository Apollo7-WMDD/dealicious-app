"use client";

// NEXTjs imports
import Link from "next/link";

// session imports
import { useSession, signOut } from "next-auth/react";

//  component imports
import Navbar from "@/app/components/LandingPage/Navbar";
import Footer from "@/app/components/Footer";
import Loader from "@/app/components/Loader";

// material-ui imports
import { Button } from "@mui/material";

// theme
import { useTheme } from "@mui/material";

const Page = () => {
  const { data: session, status } = useSession();
  const theme = useTheme();

  console.log(session);

  return (
    <>
      <Navbar />
      <h1>Restaurant Home Page for Super Customers to Login or Sign Up</h1>
      <div>
        <>
          {status === "loading" ? (
            <Loader />
          ) : status === "authenticated" ? (
            <>
              <Link href={`/superCustomer/restaurants/${session?.user.id}`}>
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
                  Dashboard SC
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
            </>
          ) : (
            <>
              <Link href={`/login/superCustomer`}>
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
              <Link href={`/register/superCustomer`}>
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
        </>
        <Footer />
      </div>
    </>
  );
};

export default Page;
