import Link from "next/link";

const Page = async ({ params }) => {
  return (
    <>
      <div className="block m-4">
        <h1 className="text-2xl font-bold">Insights - Customers</h1>
        <Link href={`/`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
            Insights - Campaigns
          </button>
        </Link>
        <Link href={`/`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
            Insights - Overview
          </button>
        </Link>
      </div>
    </>
  );
};

export default Page;
