import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

// Define the shape of the decoded user token
interface User {
  user_id: number;
  role: 'STUDENT' | 'GUIDE';
  // Add other token payload fields if needed, e.g., email
}

// Define the shape of the context value
interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for a token in localStorage when the app loads
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedUser: User = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('accessToken');
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('accessToken', token);
    try {
      const decodedUser: User = jwtDecode(token);
      setUser(decodedUser);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};