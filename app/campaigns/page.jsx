// pages/Campaigns.js
"use client";
import { useState, useEffect } from 'react';
import List from '../components/List';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collecting data from form
    const campaignData = {
      name: e.target.elements.name.value,
      description: e.target.elements.description.value,
      type: e.target.elements.type.value.split(","),
      offer: e.target.elements.offer.value,
      allowSuperCustomer: e.target.elements.allowSuperCustomer.checked,
      allowNewCustomer: e.target.elements.allowNewCustomer.checked,
      expiredByNumber: e.target.elements.expiredByNumber.checked,
      availableCodes: e.target.elements.availableCodes.value,
      startDate: e.target.elements.startDate.value,
      endDate: e.target.elements.endDate.value,
      media: e.target.elements.media.value.split(","),
    };

    // Posting data to server
    fetch('/api/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campaignData),
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`Server error: ${text}`);
        });
      }
      return response.json();
    })
    .then(data => {
      setCampaigns(prevCampaigns => [...prevCampaigns, data]);
    })
    .catch(error => console.error('Error creating campaign:', error));    
  };

  // Fetching campaigns 
  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await fetch("/api/campaigns", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();
      setCampaigns(data);
    };
    fetchCampaigns();
  }, []);

  return (
    <div>
      <h1>Campaigns</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Campaign name" />
        <input name="description" type="text" placeholder="Campaign description" />
        <input name="type" type="text" placeholder="Type (comma separated)" />
        <input name="offer" type="text" placeholder="Offer" />
        <input name="availableCodes" type="number" placeholder="Available Codes" />
        <input name="startDate" type="date" />
        <input name="endDate" type="date" />
        <input name="media" type="text" placeholder="Media URLs (comma separated)" />
        <label>
          <input name="allowSuperCustomer" type="checkbox" /> Allow Super Customer
        </label>
        <label>
          <input name="allowNewCustomer" type="checkbox" /> Allow New Customer
        </label>
        <label>
          <input name="expiredByNumber" type="checkbox" /> Expired by Number
        </label>
        <button type="submit">Create Campaign</button>
      </form>


      <List campaigns={campaigns} filter={filter} />
    </div>
  );
};

export default Campaigns;
