<script setup>
import Icon from '@/components/icons/Icon.vue';
import { BButton, BTable } from 'bootstrap-vue-next';
import { computed, ref } from 'vue'
import items from '@/mocks/items';
import { useI18n } from 'vue-i18n';
import OpenDetailsCell from './table/OpenDetailsCell.vue';
import BadgeCell from './table/BadgeCell.vue';
import TableItemDetails from './table/TableItemDetails.vue';
import DottedCell from './table/DottedCell.vue';

const { currentPage, perPage } = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
});

const { t, n } = useI18n();

const expandedRowIndexes = ref([]);

const fields = computed(() => [
  {
    key: 'openDetails',
    label: ' ',
    sortable: false,
  },
  {
    key: 'dottedCell',
    label: ' ',
    sortable: false,
    tdClass: 'position-relative p-0'
  },
  {
    key: 'aggregate',
    label: t('TABLE.FIELDS.AGGREGATE'),
    sortable: false,
  },
  {
    key: 'assetTag',
    label: t('TABLE.FIELDS.ASSET_TAG'),
    sortable: false,
  },
  {
    key: 'assetTagSAMP',
    label: t('TABLE.FIELDS.ASSET_TAG_SAMP'),
    sortable: false,
  },
  {
    key: 'itemNumber',
    label: t('TABLE.FIELDS.ITEM_NUMBER'),
    sortable: false,
    formatter: (value) => {
      if (typeof value !== 'number' && typeof value !== 'string') return value
      const digits = value.toString().padStart(11, '0').replace(/\D/g, '')
      return digits.replace(/^(\d{2})(\d{2})(\d{2})(\d{4})(\d{1})$/, '$1.$2.$3.$4-$5')
    },
  },
  {
    key: 'name',
    label: t('TABLE.FIELDS.NAME'),
    sortable: false,
    formatter: (value) => {
      if (typeof value !== 'string') return value
      return value.toUpperCase()
    },
  },
  {
    key: 'acquisitionValue',
    label: t('TABLE.FIELDS.ACQUISITION_VALUE'),
    sortable: false,
    thClass: 'text-end',
  },
  {
    key: 'status',
    label: t('TABLE.FIELDS.STATUS'),
    sortable: false,
  },
  {
    key: 'options',
    label: t('TABLE.FIELDS.OPTIONS'),
    sortable: false,
    thClass: 'text-center',
    tdClass: 'text-center',
  }
])
</script>

<template>
  <BTable :details-td-class="['p-0']" :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage"
    responsive>
    <template #cell(openDetails)="row">
      <OpenDetailsCell :row="row" :expanded-row-indexes="expandedRowIndexes"
        @update:expanded-row-indexes="value => expandedRowIndexes = value" />
    </template>

    <template #cell(dottedCell)="row">
      <DottedCell :row="row" :expanded-row-indexes="expandedRowIndexes" />
    </template>

    <template #cell(aggregate)="row">
      <BadgeCell :value="row.item.aggregate" type="aggregate" />
    </template>

    <template #cell(status)="row">
      <BadgeCell :value="row.item.status" type="status" />
    </template>

    <template #cell(options)="">
      <BButton size="sm" variant="transparent" class="p-1">
        <Icon name="three-dots-vertical" />
      </BButton>
    </template>

    <template #cell(acquisitionValue)="data">
      <p class="text-secondary text-end m-0">
        {{ n(Number(data.item.acquisitionValue), 'currency') }}
      </p>
    </template>

    <template #row-details="row">
      <TableItemDetails :row="row" />
    </template>
  </BTable>
</template>
