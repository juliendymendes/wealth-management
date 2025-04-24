<script setup>
import Icon from '@/components/icons/Icon.vue';
import { BButton, BCard, BCollapse } from 'bootstrap-vue-next';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import AppSelect from './AppSelect.vue';

const { t } = useI18n();
const filtersAppliedVisible = ref(true);
</script>

<template>
  <BCard no-body>
    <div class="d-flex flex-wrap flex-md-nowrap flex-row justify-content-between align-items-center bg-light pe-3">
      <div role="button" class="p-2 p-md-3" :class="filtersAppliedVisible ? null : 'collapsed'"
        :aria-expanded="filtersAppliedVisible ? 'true' : 'false'" aria-controls="collapse-4"
        @click="filtersAppliedVisible = !filtersAppliedVisible">
        <div class="d-flex">
          <Icon name="chevron-down" />
          <span class="fw-semibold ms-2 fs-responsive">{{ t('FILTER.TITLE') }}</span>
        </div>
      </div>
      <div class="d-flex gap-2 p-1 p-md-0">
        <AppSelect model-value="favorites" @update:model-value="() => { }">
          <option value="favorites">{{ t('FILTER.FAVORITES') }}</option>
        </AppSelect>
        <AppSelect model-value="more-filters" @update:model-value="() => { }">
          <option value="more-filters">{{ t('FILTER.MORE_FILTERS') }}</option>
        </AppSelect>
      </div>
    </div>
    <BCollapse id="collapse-4" v-model="filtersAppliedVisible" class="mt-2">
      <div class="d-flex gap-2 px-4 py-3">
        <p><strong> {{ t('FILTER.OPTIONS.STATUS.TITLE') }}</strong>: {{ t('FILTER.OPTIONS.STATUS.REGISTERED') }}</p>
        <Icon name="chevron-down" />
        <Icon name="x-circle-fill" />
      </div>
    </BCollapse>
  </BCard>
</template>
