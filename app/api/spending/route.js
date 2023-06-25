// import { NextResponse } from "next/server";
// import connect from "@/utils/database";
// import mongoose from "mongoose";
// import Spending from "@/models/spending";

// export const GET = async (request) => {
//   try {
//     await connect();
//     // get the collection of movies without a Schema
//     const spending = await mongoose.connection.db
//       .collection("spending")
//       .find({})
//       .toArray();

//     return new NextResponse(JSON.stringify(spending), { status: 200 });
//   } catch (err) {
//     console.log(err.message);
//     return new NextResponse("Database Error", { status: 500 });
//   }
// };

// export const POST = async (request) => {
//   const spending = await request.json();

//   try {
//     const spendingDoc = await new Spending({
//       phone: spending.phone,
//       restaurantId: spending.restaurantId,
//       superCustomerId: spending.superCustomerId,
//       billamount: spending.billamount,
//       campaignId: spending.campaignId,
//       suggestion: spending.suggestion,
//     });

//     await userNew.save();
//     return new NextResponse(JSON.stringify(spendingDoc), { status: 200 });
//   } catch (err) {
//     console.log(err.message);
//     return new NextResponse(err.message, { status: 500 });
//   }
// };
