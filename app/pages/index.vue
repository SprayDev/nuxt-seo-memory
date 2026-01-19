<script setup lang="ts">

const getDefaultCachedData = (key: string, nuxtApp) => {
  return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
}

const { data, pending: examplesLoading } = await useApiData(
  'calculator-examples',
  () => $fetch('https://jsonplaceholder.typicode.com/posts'),
  {
    getCachedData: getDefaultCachedData,
  }
)

</script>

<template>
  <div>
    {{data}}
  </div>
</template>

<style scoped>

</style>
