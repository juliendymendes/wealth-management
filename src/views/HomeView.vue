<script setup>
import { computed, ref } from 'vue'
import items from '@/mocks/items';
import { useI18n } from 'vue-i18n';
import Filters from '@/components/Filters.vue';
import AppSelect from '@/components/AppSelect.vue';
import AppTable from '@/components/AppTable.vue';
import AppPagination from '@/components/AppPagination.vue';
import ItemsPageHeader from '@/components/ItemsPageHeader.vue';
const { t } = useI18n();

const currentPage = ref(1);
const perPage = ref(5);

const rows = computed(() => items.length);

const pageOptions = [5, 10, 20, 50, 100]

</script>

<template>
  <main class="mt-5">
    <ItemsPageHeader />
    <Filters />
    <div class="mt-5 d-flex flex-column gap-4 w-100">
      <div class="d-flex align-items-end align-self-end">
        <AppSelect model-value="results" @update:model-value="() => { }">
          <option value="results">{{ t('TABLE_VIEW.OPTIONS.RESULTS') }}</option>
        </AppSelect>
      </div>

      <AppTable :current-page="currentPage" :per-page="perPage" />

      <AppPagination :current-page="currentPage" :per-page="perPage" :total-rows="rows" :page-options="pageOptions"
        @update:currentPage="value => currentPage = value" @update:perPage="value => perPage = value" />
    </div>
  </main>
</template>
