import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.error("CRITICAL ERROR: MONGO_URI is not defined in environment variables!");
      console.error("Please set MONGO_URI in your Render/DigitalOcean dashboard.");
      process.exit(1);
    }

    // Diagnostic: Log a part of the URI to confirm it's loaded (safely)
    const maskedUri = uri.replace(/:([^@]+)@/, ":****@");
    console.log("DIAGNOSTIC: Attempting to connect to MongoDB with URI:", maskedUri.substring(0, 30) + "...");

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;