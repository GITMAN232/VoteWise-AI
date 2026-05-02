import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserType = 'First-time voter' | 'General voter' | 'NRI voter' | null;

interface UserContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  isSelectingProfile: boolean;
  setIsSelectingProfile: (val: boolean) => void;
  changeProfile: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null);
  const [isSelectingProfile, setIsSelectingProfile] = useState<boolean>(true);

  const handleSetUserType = (type: UserType) => {
    setUserType(type);
    setIsSelectingProfile(false);
  };

  const changeProfile = () => {
    setIsSelectingProfile(true);
  };

  return (
    <UserContext.Provider value={{ 
      userType, 
      setUserType: handleSetUserType, 
      isSelectingProfile, 
      setIsSelectingProfile,
      changeProfile 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
