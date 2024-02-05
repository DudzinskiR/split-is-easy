import { Request } from "express";
import { UserDocument, BillDocument } from "src/interfaces";

declare module "express" {
  interface Request {
    decodedToken?: DecodedIdToken;
    user?: UserDocument;
    bill?: BillDocument;
  }
}
