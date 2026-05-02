import { useChat } from '../../context/ChatContext';
import { motion } from 'framer-motion';
import { MessageCircleQuestion } from 'lucide-react';

const FAQS = [
  "How to vote?",
  "When is the election?",
  "Where is my polling booth?",
  "What ID do I need to carry?",
];

export function FaqSection() {
  const { sendMessage, isTyping } = useChat();

  return (
    <div className="w-full flex overflow-x-auto gap-3 py-4 px-2 no-scrollbar">
      {FAQS.map((faq, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => sendMessage(faq)}
          disabled={isTyping}
          aria-label={faq}
          className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 glass-panel rounded-full text-sm font-medium border border-white/5 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(1,222,130,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <MessageCircleQuestion size={16} className="group-hover:text-primary transition-colors" />
          {faq}
        </motion.button>
      ))}
    </div>
  );
}
