import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface UserContextProps {
  children: ReactNode;
}

interface UserContextType {
  login: string | null;
  setRegLogin: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [regLogin, setRegLogin] = useState<string | null>(null);

  const logout = () => {
    setRegLogin(null);
  };

  useEffect(() => {
    const storedLogin = localStorage.getItem('regLogin');
    if (storedLogin) {
      setRegLogin(storedLogin);
    } else {
      // setIsAuthenticated(false);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('regLogin', regLogin || '');
  }, [regLogin]);

  return (
    <UserContext.Provider value={{ login: regLogin, setRegLogin, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Ошибка при использовании UserContextProvider');
  }
  return context;
};
