import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

export async function POST(request) {
    console.log("receive post request");
    let data;
  
    try {
      data = await request.json();
    } catch (err) {
      console.error('Error parsing JSON:', err);
      return new NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
    }
  
    const { file } = data;
  
    if (!file) {
      return new NextResponse.json({ message: 'image file is required' }, { status: 400 });
    }
  
    // Decode the base64 image
    const buffer = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  
    // We need to return a Promise here because the function is asynchronous
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            console.error(error);
            reject(NextResponse.json({ message: error.message }, { status: 500 }));
          } else {
            resolve(NextResponse.json(result));
          }
        }
      );
  
      stream.write(buffer);
      stream.end();
    });
}
