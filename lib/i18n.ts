import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBr from '@/locales/pt-br.json';
import enUs from '@/locales/en-us.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'habittus_language';

// Detect system language
const getSystemLanguage = (): string => {
  // Default to pt-br for now
  return 'pt-br';
};

const resources = {
  'pt-br': { translation: ptBr },
  'en-us': { translation: enUs },
};

const initializeI18n = async () => {
  let savedLanguage: string | null = null;

  try {
    savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    console.log('[i18n] Saved language:', savedLanguage);
  } catch (error) {
    console.error('[i18n] Error loading language preference:', error);
  }

  const defaultLanguage = savedLanguage || getSystemLanguage();
  console.log('[i18n] Initializing with language:', defaultLanguage);

  await i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'pt-br',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  console.log('[i18n] Initialized successfully. Current language:', i18n.language);
  console.log('[i18n] Test translation - settings.title:', i18n.t('settings.title'));
};

export { initializeI18n, LANGUAGE_KEY };
export default i18n;
