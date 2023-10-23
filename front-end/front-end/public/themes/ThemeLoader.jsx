// ThemeLoader.jsx

import { useEffect } from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';

const ThemeLoader = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const linkId = 'theme-style';
    let link = document.getElementById(linkId);

    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    link.href = `./themes/${theme}-theme.css`;

  }, [theme]);

  return null;
};

export default ThemeLoader;