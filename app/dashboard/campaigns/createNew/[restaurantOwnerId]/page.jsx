import Link from "next/link";

const Page = ({ params }) => {
  const { restaurantOwnerId } = params;

  return (
    <>
      <div>Create a New Campaign</div>
      <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Create
        </button>
      </Link>
      <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Cancel
        </button>
      </Link>
    </>
  );
};

export default Page;
