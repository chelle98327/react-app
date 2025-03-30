import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "expo-router";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const router = useRouter();
  
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite<User | null, Record<string, string | number>>({
    fn: getCurrentUser,
  });

  const isLogged = !!user;

  useEffect(() => {
    if (!loading && !isLogged) {
      router.replace("/sign-in"); // ✅ Safe navigation
    }
  }, [loading, isLogged]);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        loading,
        refetch: (newParams = {}) => refetch(newParams),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
