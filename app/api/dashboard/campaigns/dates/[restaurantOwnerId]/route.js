import { NextResponse } from "next/server";
import connect from "@/utils/database";
import Restaurant from "@/models/restaurant";
import Campaign from "@/models/campaign";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwner = url.pathname.split("/")[5];

  try {
    await connect();

    const restaurant = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    ).lean();

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    const campaigns = await Campaign.find(
      { restaurantId: restaurant._id },
      { startDate: 1, endDate: 1, name: 1 }
    ).lean();

    // format dates
    campaigns.forEach((campaign) => {
      campaign.startDate = campaign.startDate.toISOString().split("T")[0];
      campaign.endDate = campaign.endDate.toISOString().split("T")[0];
    });

    const response = {
      campaigns,
    };

    return new NextResponse(JSON.stringify(response, null, 2), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
