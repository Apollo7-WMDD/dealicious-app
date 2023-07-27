import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Campaign from "@/models/campaign";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwner = url.pathname.split("/")[5];

  try {
    await connect();

    // Find restaurantId from the restaurant collection
    const restaurant = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    ).lean();

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ data: [] }), { status: 200 });
    }

    // Retrieve all the campaigns for the restaurant and get the name and campaignId
    const campaignIds = await Campaign.find(
      { restaurantId: restaurant._id },
      { _id: 1 }
    ).lean();

    const campaignIdsList = campaignIds.map((campaign) => campaign._id);

    // Generate the usage data for each campaign
    const campaignsDataPromises = campaignIdsList.map(async (campaignId) => {
      try {
        const campaign = await Campaign.findById(campaignId, {
          name: 1,
        }).lean();
        const usage = generateUsageData(campaignId);

        return {
          campaignId,
          campaignName: campaign.name,
          usage,
        };
      } catch (error) {
        console.error(
          `Error fetching campaign data for campaignId ${campaignId}:`,
          error
        );
        return null;
      }
    });

    const campaignsData = await Promise.all(campaignsDataPromises);

    // Filter out any null values
    const filteredCampaignsData = campaignsData.filter((data) => data !== null);

    return new NextResponse(JSON.stringify({ data: filteredCampaignsData }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error fetching data:", err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

// Helper function to generate usage data for a campaign
function generateUsageData() {
  const usage = {
    day: generateData(30, 20),
    week: generateData(12, 140),
    month: generateData(6, 400),
  };
  return usage;
}

// function to generate usage data
function generateData(count, amt) {
  const today = new Date();
  const data = [];
  let prevValue = 35;
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = formatDate(date);
    const value = prevValue + Math.floor(Math.random() * amt);
    prevValue = value + Math.floor(Math.random() * 100) - 50;
    data.push({ x: formattedDate, y: value });
  }
  return data;
}

// function to format date as "YYYY-MM-DD"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
