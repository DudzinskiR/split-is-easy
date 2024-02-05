import { io } from "socket.io-client";
import { firebaseAuth, getToken } from "src/utils/firebase";

const URL = import.meta.env.VITE_API_ROOT;

export const socket = io(URL, {
  autoConnect: false,
});

firebaseAuth().onAuthStateChanged(async () => {
  const token = await getToken();
  if (!token) {
    socket.disconnect();
    return;
  }
  socket.auth = { token: `Bearer ${token}` };
  socket.connect();
});
