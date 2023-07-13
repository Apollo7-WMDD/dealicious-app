import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Campaigns from "@/models/campaign";
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
      const costumerData = {
        //name: results[0][1][0],
        //results
        results: results[0]//.map(item => item.name)
      };
      return new NextResponse(JSON.stringify(costumerData), {
        status: 200,
      });
    } catch (err) {
      console.log(err.message);
      return new NextResponse("Database Error", { status: 500 });
    }
  };      


  /*
export const GET = async (request) => {
  const url = new URL(request.url);
  const superCustomerId = url.pathname.split("/")[4];

  try {
    await connect();

    const restaurants = await Restaurant.aggregate([
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
    ]);

    // Return the nicely formatted JSON object
    return new NextResponse(JSON.stringify(restaurants), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
  }
};*/