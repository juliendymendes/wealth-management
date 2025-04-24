<script setup>
import { BFormSelectOption } from 'bootstrap-vue-next';
import AppSelect from '@/components/AppSelect.vue';

import { LOCALES } from '../constants';
import { useLocaleStore } from '@/stores/locale';

const { setLocale, appLocale } = useLocaleStore();

const updateLocale = (value) => {
  setLocale(value);
};
</script>

<template>
  <AppSelect :model-value="appLocale" @update:model-value="value => updateLocale(value)">
    <BFormSelectOption v-for="locale in LOCALES" :value="locale.key">{{ locale.label }}</BFormSelectOption>
  </AppSelect>
</template>
