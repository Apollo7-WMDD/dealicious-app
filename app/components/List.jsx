import { useStore } from "../store";

function List( {userProp} ) {
  const filter = useStore((state) => state.filter);
  const user = useStore((state) => state.user);
  console.log(user);
  return (
    <>
      {userProp.filter((e) => e.email.includes(filter)).map((e) => (
          <div key={e._id}>
            <h2 className="text-2xl text-red-700 m-5">{e.email}</h2>
          </div>
        ))}
    </>
  );
}

export default List;
