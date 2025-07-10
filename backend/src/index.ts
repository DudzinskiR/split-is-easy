import "express-async-errors";
import "tsconfig-paths/register";

import cors from "cors";
import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import { connectToDatabase } from "src/utils/db/connect-to-database";

import { exceptionHandler } from "./middlewares";
import { envConfig } from "./utils/config";
import { connectToSocket } from "./utils/socket";
import router from "./routes/index.route";

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(exceptionHandler);

if (envConfig.NODE_ENV === "development") {
  console.log("----------------------------");
  console.log("|     Development mode     |");
  console.log("----------------------------");
}

connectToDatabase(() => console.log("Connected to database"));

server.listen(envConfig.server.port, async () => {
  console.log(`Express started on port ${envConfig.server.port} :)`);
  connectToSocket();
});

export { io };
