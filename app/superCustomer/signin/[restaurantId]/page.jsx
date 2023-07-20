"use client";
import SCRestaurantCard from "@/app/components/SuperCustomer/SCRestaurantCard";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/context/user_context/store";
import { fetchRestaurantCard } from "@/lib/fetching/profile/data";
import { Box } from "@mui/material";
import LoginComponent from "@/app/components/Login/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const { status } = useSession();

    const restaurantId = router.isReady ? router.query.restaurantId:null;
    // const  restaurantId  = router.query
    console.log(router.query);

    // useEffect(() => {
    //     if (status === "authenticated") {
    //         router.push(`/home/superCustomer`);
    //     }
    // }, [status]);

    // const { restaurantId } = useStore();
    // const obj = { restaurantId: '649cb095ea1c8363ed630fe5' };
    // const { restaurantId } = obj;
    const [restaurantData, setRestaurantData] = useState(null);

    useEffect(() => {
        const getRestaurantData = async () => {
            const data = await fetchRestaurantCard(restaurantId);
            const { restaurantInfo } = data;
            setRestaurantData(restaurantInfo);
        };
        getRestaurantData();
    }, [restaurantId]);

    console.log(restaurantId)
    console.log(restaurantData)

    return (
        <>
            <Box sx={{ 
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "start",
                gap: 7,
                m: 5,
            }}>
                <SCRestaurantCard {...restaurantData} />
                <LoginComponent/>
            </Box>
        </>
    );
};

export default Page;
