"use client";
import { useState, useEffect } from "react";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();
      setUsers(data);
      console.log(data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // get the form data
    const formData = {
      email: e.target.email.value,
      username: e.target.username.value,
      phone: e.target.phone.value,
    };

    // send the form data to the server
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.text();
        throw new Error(data);
      } else {
        const data = await res.json();
        console.log("Success! ", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-4xl mb-4">Adding Users</h1>
      <h2 className="text-3xl">List of User&apos;s email:</h2>
      {users.map((user) => (
        <div key={user._id}>
          <h2 className="text-2xl text-red-700 m-5">{user._id}</h2>
        </div>
      ))}
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-5"
      >
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" id="phone" />
        </div>
        <button
          type="submit"
          className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default User;
