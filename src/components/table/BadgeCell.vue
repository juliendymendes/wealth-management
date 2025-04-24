<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { BBadge } from 'bootstrap-vue-next';
import { ITEM_STATUS } from '@/constants';

const { value, type } = defineProps({
  value: {
    type: [Boolean, String],
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (val) => ['aggregate', 'status'].includes(val),
  },
});

const { t } = useI18n();

const badgeData = computed(() => {
  if (type === 'aggregate') {
    return value
      ? { label: t('GENERAL.YES'), variant: 'light-blue' }
      : { label: t('GENERAL.NO'), variant: 'grey' };
  }

  if (type === 'status') {
    switch (value) {
      case ITEM_STATUS.REGISTERED:
        return { label: t('FILTER.OPTIONS.STATUS.REGISTERED'), variant: 'status-registered' };
      case ITEM_STATUS.INACTIVE:
        return { label: t('FILTER.OPTIONS.STATUS.INACTIVE'), variant: 'secondary' };
      default:
        return { label: '', variant: 'secondary' };
    }
  }

  return { label: '', variant: 'grey' };
});
</script>

<template>
  <BBadge :variant="badgeData.variant" class="badge-cell" bordered>
    {{ badgeData.label }}
  </BBadge>
</template>

<style scoped>
.badge-cell {
  font-size: 14px;
  font-weight: 500;
}
</style>
