// NEXTjs imports
import Link from "next/link";

//  component imports
import Navbar from "@/app/components/LandingPage/Navbar";
import Footer from "@/app/components/Footer";

const fetchRestaurant = async (restaurantId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/restaurant/${restaurantId}`
    // {
    //   cache: "no-store",
    // }
  );

  if (!res.ok) throw new Error(res.text());

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { restaurantId } = params;
  const results = await fetchRestaurant(restaurantId);
  const { name, address, phone, logo, menu } = results;

  return (
    <>
      <Navbar />
      <h1>Restaurant Home Page for Super Customers to Login or Sign Up</h1>
      <div>
        <>
          <Link
            href={`/login`}
            className="mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
          >
            <button>Login</button>
          </Link>
          <Link
            href={`/register`}
            className="mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
          >
            <button>Sign Up!</button>
          </Link>
        </>
        <h1>Name: {name}</h1>
        <h1>
          Address:{" "}
          {address.street +
            ", " +
            address.city +
            ", " +
            address.province +
            " " +
            address.postalCode +
            ", " +
            address.country}
        </h1>
        <h1>Phone: {phone}</h1>
        <h1>Logo: {logo}</h1>
        <h1>Menu: {menu}</h1>

        <Footer />
      </div>
    </>
  );
};

export default Page;
