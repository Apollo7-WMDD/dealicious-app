import Link from "next/link";

const Page = ({ params }) => {
  const { restaurantOwnerId } = params;

  return (
    <>
      <div>Create a New Campaign</div>
      <Link href={`/campaigns/active/${restaurantOwnerId}`}>
        <button>Create</button>
      </Link>
      <button>Cancel</button>
    </>
  );
};

export default Page;
