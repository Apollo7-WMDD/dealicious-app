"use client";
import { useState, useEffect } from "react";
import { useStore } from "../store";

const User = () => {
  // const [users, setUsers] = useState([]);

  // IMPORT HOOK FROM STATE MANAGEMENT STORE
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setFilter);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUser(data);
      
    };
    fetchUsers();
  }, []);

  return (
    <>
      <h1 className="text-4xl">TESTING DEV</h1>
{console.log(user)}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div>
        {user.filter((email) => email.toLowerCase().includes(filter.toLowerCase())).map((user) => (
          <div key={user._id}>
            <h2 className="text-2xl text-red-700 m-5">{user.email}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default User;
