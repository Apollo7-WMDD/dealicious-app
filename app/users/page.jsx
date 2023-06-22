// import { useStore } from "../store";
import List from "../components/List";
// import InputText from "../components/InputText";
import FormUsers from "../components/FormUsers";

// featch all users from the database
const fetchUsers = async () => {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Something went wrong...");

  return await res.json();
};

const User = async () => {
  // IMPORT HOOK FROM STATE MANAGEMENT STORE
  // const filter = useStore((state) => state.filter);
  // const user = useStore((state) => state.user);
  // const setUser = useStore((state) => state.setUser);

  const allUsers = await fetchUsers();

  return (
    <div className="grid grid-cols-2 gap-16">
      <div>
        <h1 className="text-4xl mb-5">Showing Users</h1>
        {/* <InputText filter={filter} /> */}
        {/* <h5>{filter}</h5> */}
        <List userProp={allUsers} />
      </div>

      <div>
        <h1 className="text-4xl mb-5">Adding Users</h1>
        <FormUsers />
      </div>
    </div>
  );
};

export default User;
