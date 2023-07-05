const fetchCustomerInsights = async (restaurantId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/dashboard/insights/customers/${restaurantId}`
    // {
    //   cache: "no-store",
    // }
  );

  if (!res.ok) throw new Error(res.text());

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { restaurantOwnerId, restaurantId } = params;
  const results = await fetchCustomerInsights(restaurantId);
  const { spending, superCustomers, points, redeemedPoints } = results;

  return (
    <>
      <div className="block m-4">
        <h1 className="text-2xl font-bold">Spending</h1>
        {spending.map((customer) => (
          <div key={customer._id}>
            <p>{customer.name}</p>
            <p>{customer.billamount}</p>
            <p>{customer.isSuperCustomer.toString()}</p>
          </div>
        ))}
      </div>
      <div className="block m-4">
        <h1 className="text-2xl font-bold">SuperCustomers - Birthdates</h1>
        {superCustomers.map((customer) => (
          <div key={customer._id}>
            <p>{customer.birthDate}</p>
          </div>
        ))}
      </div>
      <div className="block m-4">
        <h1 className="text-2xl font-bold">Points</h1>
        {points.map((customer) => (
          <div key={customer._id}>
            <p>{customer.points}</p>
          </div>
        ))}
      </div>
      <div className="block m-4">
        {redeemedPoints.map((customer) => (
          <div key={customer._id}>
            <p>{customer.points}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
