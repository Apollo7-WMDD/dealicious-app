import Link from "next/link";

const Page = async () => {
  return (
    <div>
      <h1>Single Campaign Data</h1>
      <Link href={`/`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Campaigns
        </button>
      </Link>
    </div>
  );
};

export default Page;
