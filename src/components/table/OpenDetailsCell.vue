<script setup>
import { BButton } from 'bootstrap-vue-next';
import Icon from '../icons/Icon.vue';

const { row, expandedRowIndexes } = defineProps({
  row: {
    type: Object,
    required: true,
  },
  expandedRowIndexes: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:expandedRowIndexes']);

const toggleRowDetails = () => {
  if (row.detailsShowing) {
    const newExpandedRowIndexes = expandedRowIndexes.filter((index) => index !== row.index);
    emit('update:expandedRowIndexes', newExpandedRowIndexes);
  } else {
    expandedRowIndexes.push(row.index);
    emit('update:expandedRowIndexes', expandedRowIndexes);
  }
  row.toggleDetails();
};
</script>

<template>
  <BButton size="sm" variant="white" bordered class="mr-2 p-1" @click="toggleRowDetails">
    <Icon :name="row.detailsShowing ? 'chevron-down' : 'chevron-right'" />
  </BButton>
</template>
