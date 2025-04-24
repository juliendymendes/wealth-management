<script setup>
import { useI18n } from 'vue-i18n';

defineProps({
  row: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
</script>

<template>
  <div class="position-relative d-flex p-3" style="background-color: #f5f5f5;">
    <ul class="list-unstyled my-auto" style="margin-left: 60px;">
      <li><strong> {{ t('TABLE.EXPANDED_DETAILS.ACQUISITION_DATE') }}:</strong> {{
        row.item.acquisitionDate.toLocaleDateString() }}</li>
      <li><strong>{{ t('TABLE.EXPANDED_DETAILS.TRANSFERABLE_ASSET') }}:</strong> {{ row.item.linkedAsset ?
        t('GENERAL.YES')
        :
        t('GENERAL.NO') }}</li>
    </ul>
  </div>
</template>
