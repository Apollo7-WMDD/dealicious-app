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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    // console.log(newName);
    // console.log(newEmail);
    
    
    console.log("addNewUser"+addNewUser);


    console.log("submitting form..." + e.target.email.value);
    console.log("submitting form..." + e.target.username.value);
    console.log("submitting form..."+ e.target.phone.value) ;
    // get the form data
    const formData = {
      name: e.target.username.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
    };
console.log("formData= ")
    console.log(formData);

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
      {/* {user.map((user) => (
        <div key={user._id}>
          <h2 className="text-2xl text-red-700 m-5">{user._id}</h2>
        </div>
      ))} */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-5"
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="text-red-700"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            className="text-red-700"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input className="text-red-700" type="text" name="phone" id="phone" />
        </div>
        <button
          type="submit"
          className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
        >
          Submit
        </button>
      </form>
      <h1 className="text-4xl">TESTING DEV</h1>
      <InputText filter={filter} />

      <div>
        <h1>{filter}</h1>

        <List userProp={user} />
      </div>
    </>
  );
};

export default User;
