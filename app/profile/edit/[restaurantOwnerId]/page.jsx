import Link from "next/link";

const Page = ({ params }) => {
  const { restaurantOwnerId } = params;

  return (
    <>
      <h1>Edit Profile Page to Add or Edit Restaurant Info</h1>
      <h1>{restaurantOwnerId}</h1>
      <Link href={`/profile/${restaurantOwnerId}`}>
        <button>Save or Add Profile</button>
      </Link>
    </>
  );
};

export default Page;
