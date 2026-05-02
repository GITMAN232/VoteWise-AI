import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import { generateGeminiResponse } from '../utils/gemini';
import { useUser, type UserType } from './UserContext';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  componentType?: 'voting-steps' | 'election-timeline' | 'booth-locator' | null;
  userProfile?: UserType;
}

interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (content: string) => Promise<void>;
  addSystemMessage: (content: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const INITIAL_MESSAGE: Message = {
  id: 'welcome-msg',
  role: 'assistant',
  content: "Hi! I'm VoteWise, your AI Election Assistant. How can I help you today? You can ask me about how to vote, election timelines, or find your polling booth.",
  timestamp: new Date(),
};

const MAX_MESSAGES = 100;

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const { userType } = useUser();
  const currentRequestRef = useRef<number>(0);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => {
      const newMessages = [...prev, message];
      if (newMessages.length > MAX_MESSAGES) {
        return newMessages.slice(newMessages.length - MAX_MESSAGES);
      }
      return newMessages;
    });
  }, []);

  const addSystemMessage = useCallback((content: string) => {
    addMessage({
      id: Date.now().toString() + Math.random().toString(),
      role: 'system',
      content,
      timestamp: new Date()
    });
  }, [addMessage]);

  const sendMessage = async (content: string) => {
    const requestId = Date.now();
    currentRequestRef.current = requestId;

    const userMsg: Message = {
      id: requestId.toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      userProfile: userType
    };
    addMessage(userMsg);
    setIsTyping(true);

    try {
      // Small artificial delay for UX
      await new Promise(resolve => setTimeout(resolve, 600));

      const history = messages
        .filter(m => m.role !== 'system') // don't send system logs to AI
        .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
      
      const response = await generateGeminiResponse(content, history, userType);
      
      // Prevent race conditions: ignore if a newer request was made
      if (currentRequestRef.current !== requestId) return;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        componentType: response.componentType as any,
        timestamp: new Date(),
        userProfile: userType
      };
      
      addMessage(aiMsg);
    } catch (error) {
      if (currentRequestRef.current !== requestId) return;
      console.error("Chat error:", error);
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting to my servers. Please check your internet connection or API key.",
        timestamp: new Date(),
      });
    } finally {
      if (currentRequestRef.current === requestId) {
        setIsTyping(false);
      }
    }
  };

  return (
    <ChatContext.Provider value={{ messages, isTyping, sendMessage, addSystemMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
