import { useEffect } from "react";
import { socket } from "src/utils/socket/socket";

export interface SocketData {
  name: string;
  listener: (...args: unknown[]) => void;
}

export const useSocket = (sockets: SocketData[]) => {
  useEffect(() => {
    for (const item of sockets) {
      socket.on(item.name, item.listener);
    }

    return () => {
      for (const item of sockets) {
        socket.off(item.name);
      }
    };
  }, [sockets]);
};
