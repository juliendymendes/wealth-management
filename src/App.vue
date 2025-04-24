<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { BFormSelect, BFormSelectOption } from 'bootstrap-vue-next';
import AppSelect from '@/components/AppSelect.vue';

import { useI18n } from 'vue-i18n';
import { LOCALES } from './constants';

const { locale, t } = useI18n();

</script>

<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped></style>
