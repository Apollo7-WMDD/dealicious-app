import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Point from "@/models/points";

export const POST = async (request) => {
  const point = await request.json();
  console.log("this is the request for POINTS!: ", request);

  try {
    await connect();
    const pointNew = new Point({
      restaurantId: new mongoose.Types.ObjectId(point.restaurantId),
      superCustomerId: new mongoose.Types.ObjectId(point.superCustomerId),
      points: point.points,
    });

    await pointNew.save();
    return new NextResponse(JSON.stringify(pointNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
