<script setup>
import { BFormSelect } from 'bootstrap-vue-next';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <BFormSelect :model-value="modelValue" @update:model-value="value => emit('update:modelValue', value)" size="sm"
    class="w-auto py-2">
    <slot />
  </BFormSelect>
</template>
