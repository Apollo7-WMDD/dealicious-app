import { NextResponse } from "next/server";
import connect from "@/utils/database";
import Campaign from "@/models/campaign";
import mongoose from "mongoose";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[4];

  try {
    await connect();

    // get all the campaigns for the restaurant and retrieve the campaign id, name and description
    const campaigns = await Campaign.aggregate([
      {
        $match: { restaurantId: new mongoose.Types.ObjectId(restaurantId) },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
        },
      },
    ]);

    const response = {
      campaigns,
    };

    return new NextResponse(JSON.stringify(response, null, 2), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
