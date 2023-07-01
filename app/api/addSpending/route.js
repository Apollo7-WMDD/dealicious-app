import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Spending from "@/models/spending";

export const POST = async (request) => {
  const spending = await request.json();

  try {
    await connect();
    const spendingNew = new Spending({
      phone: spending.phone,
      name: spending.name,
      restaurantId: new mongoose.Types.ObjectId(spending.restaurantId),
      campaignId: new mongoose.Types.ObjectId(spending.campaignId),
      billamount: spending.billamount,
      isSuperCustomer: spending.isSuperCustomer,
      dateRedeemed: spending.dateRedeemed,
      suggestion: {
        foodQuality: spending.suggestion.foodQuality,
        foodQuantity: spending.suggestion.foodQuantity,
        service: spending.suggestion.service,
        place: spending.suggestion.place,
        other: spending.suggestion.other,
      },
    });

    await spendingNew.save();
    return new NextResponse(JSON.stringify(spendingNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
