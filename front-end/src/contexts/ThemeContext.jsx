// ThemeContext.jsx
import React, { createContext, useContext, useState, useMemo } from 'react';

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');  // default theme

  // Memoize the context value to maintain reference equality if its content hasn't changed
  const contextValue = useMemo(() => {
    return { theme, setTheme };
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};