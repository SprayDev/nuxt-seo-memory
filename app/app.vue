<script setup lang="ts">
import {useCurrency} from "~/composables/useCurrency";

const {getRateData} = useCurrency()

await callOnce(async () => {
  try {
    await getRateData()
  } catch (e) {
    console.warn(e)
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
