import mongoose from "mongoose";

let isConnected = false; // track the connection

const connect = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("using existing connection...");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("Connected to MongoDB!");
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
