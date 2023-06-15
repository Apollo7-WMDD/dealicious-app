"use client";
import { useEffect } from "react";
import { useStore } from "../store";
import List from "../components/List";
import InputText from "../components/InputText";

const User = () => {
  // IMPORT HOOK FROM STATE MANAGEMENT STORE
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const addNewUser = useStore((state) => state.addNewUser);
  const setAddNewUser = useStore((state) => state.setAddNewUser);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();
      setUser(data);
    };
    fetchUsers();
  }, []);

  // TODO: ADD USER TO THE DATABASE
  const handleSubmit = async function (e) {
    e.preventDefault();

    // get the form data
    const formData = {
      email: e.target.email.value,
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
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
    e.target.reset();
  };

  return (
    <>
      <h1 className="text-4xl mb-5">Adding/Showing Users</h1>
      <InputText filter={filter} />

      <div>
        <h1>{filter}</h1>
        <List userProp={user} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-5"
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-solid border-green-700 border-2 rounded-md"
        />
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          className="border-solid border-green-700 border-2 rounded-md"
        />
        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          className="border-solid border-green-700 border-2 rounded-md"
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          className="border-solid border-green-700 border-2 rounded-md"
        />
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
