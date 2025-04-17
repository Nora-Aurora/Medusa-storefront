// context/GlobalContext.tsx
'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

// Define types for the context
interface GlobalContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

// Create a context with default values
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

// Create the provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <GlobalContext.Provider value={{ loading, setLoading, error, setError }}>
      <Toaster />
      {children}
    </GlobalContext.Provider>
  );
};
