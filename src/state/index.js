"use client";

import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticates] = useState(false);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticates,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
