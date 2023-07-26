import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Campaign from "@/models/campaign";

export const PATCH = async (request) => {
  const url = new URL(request.url);
  const campaignId = url.pathname.split("/")[5];

  try {
    await connect();

    // Fetch only the required fields in the campaign object (optimization 1)
    const campaign = await Campaign.findById(campaignId).select("favorite");

    if (!campaign) {
      return new NextResponse("Campaign not found", { status: 404 });
    }

    campaign.favorite = !campaign.favorite;

    await campaign.save();

    return new NextResponse(JSON.stringify({ message: "Pin toggled!" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
