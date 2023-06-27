const Page = ({ params }) => {
  const { restaurantOwnerId } = params;

  return (
    <>
      <h1>This is the Insights for Costumers</h1>
      <h2>{restaurantOwnerId}</h2>
    </>
  );
};

export default Page;
