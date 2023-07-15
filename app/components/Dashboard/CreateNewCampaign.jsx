"use client";
import Link from "next/link";
import SingleButton from "../Button/SingleButton";
import { useStore as useStoreOwner } from "@/lib/context/user_context/store";
import { useRouter } from "next/navigation";

const CreateNewCampaign = () => {
  const router = useRouter();
  const { restaurantOwnerId } = useStoreOwner();
  const onClick = () => {router.push(`/dashboard/campaigns/createNew/${restaurantOwnerId}`)}
  return (
    <SingleButton text={"Create new campaign"} onClick={onClick}
    > </SingleButton>
    //  <Link href={`/dashboard/campaigns/createNew/${restaurantOwnerId}`}>
    //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
    //       Create campaign
    //     </button>
    //   </Link>
  );
};

export default CreateNewCampaign;
