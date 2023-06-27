import Link from "next/link";

const Page = ({ params }) => {
  const { restaurantOwnerId } = params;

  return (
    <>
      <div>Profile of the Restaurant Owner</div>
      <h1>{restaurantOwnerId}</h1>
      <Link href={`/profile/edit/${restaurantOwnerId}`}>
        <button>Edit Profile</button>
      </Link>
      <Link href={`/campaigns/active/${restaurantOwnerId}`}>
        <button>Back to DashBoard</button>
      </Link>
    </>
  );
};

export default Page;
