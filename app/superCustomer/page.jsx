"use client";
import React, { useState } from "react";

function SuperCustomer() {
  const [birthdate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [url, setURL] = useState("");
  const [restaurantid, setRestaurantid] = useState("");
  // function to update state of birthdate with
  // value enter by user in form
  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };
  // function to update state of phone with value
  // enter by user in form
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  // function to update state of URL with value
  // enter by user in form
  const handleURLChange = (e) => {
    setURL(e.target.value);
  };
  // function to update state of RestaurantId with
  // value enter by user in form
  const handleRestaurantChange = (e) => {
    setRestaurantid(e.target.value);
  };
  const handleSubmit = async function (e) {
    e.preventDefault();
    const formData = {
      birthdate: birthdate,
      phone: phone,
      restaurantId: restaurantid,
      url: url,
    };
    console.log(formData);
    try {
      const res = await fetch("/api/superCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      if (!res.ok) {
        const data = await res.text();
        console.log(data);
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
    <div className="App">
      <header className="App-header">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h2> Super Customer </h2>
          <h3> Entry Form </h3>
          <label>Birthdate</label>
          <br />
          <input
            className="text-black"
            type="date"
            value={birthdate}
            required
            name="birthDate"
            id="birthDate"
            onChange={(e) => {
              handleBirthDateChange(e);
            }}
          />
          <br />
          <label>Phone</label>
          <br />
          <input
            className="text-black"
            type="number"
            value={phone}
            name="phone"
            id="phone"
            required
            onChange={(e) => {
              handlePhoneChange(e);
            }}
          />
          <br />
          <label>URL</label>
          <br />
          <input
            className="text-black"
            type="text"
            value={url}
            required
            onChange={(e) => {
              handleURLChange(e);
            }}
          />
          <br />
          <label>Restaurant Id:</label>
          <br />
          <input
            className="text-black"
            type="text"
            value={restaurantid}
            required
            onChange={(e) => {
              handleRestaurantChange(e);
            }}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}
export default SuperCustomer;
