import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Navigation } from 'lucide-react';


export function BoothLocator() {
  const [pincode, setPincode] = useState('');
  const [searched, setSearched] = useState(false);

  const mockBooths = [
    { name: 'Government High School', distance: '0.5 km', address: 'Main Road, Sector 4' },
    { name: 'Community Center', distance: '1.2 km', address: 'Near Central Park, Sector 5' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setSearched(true);
    }
  };

  return (
    <div className="w-full my-6 p-6 glass-panel rounded-2xl overflow-hidden relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"></div>

      <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2 relative z-10">
        <MapPin className="text-primary-dark" size={24} />
        Booth <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">Locator HUD</span>
      </h3>
      
      <p className="text-sm text-muted-foreground mb-6 relative z-10">
        Initialize search sequence by entering your 6-digit area PIN code.
      </p>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6 relative z-10">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={6}
            placeholder="ENTER PIN CODE"
            aria-label="Enter PIN code"
            className="w-full bg-black/40 border border-primary/30 rounded-xl pl-4 pr-10 py-3 text-sm text-primary font-mono placeholder:text-primary/30 focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(1,222,130,0.2)] transition-all uppercase tracking-widest"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
             <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
             <div className="w-1 h-1 bg-primary rounded-full animate-pulse delay-75"></div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          aria-label="Search booth"
          disabled={pincode.length !== 6}
          className="bg-gradient-to-r from-primary to-primary-dark text-[#020E0E] px-6 rounded-xl disabled:opacity-50 disabled:grayscale flex items-center justify-center font-bold shadow-[0_0_15px_rgba(1,222,130,0.3)] hover:shadow-[0_0_25px_rgba(1,222,130,0.5)] transition-all"
        >
          <Search size={20} />
        </motion.button>
      </form>

      <AnimatePresence>
        {searched && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 relative z-10"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-1"></div>
              <p className="text-[10px] font-bold text-primary/80 uppercase tracking-[0.2em] px-2">
                Targets Acquired: {pincode}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-1"></div>
            </div>

            {mockBooths.map((booth, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-black/60 rounded-xl border border-white/5 hover:border-primary/40 hover:bg-black/80 transition-all gap-4"
              >
                <div>
                  <p className="font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                    {booth.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{booth.address}</p>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs font-mono bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    {booth.distance}
                  </span>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-white/5 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                    title="Initialize Navigation"
                    aria-label="Navigate to booth"
                  >
                    <Navigation size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
            
            <div className="mt-4 p-2 bg-primary-dark/10 border border-primary-dark/20 rounded-md text-[10px] uppercase tracking-wider text-center text-primary-dark font-semibold flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary-dark rounded-full animate-ping"></span>
              Google Maps Uplink Pending
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
