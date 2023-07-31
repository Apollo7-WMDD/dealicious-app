import { NextResponse } from "next/server";
import connect from "@/utils/database";
import Spending from "@/models/spending";
import Burncode from "@/models/burncode";
import mongoose from "mongoose";

export const POST = async (request) => {
  const { username, restaurantId, campaignId, billamount } =
    await request.json();

  try {
    await connect();
    const phoneNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    const suggestionIndex = Math.floor(Math.random() * 5);
    const suggestion = {
      foodQuality: false,
      foodQuantity: false,
      service: false,
      place: false,
      other: false,
    };
    suggestion[Object.keys(suggestion)[suggestionIndex]] = true;

    // new spending
    const newSpending = new Spending({
      name: username,
      phone: phoneNumber,
      restaurantId: new mongoose.Types.ObjectId(restaurantId),
      campaignId: new mongoose.Types.ObjectId(campaignId),
      billamount: billamount,
      suggestion: suggestion,
    });

    await newSpending.save();

    return new NextResponse(
      JSON.stringify({ message: "Code has been burnt!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return new NextResponse(JSON.stringify({ error: "Database Error" }), {
      status: 500,
    });
  }
};

export const PATCH = async (request) => {
  const { burnCodeId } = await request.json();

  try {
    await connect();
    // toggle the burned status to true
    const burncode = await Burncode.findOne({
      _id: burnCodeId,
    });

    if (!burncode) {
      // return a message indicating that the burncode was not found
      return new NextResponse(JSON.stringify("Burncode not found"), {
        status: 404,
      });
    }

    burncode.burned = true;
    await burncode.save();

    return new NextResponse(
      JSON.stringify({ message: "Burncode updated successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return new NextResponse(JSON.stringify({ error: "Database Error" }), {
      status: 500,
    });
  }
};
