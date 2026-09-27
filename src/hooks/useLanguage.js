import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

/**
 * Access current locale, toggle function, and active translation object.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
