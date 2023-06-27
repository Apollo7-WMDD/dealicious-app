import Link from "next/link";

const Page = () => {
  // hardcode superCustomerId for now until we have a login page
  const superCustomerId = "vsvererv223r2244f";
  return (
    <>
      <h1>Restaurant Home Page for Super Customers to Login or Sign Up</h1>
      <Link href={`superCustomer/restaurants/${superCustomerId}`}>
        <button>After Login...</button>
      </Link>
    </>
  );
};

export default Page;
