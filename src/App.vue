<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { BFormSelect, BFormSelectOption } from 'bootstrap-vue-next';

import { useI18n } from 'vue-i18n';
import { LOCALES } from './constants';

const { locale, t } = useI18n();

</script>

<template>
  <div class="container py-5">
    <header class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="text-secondary fw-normal fs-6">{{ t('PAGE_TITLE') }}</h1>
        <h2>{{ t('ITEMS_SECTION_TITLE') }}</h2>
      </div>

      <BFormSelect v-model="locale" size="sm" class="w-auto py-2">
        <BFormSelectOption v-for="locale in LOCALES" :value="locale.key">{{ locale.label }}</BFormSelectOption>
      </BFormSelect>

    </header>

    <RouterView />
  </div>
</template>

<style scoped></style>
