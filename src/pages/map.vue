<template>
  <q-page>
    <div class="amap-container" id="amap"></div>
  </q-page>
</template>
<script setup lang="ts" name="map">
import { shallowRef, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const map = shallowRef()

onMounted(() => {
  initMap()
})

const initMap = () => {
  AMapLoader.load({
    key: import.meta.env.VITE_APP_AMAP_KEY,
    version: '2.0',
    AMapUI: {
      version: '1.1',
      plugins: []
    },
    Loca: {
      version: '2.0.0'
    }
  }).then((AMap) => {
    const center = JSON.parse(import.meta.env.VITE_APP_MAP_CENTER)
    map.value = new AMap.Map('amap', {
      center,
      zoom: import.meta.env.VITE_APP_MAP_ZOOM
    })
  })
}
</script>
<style lang="scss" scoped>
  .amap-container {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
  }
</style>