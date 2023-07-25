"use client";
import SCRestaurantCard from "@/app/components/SuperCustomer/SCRestaurantCard";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/context/user_context/store";
import { fetchRestaurantCard } from "@/lib/fetching/profile/data";
import { Box } from "@mui/material";
import LoginComponent from "@/app/components/Login/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = (params) => {
    const router = useRouter();
    const { status } = useSession();
    const { restaurantId } = params;

    useEffect(() => {
        if (status === "authenticated") {
            router.push(`/home/superCustomer`);
        }
    }, [status]);

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
