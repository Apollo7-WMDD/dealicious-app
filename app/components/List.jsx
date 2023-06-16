import { useStore } from "../store";

function List({ userProp, campaigns = [] }) {
  const filter = useStore((state) => state.filter);

  return (
    <>
      {/* User List */}
      {userProp && userProp
        .filter((e) => e.email && e.email.includes(filter))
        .map((e) => (
          <div key={e._id}>
            <h2 className="text-2xl text-red-700 m-5">{e.email}</h2>
          </div>
        ))}

      {/* Campaign List */}
      {campaigns
        .filter(campaign => campaign.name.toLowerCase().includes(filter.toLowerCase()))
        .map((campaign, index) => (
          <div key={index}>
            <h2 className="text-2xl m-5">{campaign.name}</h2>
            <p className="m-5">{campaign.description}</p>
          </div>
        ))}
    </>
  );
}

export default List;
