/* eslint-disable import/no-named-as-default */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';

export const I18nLocaleOptions = ['en'] as const;
export type I18nLocales = typeof I18nLocaleOptions[number];

i18n.use(initReactI18next).init({
  defaultNS: 'common',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  ns: ['common'],
  resources: {
    en: { common: en },
  },
});

export default i18n;
