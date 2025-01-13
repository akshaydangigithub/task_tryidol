import React, { createContext, useState } from "react";

export const DataContext = createContext(null);

const ContextApi = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export default ContextApi;
