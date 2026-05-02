import { motion } from 'framer-motion';
import { useUser, type UserType } from '../../context/UserContext';
import { useChat } from '../../context/ChatContext';
import { User, CheckCircle2, Globe2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const USER_TYPES = [
  {
    id: 'First-time voter',
    title: 'First-Time Voter',
    description: 'I have never voted before and need full guidance.',
    icon: CheckCircle2,
  },
  {
    id: 'General voter',
    title: 'General Voter',
    description: 'I have voted before but need a quick refresher.',
    icon: User,
  },
  {
    id: 'NRI voter',
    title: 'NRI Voter',
    description: 'I am an Overseas Indian looking to vote.',
    icon: Globe2,
  },
] as const;

export function UserSelection() {
  const { setUserType } = useUser();
  const { addSystemMessage } = useChat();

  const handleSelect = (id: string) => {
    setUserType(id as UserType);
    addSystemMessage(`Switched to ${id} mode. Core logic updated.`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full space-y-12 relative z-10"
      >
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center h-16 w-16 mb-4 rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-[0_0_30px_rgba(1,222,130,0.4)]"
          >
            <span className="text-primary-foreground font-black text-3xl leading-none">V</span>
          </motion.div>
          
          <h1 className="text-fluid-h1 font-black tracking-tighter text-white">
            Meet <span className="text-gradient">VoteWise AI</span>
          </h1>
          <p className="text-muted-foreground text-fluid-p max-w-2xl mx-auto font-medium mt-4">
            Your premium, intelligent election assistant. Select your profile to initialize a personalized dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {USER_TYPES.map((type, index) => (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              onClick={() => handleSelect(type.id)}
              className={cn(
                "group flex flex-col items-center p-8 glass-panel rounded-3xl",
                "glass-panel-hover text-left relative overflow-hidden focus:outline-none"
              )}
            >
              {/* Card internal glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="h-16 w-16 rounded-full bg-[#020E0E] border-2 border-primary/30 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(1,222,130,0.4)] transition-all duration-300 relative z-10">
                <type.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white text-center group-hover:text-primary transition-colors">
                {type.title}
              </h3>
              <p className="text-muted-foreground text-sm text-center leading-relaxed group-hover:text-white/80 transition-colors">
                {type.description}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                INITIALIZE <span className="animate-pulse">_</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
