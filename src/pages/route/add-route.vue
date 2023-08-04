<template>
  <div class="add-route">
    <var-form
      ref="formRef"
      scroll-to-error="start"
    >
      <var-space direction="column" :size="[16, 0]">
        <var-input 
          placeholder="名称"
          :rules="[v => !!v || '名称不能为空']"
          size="small"
          v-model="form.name"
        >
        </var-input>

        <var-input 
          placeholder="起点"
          :rules="[v => !!v || '起点不能为空']"
          size="small"
          readonly
          v-model="form.from"
          @click="inputFocus('from')"
        >
        </var-input>
        
        <var-steps 
          direction="vertical" 
          active=""
          inactive-color="#e99eb4"
        >
          <var-step
            v-for="(col, index) in pathway" 
            :key="index"
            inactive-icon="map-marker-outline"
          >
            <div class="collection">
              <div class="input-wrap">
                <var-input 
                  placeholder="地名"
                  v-model="col.name"
                  :rules="[v => !!v || '地名不能为空']"
                  size="small"
                  readonly
                  @click="inputFocus(index)"
                />
                <var-input 
                  v-model="col.desc"
                  textarea 
                  rows="5"
                  placeholder="备注"
                  size="small"
                />
              </div>
              <div class="delete-wrap">
                <var-icon 
                  name="trash-can-outline" 
                  color="var(--color-danger)"
                  @click="delCollection(index)"
                />
              </div>
            </div>
          </var-step>
        </var-steps>

        <div class="btn">
          <var-button 
            type="primary" 
            size="small" 
            @click="addOther"
          >添加途径地</var-button>
        </div>

        <var-input
          placeholder="终点"
          :rules="[v => !!v || '终点不能为空']"
          v-model="form.to"
          size="small"
          readonly
          @click="inputFocus('to')"
        >
        </var-input>
      </var-space>
    </var-form>

    <SearchPlace 
      v-if="popupShow" 
      :default-place="focusLocation"
      @cancel="closePopup"
      @confirm="confirmLocation"
    />
  </div>
  <div class="submit-btn">
    <var-button type="primary" block>提交</var-button>
  </div>
</template>
<script setup name="add-route" lang="ts">
import { ref, reactive } from 'vue'
import { AddFavoriteRoute, Pathway, MapSearchResult } from '@/interface/route'
import SearchPlace from './components/search-place.vue';

// 显示地点搜索地图
const popupShow = ref(false)
// 存储当前操作的key
const focusInput = ref<string | number>('')
const formRef = ref(null)

const form = reactive<AddFavoriteRoute>({
  name: '',
  from: '',
  to: '',
  fromLocation: [],
  toLocation: []
})

const focusLocation = reactive<{ name: string; location: number[] }>({
  name: '',
  location: []
})

const pathwayRef = ref<Array<Pathway>>([])
const pathway = pathwayRef.value

/** 
 * @description 添加新的途径地
*/
const addOther = () => {
  pathway.push({
    name: '',
    desc: '',
    location: []
  })
}

const delCollection = (index: number) => {
  pathway.splice(index, 1)
}

const confirmLocation = (params: MapSearchResult) => {
  closePopup()
  if (typeof focusInput.value === 'number') {
    pathway[focusInput.value].name = `${params.district}${params.name}`
    pathway[focusInput.value].location = params.location
  } else {
    form[focusInput.value] = `${params.district}${params.name}`
    form[`${focusInput.value}Location`] = params.location
  }
}

const closePopup = () => {
  popupShow.value = false
}

const inputFocus = (key: string | number) => {
  focusInput.value = key
  popupShow.value = true
  if (typeof key === 'number' && !pathway[key].name) {
    focusLocation.name = pathway[key].name
    focusLocation.location = pathway[key].location
  } else {
    focusLocation.name = form[key]
    focusLocation.location = form[`${key}Location`]
  }
} 
const addRoute = () => {

}

</script>
<style lang="scss" scoped>
.add-route {
  padding: 16px;
  position: relative;
  .prepend-icon {
    width: 16px;
    margin-right: 10px;
  }
  .btn {
    text-align: right;
  }
  :deep(.var-step__vertical-content) {
    flex: 1;
  }
  .collection {
    display: flex;
    justify-content: space-between;
    .input-wrap {
      flex: 1;
    }
    .delete-wrap {
      width: 30px;
      padding-top: 16px;
      text-align: right;
    }
  }
}
.submit-btn {
  position: fixed;
  bottom: 60px;
  width: 100%;
  z-index: 5;
}
</style>