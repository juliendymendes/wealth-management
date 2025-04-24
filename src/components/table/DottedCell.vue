<script setup>
defineProps({
  row: {
    type: Object,
    required: true,
  },
  expandedRowIndexes: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div :class="[{ 'dotted-line': (expandedRowIndexes?.includes(row.index - 1)) }, {
    'dotted-line-visible': (
      expandedRowIndexes?.includes(row.index) && expandedRowIndexes && row.index != 0) ||
      (row.index !== Math.min(...expandedRowIndexes))
  }]">
  </div>
  <div v-if="expandedRowIndexes?.includes(row.index) && expandedRowIndexes && row.index !== row.items.length - 1"
    class="dotted-cell"></div>
</template>
