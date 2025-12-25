import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBr from '@/locales/pt-br.json';
import enUs from '@/locales/en-us.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'habittus_language';

// Normalize any saved/system language to supported codes
const normalizeLanguage = (lng?: string | null): string => {
  if (!lng) return 'pt';
  const lower = lng.toLowerCase();
  if (lower.startsWith('pt')) return 'pt';
  if (lower.startsWith('en')) return 'en';
  return 'pt';
};

// Detect system language
const getSystemLanguage = (): string => {
  // Default to pt for now
  return 'pt';
};

const resources = {
  'pt': { translation: ptBr },
  'en': { translation: enUs },
};

const initializeI18n = async () => {
  let savedLanguage: string | null = null;

  try {
    savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    console.log('[i18n] Saved language:', savedLanguage);
  } catch (error) {
    console.error('[i18n] Error loading language preference:', error);
  }

  const defaultLanguage = normalizeLanguage(savedLanguage) || getSystemLanguage();
  console.log('[i18n] Initializing with language:', defaultLanguage);

  await i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    // Fix for nested JSON structure
    keySeparator: '.',
    nsSeparator: false,
  });

  console.log('[i18n] Initialized successfully. Current language:', i18n.language);
  console.log('[i18n] Test translation - settings.title:', i18n.t('settings.title'));
};

export { initializeI18n, LANGUAGE_KEY };
export default i18n;
