"use client";
import { useState, useEffect } from "react";
import InputText from "../components/Profile/InputText";
import Form from "../components/Profile/Form";
import SubHeader from "../components/Profile/SubHeader";
import InputDropdown from "../components/Profile/InputDropdown";
import InputButton from "../components/Profile/InputButton";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    manager: "",
    email: "",
    phone: "",
    website: "",
    category: "",
    address: {
      street: "",
      postalCode: "",
      city: "",
      province: "",
      country: "",
    },
    businessHours: {
      monday: { open: "", close: "" },
      tuesday: { open: "", close: "" },
      wednesday: { open: "", close: "" },
      thursday: { open: "", close: "" },
      friday: { open: "", close: "" },
      saturday: { open: "", close: "" },
      sunday: { open: "", close: "" },
    },
    menu: "",
    logo: "",
    qrCode: "",
  });


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.name]: e.target.value },
    });
  };

  const handleBusinessHoursChange = (day, field, value) => {
    setFormData({
      ...formData,
      businessHours: {
        ...formData.businessHours,
        [day]: { ...formData.businessHours[day], [field]: value },
      },
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
          phone: "",
          website: "",
          address: {
            street: "",
            postalCode: "",
            city: "",
            province: "",
            country: "",
          },
          businessHours: {
            monday: { open: "", close: "" },
            tuesday: { open: "", close: "" },
            wednesday: { open: "", close: "" },
            thursday: { open: "", close: "" },
            friday: { open: "", close: "" },
            saturday: { open: "", close: "" },
            sunday: { open: "", close: "" },
          },
          menu: "",
          logo: "",
          qrCode: "",
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
    <div className="">
      <div>
        <h2 className="text-4xl mb-5 text-center">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="">
            <Form>
              <SubHeader>Business Information</SubHeader>
                <InputText
                  label="Business Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  name="name"
                  id="name"
                  placeholder="Business Name"
                />
                <InputText
                  label="Business Category"
                  value={formData.category}
                  onChange={handleInputChange}
                  name="category"
                  id="category"
                  placeholder="Ex:Japanese,Indian,Brunch"
                />
                <InputText
                  label="Manager"
                  name="manager"
                  id="manager"
                  value={formData.manager}
                  onChange={handleInputChange}
                  placeholder="Manager"
                />
                <InputText
                  label="Website"
                  name="website"
                  id="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="Website"
                />
                <InputText
                  label="Business Email Address"
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Business Email Address"
                />
                <InputText
                  label="Postal Code"
                  name="postalCode"
                  id="postalCode"
                  value={formData.address.postalCode}
                  onChange={handleAddressChange}
                  placeholder="Postal Code"
                />
                <InputText
                  label="Business Phone Number"
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Business Phone Number"
                />
                <InputText
                  label="Street Address"
                  name="street"
                  id="street"
                  value={formData.address.street}
                  onChange={handleAddressChange}
                  placeholder="Street Address"
                />
                <InputText
                  label="City"
                  name="city"
                  id="city"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                />
                <InputText
                  label="Province/State"
                  name="province"
                  id="province"
                  value={formData.address.province}
                  onChange={handleAddressChange}
                  placeholder="Province/State"
                />
                <InputDropdown
                  label="Country"
                  value={formData.address.country}
                  onChange={handleAddressChange}
                  name="country"
                  id="country"
                  placeholder="Country"
                  options={[
                    { value: 'Canada', label: 'Canada' },
                    { value: 'USA', label: 'USA' },
                  ]}
                />

            </Form>
            <Form>
              <SubHeader>Business Hours</SubHeader>
              <label htmlFor="monday">Monday</label>
              <label htmlFor="mondayopenclose">Closed</label>
              <input
                type="checkbox"
                name="monday"
                id="monday"
                onChange={(e) => handleMondayClosedChange(e.target.checked)}
                checked={!formData.businessHours.monday.open}
              />

              {/* <label htmlFor="monday">Open at:</label> */}
              <select
                name="monday"
                id="monday"
                value={formData.businessHours.monday.open}
                onChange={(e) => handleBusinessHoursChange("monday", "open", e.target.value)}
                disabled={!formData.businessHours.monday.open}
              >
                <option value="">Open at</option>
                <option value="07:00">07:00 AM</option>
                <option value="08:00">08:00 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                {/* ... more options */}
              </select>

              {/* <label htmlFor="mondayClose">Close at:</label> */}
              <select
                name="close"
                id="mondayClose"
                value={formData.businessHours.monday.close}
                onChange={(e) => handleBusinessHoursChange("monday", "close", e.target.value)}
                disabled={!formData.businessHours.monday.open}
                placeholder="Close at"
              >
                <option value="">Close at</option>
                <option value="17:00">05:00 PM</option>
                <option value="18:00">06:00 PM</option>
                <option value="19:00">07:00 PM</option>
              </select>
            </Form>
          
          
          <label htmlFor="menu">Menu</label>
          <input
            type="text"
            name="menu"
            id="menu"
            value={formData.menu}
            onChange={handleInputChange}
          />
          
          <label htmlFor="logo">Logo</label>
          <input
            type="file"
            name="logo"
            id="logo"
            onChange={handleInputChange}
          />

          <label htmlFor="qrCode">QR Code</label>
          <input
            type="file"
            name="qrCode"
            id="qrCode"
            onChange={handleInputChange}
          />

          <InputButton
            onFirstButtonClick={() => console.log('Cancel')}
            onSecondButtonClick={() => console.log('Save profile')}
            firstButtonText="Cancel"
            secondButtonText="Save Profile"
          />
          </form>
      </div>
    </div>
  );
};

export default Restaurant;

