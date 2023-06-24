"use client";
import { useState, useEffect } from "react";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    manager: "",
    email: "",
    address: "",
    phone: "",
    website: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Server error: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setRestaurants((prevRestaurants) => [...prevRestaurants, data]);
        setFormData({
          userId: "",
          name: "",
          manager: "",
          email: "",
          address: "",
          phone: "",
          website: "",
        });
      })
      .catch((error) => console.error("Error creating restaurant:", error));
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await fetch("/api/restaurant", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-16">
      <div>
        <h1 className="text-4xl mb-5">Restaurants</h1>
        {restaurants.map((restaurant) => (
          <div key={restaurant._id}>
            <h2>{restaurant.name}</h2>
            <p>Manager: {restaurant.manager}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-4xl mb-5 text-center">Add a Restaurant</h2>
        <form onSubmit={handleSubmit} className="flex items-center flex-col gap-2">
          <label htmlFor="userId">User ID</label>
          <input
            className="border-solid border-green-700 border-2 rounded-md"
            type="text"
            name="userId"
            id="userId"
            value={formData.userId}
            onChange={handleInputChange}
          />
          <label htmlFor="name">Name</label>
          <input
            className="border-solid border-green-700 border-2 rounded-md"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <label htmlFor="manager">Manager</label>
          <input
            className="border-solid border-green-700 border-2 rounded-md"
            type="text"
            name="manager"
            id="manager"
            value={formData.manager}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email</label>
          <input
            className="border-solid border-green-700 border-2 rounded-md"
            type="            email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label htmlFor="phone">Phone</label>
          <input
            className="border-solid border-green-700 border-2 rounded-md"
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <label htmlFor="address">Address</label>
          <input
            className="border-solid border-green-700 border-2 rounded-md"
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <label htmlFor="website">Website</label>
          <input
            className="border-solid border-green-700 border-2 rounded-md"
            type="text"
            name="website"
            id="website"
            value={formData.website}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Restaurant;

