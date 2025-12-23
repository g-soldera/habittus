import { useCallback, useEffect, useState } from 'react';
import { useTranslation as useI18nTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/lib/i18n';

const LANGUAGE_KEY = 'habittus_language';

export function useTranslation() {
  const { t, i18n: i18nInstance } = useI18nTranslation();

  const changeLanguage = useCallback(
    async (language: string) => {
      try {
        await AsyncStorage.setItem(LANGUAGE_KEY, language);
        await i18nInstance.changeLanguage(language);
      } catch (error) {
        console.error('[useTranslation] Error changing language:', error);
      }
    },
    [i18nInstance]
  );

  const currentLanguage = useCallback(() => {
    return i18nInstance.language;
  }, [i18nInstance]);

  return {
    t,
    changeLanguage,
    currentLanguage: currentLanguage(),
    availableLanguages: ['pt-br', 'en-us'],
  };
}
