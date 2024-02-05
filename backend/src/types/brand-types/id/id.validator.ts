import mongoose from "mongoose";
import { ID } from "./id.type";

export const validID = (idLike: string): idLike is ID => {
  return typeof idLike === "string" && mongoose.isValidObjectId(idLike);
};
