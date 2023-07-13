import Link from "next/link";

const Page = async () => {
  return (
    <>
      <h1>Insights of every Campaign (as a list)</h1>
      <Link href={`/`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Single Campaign (example)
        </button>
      </Link>
      <Link href={`/`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Overview
        </button>
      </Link>
      <Link href={`/`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Customers
        </button>
      </Link>
    </>
  );
};

export default Page;
