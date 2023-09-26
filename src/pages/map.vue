<template>
    <div class="amap-container" id="amap"></div>
</template>
<script setup lang="ts" name="map">
import { useRoute } from 'vue-router'
import { FavoriteRoute } from '@/interface/route'
import { apiFavoriteRouteList, apiRouteInfoById } from '@/apis/route'
import useAMap from '@/hooks/useAMap'
import { ref } from 'vue'

let map = ref()
const { initMap } = useAMap()
const colors = ['#3a7afe', '#00c48f', '#ff9f00']

const route = useRoute()
const routeId = ref<number>()

const routeList = ref<Array<FavoriteRoute>>([])

onMounted(async () => {
  const { mapValue } = await initMap()
  map = mapValue
})
/**
 * @description 获取路线详情
 */
const getRouteInfo = async () => {
  const data = await apiRouteInfoById({ id: routeId.value as number })
  routeList.value = [data]
}

/**
 * @description 获取路线列表
 */
const getRouteList = async () => {
  routeList.value = await apiFavoriteRouteList()
}

const locationMarker = ref<any[]>([])
const polylines = ref<any[]>([])

/**
 * @description 添加点与路线
 */
const addRouteToMap = () => {
  routeList.value.forEach((route, index) => {
    const points: AMap.LngLatLike[] = []
    const startIcon = new AMap.Icon({
      size: new AMap.Size(25, 34),
      image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
      imageSize: new AMap.Size(135, 40),
      imageOffset: new AMap.Pixel(-9, -3)
    });
    const startMarker = new AMap.Marker({
      position: new AMap.LngLat(route.fromLocation[0], route.fromLocation[1]),
      icon: startIcon,
      offset: new AMap.Pixel(-13, -30)
    });
    locationMarker.value.push(startMarker)
    points.push(new AMap.LngLat(route.fromLocation[0], route.fromLocation[1]))
    
    route.pathway.forEach(pathway => {
      const marker = new AMap.Marker({
        position: new AMap.LngLat(pathway.location[0], pathway.location[1]),
      })
      locationMarker.value.push(marker)
      points.push(new AMap.LngLat(pathway.location[0], pathway.location[1]))
    })

    const endIcon = new AMap.Icon({
      size: new AMap.Size(25, 34),
      image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
      imageSize: new AMap.Size(135, 40),
      imageOffset: new AMap.Pixel(-95, -3)
    });
    const endMarker = new AMap.Marker({
      position: new AMap.LngLat(route.toLocation[0], route.toLocation[1]),
      icon: endIcon,
      offset: new AMap.Pixel(-13, -30)
    });
    locationMarker.value.push(endMarker)
    points.push(new AMap.LngLat(route.toLocation[0], route.toLocation[1]))

    const polyline = new AMap.Polyline({
      path: points,
      isOutline: true,
      outlineColor: '#ffeeff',
      borderWeight: 1,
      strokeColor: colors[index],
      strokeOpacity: 1,
      strokeWeight: 3,
      strokeStyle: 'solid',
      strokeDasharray: [10, 5],
      lineJoin: 'round',
      lineCap: 'round',
      zIndex: 50,
    })
    polylines.value.push(polyline)
  })

  map.value.add(locationMarker.value)
  map.value.add(polylines.value)
  map.value.setFitView()
}


watch(
  () => route.query,
  () => {
    if (route.query.routeId) {
      routeId.value = Number(route.query.routeId)
      getRouteInfo()
    } else {
      getRouteList()
    }
  },
  { immediate: true }
)

watch(
  [map.value, routeList.value],
  async () => {
    setTimeout(() => {
      if (map.value && routeList.value.length) {
        addRouteToMap()
      }
    }, 1000)
  },
  {deep: true, immediate: true}
)
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