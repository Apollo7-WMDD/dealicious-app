import { NextResponse } from "next/server";
import connect from "@/utils/database";
import Restaurant from "@/models/restaurant";
import Burncode from "@/models/burncode";
import mongoose from "mongoose";

// GET CODES FROM THE OWNER SIDE
export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[4];

  try {
    await connect();

    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
    }).lean();

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ burncodes: {} }), {
        status: 200,
      });
    }

    const burncodes = await Burncode.find({
      restaurantId: restaurantId,
      burned: false,
    })
      .select({
        username: 1,
        campaignname: 1,
        offer: 1,
        burned: 1,
        restaurantId: 1,
        campaignId: 1,
      })
      .lean();

    const response = {
      burncodes,
    };

    return new NextResponse(JSON.stringify(response, null, 2), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
};

// POST CODES TO THE OWNER SIDE
export const POST = async (req) => {
  const burnCode = await req.json();

  try {
    await connect();

    const newBurnCode = new Burncode({
      username: burnCode.username,
      campaignname: burnCode.campaignname,
      offer: burnCode.offer,
      burned: burnCode.burned,
      restaurantId: new mongoose.Types.ObjectId(burnCode.restaurantId),
      campaignId: new mongoose.Types.ObjectId(burnCode.campaignId),
    });

    console.log("newBurnCode: ", newBurnCode);

    await newBurnCode.save();

    return new NextResponse(
      JSON.stringify({ message: "Restaurant posted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(500, {
      message: "Error creating campaign, check the inputs",
    });
  }
};
