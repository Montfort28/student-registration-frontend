// frontend/src/context/LanguageContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  // Check if there's a saved language preference in localStorage
  const getSavedLanguage = () => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en'; // Default to English if no language is saved
  };

  const [language, setLanguage] = useState(getSavedLanguage);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'fr' : 'en'));
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};