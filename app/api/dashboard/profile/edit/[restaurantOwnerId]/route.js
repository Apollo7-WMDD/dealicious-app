import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";

export const PATCH = async (request, { params }) => {
  const restaurantProfile = await request.json();
  const restaurantOwnerId = params.restaurantOwnerId;

  try {
    await connect();

    // find the restaurant by restaurantOwnerId
    const restaurant = await Restaurant.findOne({
      userId: new mongoose.Types.ObjectId(restaurantOwnerId),
    });

    if (!restaurant) {
      // return a message indicating that the restaurant was not found
      return new NextResponse(JSON.stringify("Restaurant not found"), {
        status: 404,
      });
    }

    // update the restaurant based on the restaurantProfile data from the request
    for (const key in restaurantProfile) {
      if (Object.prototype.hasOwnProperty.call(restaurantProfile, key)) {
        if (restaurant[key] !== undefined) {
          restaurant[key] = restaurantProfile[key];
        }
      }
    }

    // Save the updated restaurant
    await restaurant.save();

    return new NextResponse(
      JSON.stringify({ message: "Restaurant updated successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return new NextResponse(JSON.stringify({ error: "Database Error" }), {
      status: 500,
    });
  }
};
