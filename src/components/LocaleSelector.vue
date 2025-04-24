<script setup>
import { BFormSelectOption } from 'bootstrap-vue-next';
import AppSelect from '@/components/AppSelect.vue';

import { LOCALES } from '../constants';
import { useLocaleStore } from '@/stores/locale';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const localeStore = useLocaleStore();
const { appLocale } = storeToRefs(localeStore);
const { setLocale } = localeStore;

const updateLocale = (value) => {
  locale.value = value;
  setLocale(value);
};
</script>

<template>
  <AppSelect :model-value="appLocale" @update:model-value="value => updateLocale(value)">
    <BFormSelectOption v-for="locale in LOCALES" :value="locale.key">{{ locale.label }}</BFormSelectOption>
  </AppSelect>
</template>
