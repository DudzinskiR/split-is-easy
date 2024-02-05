import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  mongo: {
    uri: process.env.MONGODB_URI || "",
  },
  server: {
    port: Number(process.env.PORT) || 8080,
  },
  firebase: {
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    projectId: process.env.FIREBASE_PROJECT_ID,
  },
  NODE_ENV: process.env.NODE_ENV || "development",
};
