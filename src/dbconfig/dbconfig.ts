import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to DB!");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error!: " + err);
      process.exit();
    });
  } catch (error) {
    console.log("Not connecting to DB!");
    console.log(error);
  }
}
