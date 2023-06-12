import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    if (mongoose.connection.readyState === 1) {
      console.log("Connected to MongoDB!");
    }
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;