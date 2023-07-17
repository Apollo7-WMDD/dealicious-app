import { NextResponse } from "next/server";
import connect from "@/utils/database";
import Restaurant from "@/models/restaurant";
import Burncode from "@/models/burncode";

// GET CODES FROM THE OWNER SIDE
export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[4];

  try {
    await connect();

    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      burned: false,
    }).lean();

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    const burncodes = await Burncode.find({
      restaurantId: restaurantId,
    })
      .select({
        username: 1,
        campaignname: 1,
        offer: 1,
        burned: 1,
      })
      .lean();

    const response = {
      burncodes,
    };

    return new NextResponse(JSON.stringify(response, null, 2), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

// POST CODES TO THE OWNER SIDE
export const POST = async (req) => {
  const burnCode = await req.json();

  console.log("THIS IS THE BURN CODE: ✅✅✅✅ ", burnCode);

  try {
    await connect();
    console.log("THIS IS INSIDE THE TRY!@@: ✅✅✅✅ ");

    const newBurnCode = new Burncode({
      username: burnCode.username || "",
      campaignname: burnCode.campaignname || "",
      offer: burnCode.offer || "",
      burned: false,
      restaurantId: burnCode.restaurantId
        ? new mongoose.Types.ObjectId(burnCode.restaurantId)
        : undefined,
      campaignId: burnCode.campaignId
        ? new mongoose.Types.ObjectId(burnCode.campaignId)
        : undefined,
    });

    console.log("THIS IS AFTER THE new burn code!@@: ✅✅✅✅ ");

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
