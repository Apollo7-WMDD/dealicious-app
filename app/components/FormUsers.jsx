"use client";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../theme.js";
import { useStore } from "../../lib/context/sidebar_context/store.js";

// ADD USER TO THE DATABASE
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

const FormUsers = () => {
  const { mode } = useStore();
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
  return (
    <form onSubmit={handleSubmit} className="flex items-center flex-col gap-5">
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
        style={{ backgroundColor: theme.palette.secondary[60] }}
        type="submit"
        className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default FormUsers;
