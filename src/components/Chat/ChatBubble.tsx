import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { cn } from '../../utils/cn';
import ReactMarkdown from 'react-markdown';
import { type Message } from '../../context/ChatContext';

interface ChatBubbleProps {
  msg: Message;
  renderDynamicComponent: (type?: string | null) => React.ReactNode;
}

export function ChatBubble({ msg, renderDynamicComponent }: ChatBubbleProps) {
  const isUser = msg.role === 'user';
  const isSystem = msg.role === 'system';

  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center my-6"
      >
        <div className="bg-[#05614B]/30 border border-primary/20 text-primary/80 px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider flex items-center gap-2 backdrop-blur-sm shadow-[0_0_15px_rgba(1,222,130,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          {msg.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "flex gap-3 max-w-[80%] md:max-w-[65%] group",
        isUser ? "ml-auto flex-row-reverse" : ""
      )}
    >
      {/* Avatar (AI only, keep user minimal) */}
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center relative bg-[#05614B]/20 border border-primary/40 shadow-[0_0_10px_rgba(1,222,130,0.2)] text-primary">
          <Bot size={16} />
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping opacity-30"></div>
        </div>
      )}

      {/* Message Content */}
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        <div 
          tabIndex={0}
          aria-label={`${isUser ? 'Your message' : 'AI response'}: ${msg.content}`}
          className={cn(
            "px-4 py-3 text-[15px] leading-[1.6] relative overflow-hidden",
            isUser 
              ? "bg-gradient-to-r from-primary to-primary-dark text-white rounded-[18px] rounded-tr-[4px] shadow-[0_0_15px_rgba(1,222,130,0.15)]" 
              : "glass-panel rounded-[18px] rounded-tl-[4px]"
          )}
        >
          {/* Subtle inner highlight for 3D effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
          
          <div className="prose prose-sm prose-invert max-w-none relative z-10 prose-p:my-2 prose-headings:my-3">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        </div>
        
        {/* Dynamic Component Injection */}
        {msg.componentType && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="origin-top"
          >
            {renderDynamicComponent(msg.componentType)}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
