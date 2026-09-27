import { createContext, useEffect, useMemo, useState } from 'react';
import translations from '../translations/translations';

// Context export in separate file caused HMR/import issues on Windows
// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext(null);

/**
 * Provides global language state ('en' | 'es') and translated strings.
 * Default language: Spanish.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  const value = useMemo(
    () => ({
      language,
      toggleLanguage,
      t: translations[language],
    }),
    [language],
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
