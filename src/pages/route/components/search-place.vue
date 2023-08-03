<template>
  <div class="search-place">
    <div class="map-container" id="add-map"></div>
    <div class="map-btn">
      <var-button type="primary" @click="confirm">确定</var-button>
      <var-button @click="cancel">取消</var-button>
    </div>
    <var-input 
      id="searchinput" 
      v-model="search" 
      variant="outlined" 
      size="small"
      class="fixed-input"
    />
  </div>
</template>
<script setup lang="ts" name="search-place">
import { ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const emits = defineEmits(['confirm', 'cancel'])

const search = ref('')
const searchAddress: any = reactive({
  address: ''
})

onMounted(() => {
  setTimeout(() => {
    initMap()
  }, 500)
})

const map = shallowRef(null)
/**
 * @description 初始化地图
 */
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
    },
    plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete']
  }).then((AMap) => {
    const center = JSON.parse(import.meta.env.VITE_APP_MAP_CENTER)
    map.value = new AMap.Map('add-map', {
      center,
      zoom: import.meta.env.VITE_APP_MAP_ZOOM
    })

    searchMap(AMap)
  })
}

/**
 * @description 模糊搜索 
 */
const searchMap = (AMap: any) => {
  console.log(AMap)
  AMap.plugin('AMap.Autocomplete', function(){
    const autoComplete= new AMap.Autocomplete({
      // input 为绑定输入提示功能的input的DOM ID
      input: 'searchinput'
    });
    autoComplete.on('select', (e) => {
      console.log(e)
    })
  })

}

const confirm = () => {
  emits('confirm')
}

const cancel = () => {
  emits('cancel')
}
</script>
<style lang="scss" scoped>
.search-place {
  position: fixed;
  top: 55px;
  bottom: 50px;
  left: 0;
  right: 0;
  z-index: 6;
  background-color: #fff;
  .map-container {
    position: fixed;
    top: 55px;
    bottom: 50px;
    left: 0;
    right: 0;
    z-index: 6;
    background-color: #fff;
  }

  .fixed-input {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    z-index: 10;
    background-color: #fff;
  }

  .map-btn {
    position: fixed;
    bottom: 66px;
    z-index: 10;
    left: 16px;
    display: flex;
    right: 16px;
    justify-content: space-between;
  }
}
</style>