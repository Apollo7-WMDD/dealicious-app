"use client";
import HomePage from "./components/LandingPage/HomePage";
const Page = () => {
  // const { data: session, status } = useSession();
  // const { setRestaurantOwner, restaurantOwnerId } = useStore();
  // const theme = useTheme();

  // console.log("session", session?.user?.id);

  // useEffect(() => {
  //   const getRestaurantOwnerId = async () => {
  //     if (status === "authenticated") {
  //       setRestaurantOwner(session?.user?.id);
  //     }
  //   };
  //   getRestaurantOwnerId();
  // }, [status, restaurantOwnerId]);

  return <HomePage />;

  // return (
  //   <main>
  //     <Home />
  //     {status === "loading" ? (
  //       <Loader />
  //     ) : session?.user?.id === undefined && !session ? (
  //       <>
  //         <Link href={`/login/owner`}>
  //           <Button
  //             variant="contained"
  //             sx={{
  //               backgroundColor: theme.palette.primary[80],
  //               marginTop: "20px",
  //               marginRight: "20px",
  //               ":hover": {
  //                 backgroundColor: "white",
  //                 color: theme.palette.primary[80],
  //               },
  //             }}
  //           >
  //             Sign Up as Restaurant Owner
  //           </Button>
  //         </Link>
  //         <Link href={`/login/superCustomer`}>
  //           <Button
  //             variant="contained"
  //             sx={{
  //               backgroundColor: theme.palette.primary[80],
  //               marginTop: "20px",
  //               marginRight: "20px",
  //               ":hover": {
  //                 backgroundColor: "white",
  //                 color: theme.palette.primary[80],
  //               },
  //             }}
  //           >
  //             Sign Up as Super Customer
  //           </Button>
  //         </Link>
  //         <Link href={`/register/owner`}>
  //           <Button
  //             variant="contained"
  //             sx={{
  //               backgroundColor: theme.palette.primary[80],
  //               marginTop: "20px",
  //               marginRight: "20px",
  //               ":hover": {
  //                 backgroundColor: "white",
  //                 color: theme.palette.primary[80],
  //               },
  //             }}
  //           >
  //             Sign Up!
  //           </Button>
  //         </Link>
  //       </>
  //     ) : (
  //       <Button
  //         onClick={signOut}
  //         variant="contained"
  //         sx={{
  //           backgroundColor: theme.palette.primary[80],
  //           marginTop: "20px",
  //           marginRight: "20px",
  //           ":hover": {
  //             backgroundColor: "white",
  //             color: theme.palette.primary[80],
  //           },
  //         }}
  //       >
  //         Sign Out
  //       </Button>
  //     )}
  //   </main>
  // );
};

export default Page;
