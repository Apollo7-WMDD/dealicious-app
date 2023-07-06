import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import SuperCustomer from "@/models/superCustomer";
import User from "@/models/user";

export const GET = async (request) => {
  const url = new URL(request.url);
  const superCustomerId = url.pathname.split("/")[4];

  try {
    await connect();

    const result = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(superCustomerId) } },
      {
        $lookup: {
          from: "supercustomers",
          localField: "phone",
          foreignField: "phone",
          as: "superCustomer",
        },
      },
      {
        $addFields: {
          superCustomer: { $arrayElemAt: ["$superCustomer", 0] },
        },
      },
      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
          phone: 1,
          birthDate: "$superCustomer.birthDate",
        },
      },
    ]);

    if (result.length === 0) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const user = result[0];

    // Construct the response object
    const response = {
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        birthDate: user.birthDate,
      },
    };

    // Return the nicely formatted JSON object
    return new NextResponse(JSON.stringify(response, null, 2), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
