import mongoose, { ConnectOptions } from "mongoose";

export async function Mongoconnect(url: string): Promise<void> {
  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to the MongoDB database.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
