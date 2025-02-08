import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'

import HttpApi from 'i18next-http-backend';


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(HttpApi)
    .init({

    fallbackLng: 'en', // Fallback language
    detection:{
        order: [ 'cookie', 'htmlTag' , 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
        caches: ['localStorage', 'cookie']
        },
    backend: {
        loadPath: '/locale/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
