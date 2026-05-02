import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useUser } from '../../context/UserContext';


export function Header() {
  const { userType, changeProfile } = useUser();

  return (
    <header className="sticky top-0 z-50 glass-panel border-x-0 border-t-0 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {userType && (
          <motion.button
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={changeProfile}
            className="p-2 -ml-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-primary transition-colors"
            title="Change user mode"
            aria-label="Change profile"
          >
            <ArrowLeft size={20} />
          </motion.button>
        )}
        
        <div className="flex items-center gap-3">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark shadow-[0_0_15px_rgba(1,222,130,0.4)]"
          >
            <span className="text-primary-foreground font-bold text-lg leading-none">V</span>
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-primary border-2 border-[#020E0E]">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
            </div>
          </motion.div>
          
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-gradient">
              VoteWise AI
            </h1>
            {userType && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] uppercase tracking-wider text-primary font-semibold"
              >
                {userType} MODE
              </motion.p>
            )}
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/5 text-xs text-muted-foreground">
        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
        System Online
      </div>
    </header>
  );
}
