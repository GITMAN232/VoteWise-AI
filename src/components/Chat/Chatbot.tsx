import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { Header } from '../Header/Header';
import { ChatBubble } from './ChatBubble';
import { InputBar } from './InputBar';
import { VotingSteps } from '../Guide/VotingSteps';
import { ElectionTimeline } from '../Timeline/ElectionTimeline';
import { BoothLocator } from '../BoothLocator/BoothLocator';
import { FaqSection } from '../FAQ/FaqSection';

export function Chatbot() {
  const { messages, isTyping, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  useEffect(() => {
    const timeout = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeout);
  }, [messages, isTyping]);

  const renderDynamicComponent = (type?: string | null) => {
    switch (type) {
      case 'voting-steps':
        return <VotingSteps />;
      case 'election-timeline':
        return <ElectionTimeline />;
      case 'booth-locator':
        return <BoothLocator />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-5xl mx-auto bg-background relative overflow-hidden">
      {/* Background ambient elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-dark/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

      <Header />

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 no-scrollbar relative z-10 scroll-smooth">
        <AnimatePresence>
          {messages.map((msg) => (
            <ChatBubble 
              key={msg.id} 
              msg={msg} 
              renderDynamicComponent={renderDynamicComponent} 
            />
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 max-w-[80%] md:max-w-[65%]"
            >
              <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center relative bg-[#05614B]/20 border border-primary/40 shadow-[0_0_10px_rgba(1,222,130,0.2)] text-primary">
                <Bot size={16} />
              </div>
              <div className="glass-panel px-4 py-3 rounded-[18px] rounded-tl-[4px] flex items-center gap-1.5 h-[46px]">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Bottom Area (FAQ + Input) */}
      <div className="relative z-20 pb-4 pt-2 px-4 md:px-8 bg-gradient-to-t from-[#020E0E] via-[#020E0E]/95 to-transparent backdrop-blur-sm">
        <div className="max-w-3xl mx-auto mb-4">
          <FaqSection />
        </div>
        <div className="max-w-3xl mx-auto">
          <InputBar onSend={sendMessage} isTyping={isTyping} />
        </div>
        <p className="text-[10px] text-center mt-4 font-mono text-muted-foreground/60 uppercase tracking-widest">
          VoteWise AI Core v1.0 • Responses generated via Neural Link
        </p>
      </div>
    </div>
  );
}
