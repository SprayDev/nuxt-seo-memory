<script setup lang="ts">
const { data, pending: examplesLoading } = await useApiData(
  'calculator-examples-header',
  () => $fetch('https://jsonplaceholder.typicode.com/posts'),
  {
    immediate: false,
    default() {
      return []
    }
  }
)
</script>

<template>
  <div>
    HEADER:
    {{data?.length}}
  </div>
</template>

<style scoped></style>
