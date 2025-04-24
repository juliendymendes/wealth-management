import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';

export const useLocaleStore = defineStore('appLocale', () => {
  // State
  const { locale } = useI18n();
  const appLocale = ref(localStorage.getItem('appLocale') || locale.value);

  // Getters
  const getLocale = computed(() => {
    const storedLocale = localStorage.getItem('appLocale');
    if (storedLocale) {
      appLocale.value = storedLocale;
    } else {
      localStorage.setItem('appLocale', appLocale.value);
    }
    return appLocale.value;
  });

  // Actions
  const setLocale = (newLocale) => {
    appLocale.value = newLocale;
    locale.value = newLocale;
    localStorage.setItem('appLocale', newLocale);
  }

  return { appLocale, getLocale, setLocale };
})
