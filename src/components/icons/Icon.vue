<template>
  <i :class="`bi bi-${name}`" :style="{ fontSize: size }"></i>
</template>

<script setup>
defineProps({
  name: String,
  size: {
    type: String,
    default: '1em'
  }
})
</script>
