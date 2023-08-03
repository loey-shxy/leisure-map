<template>
  <div class="add-route">
    <var-form
      ref="form"
      scroll-to-error="start"
    >
        <var-space direction="column" :size="[16, 0]">
          <var-input 
            :rules="[v => !!v || '起点不能为空']"
            v-model="form.from"
            @focus="inputFocus('from')"
            size="small"
          >
            <template #prepend-icon>
              <img class="prepend-icon" src="@/assets/images/start.png" />
            </template>
          </var-input>
          
          <var-steps 
            direction="vertical" 
            active=""
            inactive-color="#e99eb4"
          >
            <var-step
              v-for="(col, index) in collections" 
              :key="index"
              inactive-icon="map-marker-outline"
            >
              <div class="collection">
                <div class="input-wrap">
                  <var-input 
                    placeholder="地名"
                    v-model="col.county"
                    size="small"
                    @focus="inputFocus(`${index}county`)"
                  />
                  <var-input 
                    v-model="col.desc"
                    textarea 
                    rows="5"
                    placeholder="备注"
                    size="small"
                    @focus="inputFocus(`${index}desc`)"
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
            <var-button type="primary" size="small" @click="addOther">添加途径地</var-button>
          </div>

          <var-input
            :rules="[v => !!v || '终点不能为空']"
            v-model="form.to"
            size="small"
            @focus="inputFocus('to')"
          >
            <template #prepend-icon >
              <img class="prepend-icon" src="@/assets/images/end.png" />
            </template>
          </var-input>
          
        </var-space>
      </var-form>
      <SearchPlace 
        v-show="popupShow" 
        @cancel="popupShow = false"
      />
  </div>
  <div class="submit-btn">
    <var-button type="primary" block>提交</var-button>
  </div>
</template>
<script setup name="add-route" lang="ts">
import { ref, reactive } from 'vue'
import { AddRouteParams, Collections } from '@/interface/route'
import SearchPlace from './components/search-place.vue';

const popupShow = ref(false)
const focusInput = ref('')
const form = reactive<AddRouteParams>({
  name: '',
  from: '',
  to: '',
  collections: []
})


const collections = ref<Array<Collections>>([])

const addOther = () => {
  collections.value.push({
    county: '',
    desc: ''
  })
}

const delCollection = (index: number) => {
  collections.value.splice(index, 1)
}

const setPlace = (params: {location: string; point: number[]}) => {
  console.log(params)
}

const inputFocus = (key: string) => {
  focusInput.value = key
  popupShow.value = true
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