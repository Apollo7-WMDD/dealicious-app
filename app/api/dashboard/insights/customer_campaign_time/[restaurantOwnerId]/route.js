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
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    // Retrieve all the campaigns for the restaurant and get the name and campaignId
    const campaignIds = await Campaign.find(
      { restaurantId: restaurant._id },
      { _id: 1 }
    ).lean();

    const campaignIdsList = campaignIds.map((campaign) => campaign._id);

    // Generate the usage data for each campaign
    const campaignsDataPromises = campaignIdsList.map(async (campaignId) => {
      const campaign = await Campaign.findById(campaignId, { name: 1 }).lean();
      const usage = await generateUsageData(campaignId);
      return {
        campaignId,
        campaignName: campaign.name,
        usage,
      };
    });

    const campaignsData = await Promise.all(campaignsDataPromises);

    return new NextResponse(JSON.stringify({ data: campaignsData }), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

// Helper function to generate usage data for a campaign
async function generateUsageData(campaignId) {
  const usage = {
    day: await generateData(7),
    week: await generateData(6),
    month: await generateData(7),
  };
  return usage;
}

//  function to generate  usage data
function generateData(count) {
  const today = new Date();
  const data = [];
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = formatDate(date);
    const value = Math.floor(Math.random() * 20);
    data.push({ x: formattedDate, y: value });
  }
  return data;
}

//  function to format date as "YYYY-MM-DD"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}