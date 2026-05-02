import { motion } from 'framer-motion';
import { UserPlus, FileText, MapPin, CheckSquare, Search } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { StepCard } from './StepCard';

export function VotingSteps() {
  const { userType } = useUser();

  const generalSteps = [
    { title: 'Check Registration', description: 'Ensure your name is on the electoral roll via the NVSP portal.', icon: Search },
    { title: 'Keep ID Ready', description: 'Carry your Voter ID (EPIC) or any valid ID proof.', icon: FileText },
    { title: 'Find Polling Booth', description: 'Locate your designated polling booth online before election day.', icon: MapPin },
    { title: 'Cast Your Vote', description: 'Go to the booth, verify your ID, and vote via EVM securely.', icon: CheckSquare },
  ];

  const firstTimeSteps = [
    { title: 'Register to Vote', description: 'Fill Form 6 online via the NVSP portal to get onto the electoral roll.', icon: UserPlus },
    ...generalSteps,
  ];

  const nriSteps = [
    { title: 'Register as NRI', description: 'Fill Form 6A to register as an overseas elector.', icon: UserPlus },
    { title: 'Verify Passport', description: 'Your original passport is mandatory for identity verification.', icon: FileText },
    { title: 'Vote in Person', description: 'You must be physically present at your constituency booth to cast your vote.', icon: MapPin },
  ];

  const steps = userType === 'First-time voter' ? firstTimeSteps 
    : userType === 'NRI voter' ? nriSteps 
    : generalSteps;

  return (
    <div className="w-full my-6">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-3"
      >
        <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary-dark rounded-full"></div>
        <h3 className="text-xl font-bold text-white text-glow">Action Plan</h3>
      </motion.div>
      
      <div className="pl-4">
        {steps.map((step, index) => (
          <StepCard 
            key={index} 
            step={step} 
            index={index} 
            total={steps.length} 
          />
        ))}
      </div>
    </div>
  );
}
