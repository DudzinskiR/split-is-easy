import { useContext } from "react";
import { ChatBubble3DContext } from "../context/chat-bubble-3d.context";

export const useChatBubble3DContext = () => {
  const context = useContext(ChatBubble3DContext);
  if (!context) {
    throw new Error(
      "useChatBubble3DContext must by used within a ChatBubble3DContextProvider"
    );
  }

  return context;
};
