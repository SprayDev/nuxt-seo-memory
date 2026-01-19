<script setup lang="ts">

import HeaderComponent from "~/components/HeaderComponent.vue";
</script>

<template>
  <div>
    <HeaderComponent />
    <slot />
    FOOTER
  </div>
</template>
