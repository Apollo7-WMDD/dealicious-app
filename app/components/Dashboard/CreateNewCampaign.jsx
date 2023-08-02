"use client";
import Link from "next/link";
import SingleButton from "../Button/SingleButton";
import { useStore as useStoreOwner } from "@/lib/context/user_context/store";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";


const CreateNewCampaign = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const router = useRouter();
  const { restaurantOwnerId } = useStoreOwner();
  const onClick = () => {
    router.push(`/dashboard/campaigns/createNew/${restaurantOwnerId}`);
  };
  return (
    <SingleButton
    // {isNonMobile === true ? (text="Create a Campaign") : (text="" )}
      text={isNonMobile ? "Create a Campaign" : ""}
      onClick={onClick}
      width={"350px"}
    ></SingleButton>
  );
};

export default CreateNewCampaign;
