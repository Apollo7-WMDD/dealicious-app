import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import PhoneAuth from "@/models/phoneauth";

export const POST = async () => {
  try {
    await connect();
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    const randomCode = Math.floor(100000 + Math.random() * 900000);

    client.messages.create({
        body: 'DEALicious This is your secret code: '+randomCode,
        from:'+16729030325',//from: '+15416157617',
        to: '+17783215361'})//'+14372105501'})
      .then(message => console.log(message.sid));

    const newPhoneCode = new PhoneAuth({
        code: randomCode,
    });

    await newPhoneCode.save();

    return new NextResponse(
      JSON.stringify({ message: "Code sent successfully" }),
      { status: 200 }
    );
  } catch (err) {
    // console.log(err.message);
    return new NextResponse(JSON.stringify({ error: "Database Error" }), {
      status: 500,
    });
  }
};

export const GET = async (req) => {
  const url = new URL(req.url);
  const codeId = url.pathname.split("/")[4];

  try {
    
    await connect();  
    
    const value = await PhoneAuth.findOne({
      code:codeId
    });

    if(value)
    {
      return new NextResponse(
        JSON.stringify({ validate:true }),
        { status: 200 }
      );
    }
    else
    {
      return new NextResponse(
        JSON.stringify({ validate:false }),
        { status: 200 }
      );
    } 
  } catch (err) {
    // console.log(err.message);
    return new NextResponse(JSON.stringify({ error: "Database Error" }), {
      status: 500,
    });
  }
};
