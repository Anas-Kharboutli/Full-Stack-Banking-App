import i18n from 'i18next';
import { initReactI18next  } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationsInEng from './locales/en/translation.json';
import translationsInPolish from './locales/pl/translation.json';

const resources = {
    en: {
        translation: translationsInEng
    },
    pl: {
        translation: translationsInPolish
    }
}

i18n
.use(initReactI18next )
.init({
    resources,
    debug: true,
    lng: localStorage.getItem("lang"),
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    ns: "translation",
    defaultNs: "translation"
});

export default i18n;