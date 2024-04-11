import mongoose from "mongoose";

export async function connect() {
  if (!process.env.NEXT_PUBLIC_MONGO_URI) {
    throw new Error("MongoDB URI not defined in environment variables");
  }

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  } catch (error) {
    console.error("Failed to connect to DB!", error);
    throw error;
  }
}

mongoose.connection.on("connected", () => {
  console.log("connected to DB!");
});

mongoose.connection.on("error", err => {
  console.error("Mongoose connection error: ", err);
  process.exit();
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected! Trying to reconnect...");
  connect();
});