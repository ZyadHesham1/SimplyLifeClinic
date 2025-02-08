import React, { useState, useEffect } from 'react';
import i18n from 'i18next';

const LanguageSwitch = () => {
  const [language, setLanguage] = useState(i18n.language.toUpperCase());

  const toggleLanguage = () => {
    const newLanguage = language === 'EN' ? 'AR' : 'EN';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage.toLowerCase())
      .then(() => {
        document.documentElement.setAttribute('dir', newLanguage === 'AR' ? 'rtl' : 'ltr');
        console.log('Language changed successfully');
      })
      .catch(err => console.error('Language change error', err));
  };

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'AR' ? 'rtl' : 'ltr');
  }, [language]);

  return (
    <button
      onClick={toggleLanguage}
      className="bg-white text-black hover:bg-gray-200 rounded-md px-3 py-2"
    >
      {language === 'EN' ? 'ع' : 'EN'}
    </button>
  );
};

export default LanguageSwitch;
