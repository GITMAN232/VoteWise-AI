import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic } from 'lucide-react';
import { cn } from '../../utils/cn';

interface InputBarProps {
  onSend: (msg: string) => void;
  isTyping: boolean;
}

export function InputBar({ onSend, isTyping }: InputBarProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    onSend(input);
    setInput('');
  };

  return (
    <motion.div 
      className={cn(
        "relative p-1.5 rounded-full transition-all duration-300",
        isFocused ? "bg-gradient-to-r from-primary/20 via-primary-dark/20 to-primary/20 shadow-[0_0_20px_rgba(1,222,130,0.15)]" : "bg-transparent"
      )}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-dark rounded-full opacity-20 blur-sm group-hover:opacity-40 transition-opacity"></div>
      
      <form 
        onSubmit={handleSubmit} 
        className="relative flex items-center gap-2 glass-panel rounded-full pr-2 pl-4 py-1 border border-white/10"
      >
        <button 
          type="button"
          className="text-muted-foreground hover:text-primary transition-colors p-2"
          title="Voice input coming soon"
          aria-label="Voice input"
        >
          <Mic size={18} />
        </button>
        
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask VoteWise anything..."
          aria-label="Message input"
          className="flex-1 bg-transparent border-none text-foreground text-sm focus:outline-none focus:ring-0 px-2 py-3 placeholder:text-muted-foreground/50"
          disabled={isTyping}
        />
        
        <AnimatePresence>
          {input.trim() && !isTyping && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              aria-label="Send message"
              className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-dark text-primary-foreground flex items-center justify-center shadow-[0_0_15px_rgba(1,222,130,0.5)] flex-shrink-0"
            >
              <Send size={16} className="ml-1" />
            </motion.button>
          )}
        </AnimatePresence>
        
        {isTyping && (
           <div className="h-10 w-10 flex items-center justify-center text-primary">
              <span className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></span>
           </div>
        )}
      </form>
    </motion.div>
  );
}
