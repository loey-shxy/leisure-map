<template>
  <div class="search-place">
    <div class="map-container" id="add-map"></div>
    <div class="map-btn">
      <var-button type="primary" @click="confirm">确定</var-button>
      <var-button @click="cancel">取消</var-button>
    </div>
    <input 
      id="searchinput" 
      v-model="searchKeyword" 
      class="fixed-input"
      v-autofocus
      @input="searchChange"
    />

    <div class="search-result_container" v-if="showResult">
      <div class="result-list" 
        v-for="item in searchResults" 
        :key="item.id"
        @click="select(item)"
      >
        <div class="address">{{ item.name }}</div>
        <div class="district">{{ item.district }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="search-place">
import { ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { debounce } from 'lodash'
import { MapSearchResult } from '@/interface/route'
import placeData from './data'

window._AMapSecurityConfig = {
  // 设置安全密钥
  securityJsCode: import.meta.env.VITE_APP_AMAP_SECURITY_KEY,
};

const props = defineProps({
  defaultPlace: {
    type: Object,
    default: () => ({ name: '', location: []})
  }
})

const emits = defineEmits(['confirm', 'cancel'])
// 模糊搜索关键词
const searchKeyword = ref('')
// 地址模糊搜索结果
const searchResults = ref<Array<MapSearchResult>>([])
// 控制搜索结果显示
const showResult = ref(false)
// 选中的地址
let selectPlace = reactive<MapSearchResult>({} as MapSearchResult)

onMounted(() => {
  setTimeout(() => {
    initMap()
  }, 500)
})

const map = shallowRef()
const autoComplete = shallowRef()
const placeMarker = shallowRef()
/**
 * @description 初始化地图
 */
const initMap = () => {
  AMapLoader.load({
    key: import.meta.env.VITE_APP_AMAP_KEY,
    version: '2.0',
    plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete'],
    AMapUI: {
      version: '1.1',
      plugins: []
    },
    Loca: {
      version: '2.0.0'
    },
  }).then((AMap) => {
    const center = JSON.parse(import.meta.env.VITE_APP_MAP_CENTER)
    map.value = new AMap.Map('add-map', {
      center,
      zoom: import.meta.env.VITE_APP_MAP_ZOOM
    })

    if (props.defaultPlace.name) {
      placeMarker.value = map.value.add(new AMap.Marker({
          position: new AMap.LngLat(props.defaultPlace.location[0], props.defaultPlace.location[1]),
        }));
        map.value.setZoomAndCenter(18, props.defaultPlace.location)
    }

    // autoComplete.value = new AMap.AutoComplete({
    //   input: 'searchinput'
    // })
  })
}

/**
 * @description 模糊搜索 
 */
const searchChange = debounce(() => {
  // if (searchKeyword.value.length >= 2) {
    // autoComplete.value.search(searchKeyword.value, (status: string, result: any) => {
          // searchResults.value = result.tips
    // })
      searchResults.value = placeData as MapSearchResult[]
      showResult.value = true;
      
      if (searchResults.value.length) {
        map.value.setZoomAndCenter(16, searchResults.value[0].location)
      }
  // }
}, 500)

/**
 * @description 选中
 * 在地图中添加选中地的marker
 * 清空搜索结果，隐藏搜索结果下拉列表
 * 地图中心定位到选中地，放大地图
 * @param location 
 */
const select = (location: MapSearchResult) => {
  showResult.value = false
  selectPlace = location
  searchResults.value = []
  placeMarker.value = map.value.add(new AMap.Marker({
      position: new AMap.LngLat(location.location[0], location.location[1]),
  }))
  searchKeyword.value = `${location.district}${location.name}`;
  map.value.setZoomAndCenter(18, location.location)
}

const confirm = () => {
  emits('confirm', selectPlace)
}

const cancel = () => {
  map.value.remove(placeMarker)
  showResult.value = false;
  emits('cancel')
}

const getCurrentLocation = () => {
  // console.log(navigator.geolocation)
  // navigator.geolocation.getCurrentPosition(
  //   (position: any) => {
  //     console.log(position)
  //   }, 
  //   (err: any) => {
  //     console.log(err)
  //   }
  // );
}

watch(
  () => props.defaultPlace, 
  () => {
    if (props.defaultPlace.name) {
      searchKeyword.value = props.defaultPlace.name
    } else {
      getCurrentLocation()
    }
  },
  { immediate: true, deep: true }
)
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
    height: 32px;
    line-height: 32px;
    outline: none;
    border-radius: 5px;
  }

  .search-result_container {
    position: absolute;
    top: 50px;
    left: 10px;
    right: 12px;
    max-height: calc(100% - 100px);
    z-index: 10;
    box-shadow:  -1px 1px 2px -1px rgba(0, 0, 0, 0.2), 1px 1px 2px -1px rgba(0, 0, 0, 0.2);
    background: #fff;
    padding: 0 16px;
    box-sizing: border-box;
    .result-list {
      display: flex;
      line-height: 26px;
      font-size: 12px;
      .district {
        color: #666;
        margin-left: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

    }
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

<style lang="scss">
.amap-sug-result {
  display: none !important;
}
</style>