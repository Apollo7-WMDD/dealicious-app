import Link from "next/link";

const Page = ({ params }) => {
  const { superCustomerId } = params;
  return (
    <>
      <h1>Profile of the Super Customer</h1>
      <h2>{superCustomerId}</h2>
      <button>Save Changes</button>
      <Link href={`superCustomer/restaurants/${superCustomerId}`}>
        <button>Cancel</button>
      </Link>
    </>
  );
};

export default Page;
