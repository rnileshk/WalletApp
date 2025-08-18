import React, { createContext, useContext, useMemo, useState } from 'react';
import { storage } from '../utils/storage';

interface AuthContextValue {
  isLoggedIn: boolean;
  login: (mobile: string, otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => storage.getIsLoggedIn());

  const login = async (mobile: string, otp: string) => {
    // basic validation
    const validMobile = /^\d{10}$/.test(mobile);
    const validOtp = otp === '1234';
    if (validMobile && validOtp) {
      setIsLoggedIn(true);
      storage.setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    storage.setIsLoggedIn(false);
  };

  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};