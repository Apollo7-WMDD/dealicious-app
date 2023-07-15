"use client";
import Header from "../../../components/Header/Header";
import SCCard from "../../../components/Card/SCCard";
import SCHeader from "../../../components/Header/SCHeader"

const fetchRestaurants = async (superCustomerId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/superCustomer/restaurants/${superCustomerId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Something went wrong...");

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { superCustomerId } = params;
  const data = await fetchRestaurants(superCustomerId);
  console.log(data[0].name)
  const cards = data.map((item, index) => <SCCard key={index} props={item} />);

  return (
    <div>
      <SCHeader />
      <Header props={"My Restaurants"} />
      {cards}
    </div>
  );
};

export default Page;