import mongoose from "mongoose";

export const databaseState = {
  isConnected: false
};

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("MONGODB_URI is not set. Using bundled JSON scheme data.");
    return;
  }

  try {
    await mongoose.connect(uri);
    databaseState.isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    databaseState.isConnected = false;
    console.warn(`MongoDB connection failed. Falling back to JSON data. ${error.message}`);
  }
}
