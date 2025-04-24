<script setup>
import { useI18n } from 'vue-i18n';
import LocaleSelector from './LocaleSelector.vue';

const { t } = useI18n();
</script>

<template>
  <header class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h1 class="text-secondary fw-normal fs-6">{{ t('PAGE_TITLE') }}</h1>
      <h2>{{ t('ITEMS_SECTION_TITLE') }}</h2>
    </div>

    <LocaleSelector />

  </header>
</template>
