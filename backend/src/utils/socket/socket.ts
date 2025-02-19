import { ObjectId, Types } from "mongoose";
import { Socket } from "socket.io";
import { io } from "src/index";
import { envConfig } from "src/utils/config";
import { getDecodedToken, getUserFromDB } from "src/utils/helpers";

export const sockets: Record<string, Socket[]> = {};

export const sendToSockets = (
  id: string | string[] | ObjectId[] | Types.ObjectId[],
  message: string,
  payload?: any
) => {
  if (typeof id === "string") {
    const list = sockets[id];
    if (list) {
      for (const socket of list) {
        socket.emit(message, payload);
      }
    }
    return;
  }

  if (!Array.isArray(id)) return;
  if (id.length <= 0) return;
  const listOfID = id.map((item) => item.toString());
  for (const users of listOfID) {
    const list = sockets[users];
    if (list) {
      for (const socket of list) {
        socket.emit(message, payload);
      }
    }
  }
};

export const connectToSocket = () => {
  io.on("connection", async (socket) => {
    if (envConfig.NODE_ENV === "development") console.log("A user connected");
    try {
      const decodedToken = await getDecodedToken(socket.handshake.auth.token);
      const user = await getUserFromDB(decodedToken);
      if (!sockets[user.id]) {
        sockets[user.id] = [socket];
      } else {
        sockets[user.id].push(socket);
      }
      socket.on("disconnect", () => {
        if (envConfig.NODE_ENV === "development")
          console.log(`User disconnected`);

        sockets[user.id] = sockets[user.id].filter(
          (item) => item.id !== socket.id
        );
      });
    } catch (e) {
      console.error(e);
    }
  });
};
