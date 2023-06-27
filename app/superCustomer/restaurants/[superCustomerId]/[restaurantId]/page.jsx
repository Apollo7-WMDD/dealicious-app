const Page = ({ params }) => {
  const { superCustomerId, restaurantId } = params;
  return (
    <>
      <h1>
        Restaurant Single Page for the Super Customer when click on the Card
      </h1>
      <h2>{superCustomerId}</h2>
      <h2>{restaurantId}</h2>
    </>
  );
};

export default Page;
