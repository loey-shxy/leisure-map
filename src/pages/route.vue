<template>
  <router-view v-slot="{ Component }">
    <transition
      appear
      enter-active-class="animated bounceInLeft"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script setup lang="ts" name="route">
</script>
<style lang="scss" scoped>
  
</style>