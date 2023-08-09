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

    const campaignsCount = await Campaign.aggregate([
      {
        $match: { restaurantId: restaurant._id },
      },

      {
        $lookup: {
          from: "spendings",
          localField: "_id",
          foreignField: "campaignId",
          as: "spendings",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          spendingsCount: { $size: "$spendings" },
          spendingsDates: "$spendings.dateRedeemed",
        },
      },
    ]);

    const responseCount = {
      campaigns: campaignsCount || [],
    };

    // // Retrieve all the campaigns for the restaurant and get the name and campaignId
    // const campaignIds = await Campaign.find(
    //   { restaurantId: restaurant._id },
    //   { _id: 1 },
    // ).lean();

    // const campaignIdsList = campaignIds.map((campaign) => campaign._id);

    // Generate the usage data for each campaign
    const campaignsDataPromises = campaignsCount.map(async (campaign) => {
      try {
        const usage = generateUsageData(campaign);
        // const campaign = await Campaign.findById(campaignId, {
        //   name: 1,
        //   startDate: 1,
        //   endDate :1,
        // }).lean();

        return {
          // campaignId,
          campaignName: campaign.name,
          campaignStartDate: campaign.startDate,
          campaignEndDate: campaign.endDate,
          spendingsCount: campaign.spendingsCount,
          spendingsDates: campaign.spendingsDates,
          usage,
        };
      } catch (error) {
        console.error(
          `Error fetching campaign data for campaignId ${campaign}:`,
          error
        );
        return null;
      }
    });

    const campaignsData = await Promise.all(campaignsDataPromises);

    // Filter out any null values
    const filteredCampaignsData = campaignsData.filter((data) => data !== null);

    const sortedCampaignsData = filteredCampaignsData.sort((a, b) => {
      return b.spendingsCount - a.spendingsCount;
    });

    return new NextResponse(JSON.stringify({ data: sortedCampaignsData }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error fetching data:", err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

// Helper function to generate usage data for a campaign
function generateUsageData(x) {
  const usage = {
    day: generateDataDay(30, x.spendingsDates),
    week: generateDataWeek(12, x.spendingsDates),
    month: generateDataMonth(6, x.spendingsDates),
  };
  return usage;
}

// function to generate usage data by day
function generateDataDay(count, spendingsDates) {
  const today = new Date();
  const data = [];

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = formatDate(date);
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - 6);
    const endDate = new Date(date);
    endDate.setMonth(date.getMonth() - 1);
    const matchingSpendings = spendingsDates.filter(
      (spendingDate) => formatDate(spendingDate) === formattedDate
    );

    const value = matchingSpendings.length;
    data.push({ x: formattedDate, y: value });
  }
  return data;
}

// function to generate usage data by week
function generateDataWeek(count, spendingsDates) {
  const today = new Date();
  const data = [];

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i * 7);
    const formattedDate = formatDate(date);
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - 6);
    const formattedStartDate = formatDate(startDate);

    const endDate = new Date(date);
    endDate.setDate(date.getDate());
    const formattedEndDate = formatDate(endDate);

    const matchingSpendings = spendingsDates.filter(
      // (spendingDate) => formatDate(spendingDate) === formattedDate
      (spendingDate) =>
        formatDate(spendingDate) >= formattedStartDate &&
        formatDate(spendingDate) <= formattedEndDate
    );
    const value = matchingSpendings.length;
    data.push({ x: formattedStartDate, y: value });
  }
  return data;
}

// function to generate usage data by month
function generateDataMonth(count, spendingsDates) {
  const today = new Date();
  const data = [];

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i * 30);
    const formattedDate = formatDate(date);
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - 30);
    const formattedStartDate = formatDate(startDate);

    const endDate = new Date(date);
    endDate.setDate(date.getDate());
    const formattedEndDate = formatDate(endDate);

    const matchingSpendings = spendingsDates.filter(
      // (spendingDate) => formatDate(spendingDate) === formattedDate
      (spendingDate) =>
        formatDate(spendingDate) >= formattedStartDate &&
        formatDate(spendingDate) <= formattedEndDate
    );
    const value = matchingSpendings.length;
    data.push({ x: formattedStartDate, y: value });
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
