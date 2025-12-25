import { useCallback, useEffect, useState } from 'react';
import { useTranslation as useI18nTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/lib/i18n';

const LANGUAGE_KEY = 'habittus_language';

const normalizeLanguage = (lng?: string | null) => {
  if (!lng) return 'pt';
  const lower = lng.toLowerCase();
  if (lower.startsWith('pt')) return 'pt';
  if (lower.startsWith('en')) return 'en';
  return 'pt';
};

export function useTranslation() {
  const { t, i18n: i18nInstance, ready } = useI18nTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for i18n to be ready
    if (ready && i18nInstance.language) {
      setIsReady(true);
    }
  }, [ready, i18nInstance.language]);

  const changeLanguage = useCallback(
    async (language: string) => {
      try {
        const normalized = normalizeLanguage(language);
        await AsyncStorage.setItem(LANGUAGE_KEY, normalized);
        await i18nInstance.changeLanguage(normalized);
      } catch (error) {
        console.error('[useTranslation] Error changing language:', error);
      }
    },
    [i18nInstance]
  );

  const currentLanguage = useCallback(() => {
    return normalizeLanguage(i18nInstance.language);
  }, [i18nInstance]);

  return {
    t,
    changeLanguage,
    currentLanguage: currentLanguage(),
    availableLanguages: ['pt', 'en'],
    isReady,
  };
}
