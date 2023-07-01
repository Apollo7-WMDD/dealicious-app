import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Redeemed from "@/models/redeemedPoints";

export const POST = async (request) => {
  const redeemed = await request.json();

  console.log("this is the request!: ", request);

  try {
    await connect();
    const redeemedNew = new Redeemed({
      restaurantId: new mongoose.Types.ObjectId(redeemed.restaurantId),
      superCustomerId: new mongoose.Types.ObjectId(redeemed.superCustomerId),
      spendingBillId: new mongoose.Types.ObjectId(redeemed.spendingBillId),
      points: redeemed.points,
    });

    await redeemedNew.save();
    return new NextResponse(JSON.stringify(redeemedNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
