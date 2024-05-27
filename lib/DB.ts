import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.DB_URI) return console.log("DB_URI is not defined");

  if (isConnected) return console.log("=> using existing database connection");

  try {
    await mongoose.connect(process.env.DB_URI);

    isConnected = true;

    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};
