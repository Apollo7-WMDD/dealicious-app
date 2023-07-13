import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurants from "@/models/restaurant";

export const GET = async (request) => {
  const url = new URL(request.url);
  const superCustomerId = url.pathname.split("/")[4];
  try {
    await connect();
    const promises = [
      // Retrive all restaurants that are linked to the SC
      Restaurants.aggregate([
        {
          $match: {
            superCustomerIdArray: new mongoose.Types.ObjectId(superCustomerId)
          }
        },
        {
          $lookup: {
            from: "campaigns",
            localField: "_id",
            foreignField: "restaurantId",
            as: "campaigns"
          }
        },
        {
          $project: {
            name: 1,
            _id: 1,
            logo: 1,
            campaigns: 1,
            menu: 1, 
            logo: 1
          }
        },
      ])
      ];
      const results = await Promise.all(promises);
      // Return the nicely formatted JSON object
      return new NextResponse(JSON.stringify(results[0], null, 2), {
        status: 200,
      });
      } catch (err) {
      console.log(err.message);
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }
  };