import { motion } from 'framer-motion';
import { Calendar, Mic, Vote, BarChart, Trophy } from 'lucide-react';
import { cn } from '../../utils/cn';

const PHASES = [
  { phase: 'Announcement', date: 'TBA', icon: Calendar, active: true },
  { phase: 'Campaigning', date: 'TBA', icon: Mic, active: false },
  { phase: 'Voting Day', date: 'TBA', icon: Vote, active: false },
  { phase: 'Counting', date: 'TBA', icon: BarChart, active: false },
  { phase: 'Results', date: 'TBA', icon: Trophy, active: false },
];

export function ElectionTimeline() {
  return (
    <div className="w-full my-6 p-6 glass-panel rounded-2xl overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none"></div>

      <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-2">
        <span className="text-primary text-glow">Election Timeline</span>
      </h3>
      
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center min-h-[300px] md:min-h-0 gap-8 md:gap-0">
        
        {/* Background connecting line (Desktop: horizontal, Mobile: vertical) */}
        <div className="absolute top-0 md:top-6 left-6 md:left-0 w-1 md:w-full h-full md:h-1 bg-white/5 rounded-full z-0"></div>
        
        {/* Active connecting line */}
        <motion.div 
          initial={{ height: 0, width: 0 }}
          animate={{ height: '100%', width: '100%' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 md:top-6 left-6 md:left-0 w-1 md:w-[20%] h-[20%] md:h-1 bg-gradient-to-b md:bg-gradient-to-r from-primary to-primary-dark rounded-full z-0 shadow-[0_0_10px_rgba(1,222,130,0.5)]"
        />

        {PHASES.map((phase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="flex md:flex-col items-center gap-4 md:gap-3 relative z-10 w-full md:w-auto"
          >
            {/* Node Circle */}
            <motion.div
              whileHover={{ scale: 1.2, boxShadow: '0 0 20px rgba(1, 222, 130, 0.6)' }}
              className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors duration-300",
                phase.active
                  ? "bg-[#020E0E] text-primary border-primary shadow-[0_0_15px_rgba(1,222,130,0.4)]"
                  : "bg-black/40 text-muted-foreground border-white/10 hover:border-primary/50"
              )}
            >
              <phase.icon size={20} />
              {phase.active && (
                <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping pointer-events-none"></span>
              )}
            </motion.div>
            
            {/* Text details */}
            <div className="md:text-center flex-1 md:flex-none">
              <p className={cn(
                "text-sm font-bold tracking-wide", 
                phase.active ? "text-white text-glow" : "text-muted-foreground"
              )}>
                {phase.phase}
              </p>
              <p className="text-xs font-mono text-primary/70 mt-1 uppercase">
                {phase.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
