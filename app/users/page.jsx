"use client";
import { useState, useEffect } from "react";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
      console.log(data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <h1 className="text-4xl">TESTING DEV</h1>

      {users.map((user) => (
        <div key={user._id}>
          <h2 className="text-2xl text-red-700 m-5">{user.name}</h2>
        </div>
      ))}
    </>
  );
};

export default User;
