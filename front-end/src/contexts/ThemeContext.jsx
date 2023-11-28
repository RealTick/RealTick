import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage if available, otherwise default to 'dark'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    // Save theme to localStorage when it changes
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Memoize the context value to maintain reference equality if its content hasn't changed
  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
