//ChatBubble3D
import { ReactNode, createContext } from "react";
import { ChatBubble3DProps } from "../chat-bubble-3d";

export const ChatBubble3DContext = createContext<ChatBubble3DProps | undefined>(
  undefined
);

interface ChatBubble3DProviderProps {
  children: ReactNode;
  value: ChatBubble3DProps;
}

export const ChatBubble3DContextProvider = ({
  children,
  value,
}: ChatBubble3DProviderProps) => {
  return (
    <ChatBubble3DContext.Provider value={value}>
      {children}
    </ChatBubble3DContext.Provider>
  );
};

export default ChatBubble3DContextProvider;
