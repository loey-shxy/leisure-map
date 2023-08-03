<template>
  <div class="page-footer">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup name="page-footer">

</script>
<style lang="scss" scoped>
  .page-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
  }
</style>