import Link from "next/link";

const Page = ({ params }) => {
  const { restaurantOwnerId } = params;

  return (
    <>
      <div>Create a New Campaign</div>
      <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create
        </button>
      </Link>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Cancel
      </button>
    </>
  );
};

export default Page;
