<script setup>
import { BPagination, BFormSelectOption, BFormInput } from 'bootstrap-vue-next';
import { computed } from 'vue';
import AppSelect from '@/components/AppSelect.vue';

const { currentPage, perPage, totalRows, pageOptions } = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  totalRows: {
    type: Number,
    required: true,
  },
  pageOptions: {
    type: Array,
    default: () => [5, 10, 20, 50, 100],
  },
});

const emit = defineEmits(['update:currentPage', 'update:perPage']);

const totalPages = computed(() => Math.ceil(totalRows / perPage));

const goToPage = (inputPage) => {
  if (inputPage >= 1 && inputPage <= totalPages.value) {
    emit('update:currentPage', inputPage);
  }
};
</script>

<template>
  <div class="d-flex flex-wrap gap-3 justify-content-center justify-content-md-end">
    <div class="d-flex align-items-center mb-3 gap-2">
      <AppSelect :model-value="perPage" @update:model-value="value => emit('update:perPage', value)">
        <BFormSelectOption v-for="option in pageOptions" :key="option" :value="option">
          {{ option }} / {{ $t('TABLE.PAGINATION.PAGE').toLowerCase() }}
        </BFormSelectOption>
      </AppSelect>
    </div>

    <BPagination :model-value="currentPage" :total-rows="totalRows" :per-page="perPage" first-number last-number
      class="gap-2" @update:model-value="page => emit('update:currentPage', page)">
      <template #page="data">
        <span class="text-secondary">
          {{ data.page }}
        </span>
      </template>
    </BPagination>

    <div class="d-flex align-items-center mb-3 gap-2">
      <span>{{ $t('TABLE.PAGINATION.GO_TO') }}</span>
      <BFormInput id="pageInput" type="number" :min="1" :max="totalPages" @keyup.enter="goToPage($event.target.value)"
        @blur="goToPage($event.target.value)" class="w-50" />
    </div>
  </div>
</template>
