import List from "../components/List";
import FormUsers from "../components/FormUsers";

// featch all users from the database
const fetchUsers = async () => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(`${serverUrl}/api/users`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Something went wrong...");

  return await res.json();
};

const User = async () => {
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
