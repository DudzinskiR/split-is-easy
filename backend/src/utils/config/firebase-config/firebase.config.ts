import admin from "firebase-admin";
import { envConfig } from "src/utils/config";

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: envConfig.firebase.clientEmail,
    privateKey: envConfig.firebase.privateKey,
    projectId: envConfig.firebase.projectId,
  }),
});

export const firebaseAuth = admin.auth();

export default admin;
