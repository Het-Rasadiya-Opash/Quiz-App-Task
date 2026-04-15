import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connected Successfully...");
  } catch (error) {
    console.log(`Error in DB Connection: ${error}`);
  }
};
