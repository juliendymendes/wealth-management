<script setup>
import Icon from '@/components/icons/Icon.vue';
import { BButton, BCard, BCollapse, BTable, BBadge, BPagination, BFormSelect, BFormSelectOption, BFormInput } from 'bootstrap-vue-next';
import { computed, ref } from 'vue'
import items from '@/mocks/items';
import { ITEM_STATUS } from '@/constants';
import { useI18n } from 'vue-i18n';

const { t, n } = useI18n();

const filtersAppliedVisible = ref(true)
const currentPage = ref(1);
const perPage = ref(5);
const inputPage = ref()
const rows = computed(() => items.length);
const fields = ref([
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

const pageOptions = [5, 10, 20, 50, 100]

const totalPages = computed(() => Math.ceil(items.length / perPage.value))

const itemAggregateData = (aggregate) => computed(() => {
  if (aggregate) {
    return { label: t('GENERAL.YES'), variant: 'light-blue' }
  }

  return { label: t('GENERAL.NO'), variant: 'grey' }
})
const itemStatusData = (status) => computed(() => {
  switch (status) {
    case ITEM_STATUS.REGISTERED:
      return { label: t('FILTER.OPTIONS.STATUS.REGISTERED'), variant: 'status-registered' }
    case ITEM_STATUS.INACTIVE:
      return {
        label: t('FILTER.OPTIONS.STATUS.INACTIVE'), variant: 'secondary'
      }
    default:
      return { label: '', variant: 'secondary' }
  }
})

const goToPage = () => {
  if (inputPage.value >= 1 && inputPage.value <= totalPages.value) {
    currentPage.value = inputPage.value
  }
}
const expandedRowIndexes = ref([]);

const toggleRowDetails = (row) => {
  debugger
  if (row.detailsShowing) {
    expandedRowIndexes.value = [];
  } else {
    expandedRowIndexes.value.push(row.index);
  }
  row.toggleDetails();
};
</script>

<template>
  <main class="mt-5">
    <BCard no-body>
      <div class="d-flex flex-wrap flex-md-nowrap flex-row justify-content-between align-items-center bg-light pe-3">
        <div role="button" class="p-2" :class="filtersAppliedVisible ? null : 'collapsed'"
          :aria-expanded="filtersAppliedVisible ? 'true' : 'false'" aria-controls="collapse-4"
          @click="filtersAppliedVisible = !filtersAppliedVisible">
          <div class="d-flex">
            <Icon name="chevron-down" />
            <span class="fw-semibold ms-2 fs-responsive">{{ t('FILTER.TITLE') }}</span>
          </div>
        </div>
        <div class="d-flex gap-2 p-1 p-md-0">
          <BButton size="sm" variant="white" class="d-flex align-items-center gap-1">
            {{ t('FILTER.FAVORITES') }}
            <Icon name="chevron-down" />
          </BButton>
          <BButton size="sm" variant="white" class="d-flex align-items-center gap-1">
            {{ t('FILTER.MORE_FILTERS') }}
            <Icon name="chevron-down" />
          </BButton>
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

    <div class="mt-5 d-flex flex-column gap-4">
      <BButton variant="white" class="align-self-end">
        {{ t('TABLE_VIEW.OPTIONS.RESULTS') }}
        <Icon name="chevron-down" />
      </BButton>

      <BTable :details-td-class="['p-0']" :items="items" :fields="fields" :per-page="perPage"
        :current-page="currentPage" responsive>
        <template #cell(openDetails)="row">
          <BButton size="sm" variant="white" bordered class="mr-2 p-1" @click="toggleRowDetails(row)">
            <Icon :name="row.detailsShowing ? 'chevron-down' : 'chevron-right'" />
          </BButton>
        </template>

        <template #cell(dottedCell)="data">
          <div :class="['dotted-line', {
            'dotted-line-visible': (
              (expandedRowIndexes?.includes(data.index + 1) && expandedRowIndexes?.includes(data.index)) && expandedRowIndexes && data.index != 0) ||
              (data.index !== Math.min(...expandedRowIndexes) && data.index === Math.max(...expandedRowIndexes) + 1)
          }]">
          </div>
          <div v-if="expandedRowIndexes?.includes(data.index) && expandedRowIndexes" class="dotted-cell"></div>
        </template>

        <template #cell(aggregate)="data">
          <div>
            <BBadge class="px-2 aggregate-badge" :variant="itemAggregateData(data.item.aggregate).value.variant"
              bordered>
              {{ itemAggregateData(data.item.aggregate).value.label }}
            </BBadge>
          </div>
        </template>

        <template #cell(status)="data">
          <BBadge :variant="itemStatusData(data.item.status).value.variant" class="status-badge" bordered>
            {{ itemStatusData(data.item.status).value.label }}
          </BBadge>
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

          <div class="position-relative d-flex p-3" style="background-color: #f5f5f5;">

            <div class="dotted-line-extension"></div>

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
      </BTable>

      <div class="d-flex gap-3 justify-content-end">
        <div class="d-flex align-items-center mb-3 gap-2">
          <BFormSelect v-model="perPage" size="sm" class="w-auto py-2">
            <BFormSelectOption v-for="option in pageOptions" :key="option" :value="option">{{ option }} /
              {{ t('TABLE.PAGINATION.PAGE').toLowerCase() }}
            </BFormSelectOption>
          </BFormSelect>
        </div>
        <BPagination v-model="currentPage" :total-rows="rows" :per-page="perPage" first-number last-number
          class="gap-2">
          <template #page="data">
            <span class="text-secondary">
              {{ data.page }}
            </span>
          </template>
        </BPagination>

        <div class="d-flex align-items-center mb-3 gap-2">
          <span>{{ t('TABLE.PAGINATION.GO_TO') }}</span>
          <BFormInput id="pageInput" v-model.number="inputPage" type="number" :min="1" :max="totalPages"
            @keyup.enter="goToPage" @blur="goToPage" class="w-50" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.dotted-line {
  width: 10px;
  height: 16px;
  display: none;
  position: absolute;
  left: 12px;
  top: 0;
  border-left: 2px dashed #d3d3d3;
}

.dotted-line-visible {
  display: flex;
}

.dotted-cell {
  width: 10px;
  height: 25px;
  display: flex;
  position: absolute;
  left: 12px;
  margin-top: 20px;
  border-left: 2px dashed #d3d3d3;
  border-top: 2px dashed #d3d3d3;
}

.dotted-line-extension {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 57px;
  border-left: 2px dashed #d3d3d3;
}


::v-deep(.page-item .page-link) {
  border-radius: var(--bs-pagination-border-radius);
}

.btn-white,
.btn-white:hover {
  background-color: #fff;

  --bs-button-border-width: var(--bs-border-width);
  --bs-button-border-color: var(--bs-border-color-translucent);
  --bs-button-border-radius: 3px;

  border: var(--bs-button-border-width) solid var(--bs-button-border-color);
  border-radius: var(--bs-button-border-radius);

}

.btn-transparent,
.btn-transparent:hover {
  background-color: transparent;
  border: none;
}

.text-bg-status-registered {
  background-color: #F0FAE2;
  color: #AFD297;
  border: 1px solid #AFD297;
}

.text-bg-light-blue {
  background-color: #E3FFFF;
  color: #87C8CA;
  border: 1px solid #87C8CA;
  font-weight: 500;
}

.text-bg-grey {
  background-color: #FCFCFC;
  color: #8D8D8D;
  border: 1px solid #8D8D8D;
  font-weight: 500;
}

.status-badge {
  font-size: 14px;
  font-weight: 500;
  width: 90px;
}

.aggregate-badge {
  width: fit-content;
  font-size: 14px;
}

.fs-responsive {
  font-size: 14px;

  @media (min-width: 576px) {
    font-size: 16px;
  }

  @media (min-width: 768px) {
    font-size: 18px;
  }

}
</style>
