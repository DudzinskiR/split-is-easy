import mongoose from "mongoose";
import { envConfig } from "../config/env-config";

export const connectToDatabase = async (callback?: () => void) => {
  await mongoose.connect(envConfig.mongo.uri);
  if (callback) callback();
};
