"use client";
import Link from "next/link";
import SingleButton from "../Button/SingleButton";
import { useStore as useStoreOwner } from "@/lib/context/user_context/store";
import { useRouter } from "next/navigation";

const CreateNewCampaign = () => {
  const router = useRouter();
  const { restaurantOwnerId } = useStoreOwner();
  const onClick = () => {
    router.push(`/dashboard/campaigns/createNew/${restaurantOwnerId}`);
  };
  return (
    <SingleButton
      text={"Create new campaign"}
      onClick={onClick}
      width={"350px"}
    ></SingleButton>
  );
};

export default CreateNewCampaign;
