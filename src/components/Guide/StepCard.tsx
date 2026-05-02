import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface StepCardProps {
  step: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
  index: number;
  total: number;
}

export function StepCard({ step, index, total }: StepCardProps) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, type: 'spring', damping: 20 }}
      className="relative flex gap-6"
    >
      {/* Animated Progress Line */}
      <div className="flex flex-col items-center">
        <motion.div 
          whileHover={{ scale: 1.2, boxShadow: '0 0 20px rgba(1, 222, 130, 0.6)' }}
          className="relative z-10 h-10 w-10 rounded-full bg-[#020E0E] border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_10px_rgba(1,222,130,0.3)] cursor-pointer"
        >
          <Icon size={18} />
          {/* Inner pulse for active feel */}
          <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping pointer-events-none"></span>
        </motion.div>
        
        {index < total - 1 && (
          <div className="flex-1 w-px bg-gradient-to-b from-primary via-primary-dark/50 to-transparent my-2 relative">
             {/* Flowing energy animation along the line */}
            <motion.div 
              animate={{ y: ['0%', '100%'], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-primary rounded-full blur-[2px]"
            />
          </div>
        )}
      </div>

      {/* Content Card */}
      <motion.div 
        whileHover={{ x: 5 }}
        className="pb-8 flex-1"
      >
        <div className="glass-panel p-4 rounded-xl hover:border-primary/50 transition-colors group">
          <h4 className="text-md font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
            <span className="text-xs text-primary/70 font-mono">0{index + 1}.</span> 
            {step.title}
          </h4>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            {step.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
