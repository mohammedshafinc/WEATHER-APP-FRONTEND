<script setup>
import { RouterLink, RouterView } from 'vue-router'
import sitenavigation from './components/sitenavigation.vue'
</script>

<template>

<div class="flex flex-col min-h-screen font-Roboto bg-weather-primary ">
  <sitenavigation/>
  <RouterView />
  
</div>
</template>

<style lang="scss" scoped>

</style>
