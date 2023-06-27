import Link from "next/link";

const Page = ({ params }) => {
  const { superCustomerId } = params;
  const { restaurantId } = params;

  return (
    <>
      <h1>Restaurants List from the Super Customer</h1>
      <h2>{superCustomerId}</h2>
      <Link
        href={`superCustomer/restaurants/${superCustomerId}/${restaurantId}`}
      >
        <button>Click individual Restaurant Card</button>
      </Link>
      <Link href={`superCustomer/profile/${superCustomerId}`}>
        <button>Profile Super Customer</button>
      </Link>
    </>
  );
};

export default Page;
