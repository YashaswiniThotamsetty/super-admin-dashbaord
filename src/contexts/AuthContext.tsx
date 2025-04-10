
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, isAuthenticated, getUser, clearTokens, setUser } from '@/lib/auth';
import { login as apiLogin, refreshToken } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      if (isAuthenticated()) {
        // Validate the current token
        const isValid = await refreshToken();
        if (isValid) {
          const userData = getUser();
          setCurrentUser(userData);
        } else {
          clearTokens();
          navigate('/login');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [navigate]);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const data = await apiLogin(credentials);
      const userData = {
        email: data.email,
        name: data.name,
        userId: data.userId
      };
      setCurrentUser(userData);
      setUser(userData);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearTokens();
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
