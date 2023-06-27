const Page = ({ params }) => {
  const { restaurantId, superCustomerId } = params;

  return (
    <>
      <h1>
        New Customer page that shows all the Campaigns of a restaurant that a
        Super Customer shared his special link with you from that specific
        restaurant
      </h1>
      <h2>{restaurantId}</h2>
      <h2>{superCustomerId}</h2>
    </>
  );
};

export default Page;
