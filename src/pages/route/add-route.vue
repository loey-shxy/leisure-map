<template>
  <q-page id="add-route">
    <q-toolbar class="bg-teal-8 text-white">
      <q-toolbar-title>添加旅程</q-toolbar-title>
      <q-btn to="/route" flat round dense icon="favorite" color="red" />
    </q-toolbar>

    <q-scroll-area class="q-pa-md form-style">
        <div class="text-h6 q-pb-md">保存你喜欢的旅程吧!</div>
        <span class="text-body1 q-pb-md">为这趟旅程起一个名字吧</span>

        <q-input
          v-model="form.name"
          outlined
          label="旅程名称"
          stack-label
          error-message="请填写旅程名称"
          :error="errors.name"
        />
        <div class="text-body1 q-pt-md">添加城市</div>
        <q-input
          tabindex="-1"
          v-model="form.from"
          outlined
          label="起点"
          stack-label
          error-message="请填写旅程起点"
          :error="errors.from"
        />
        <q-input
          class="q-pt-md"
          tabindex="-1"
          v-model="form.to"
          outlined
          label="终点"
          stack-label
          error-message="请填写旅程终点"
          :error="errors.to"
        />

        <div class="row justify-end q-pt-md">
          <q-btn size="lg" class="full-width" color="black" label="保存" @click="addRoute"/>
        </div>
      </q-scroll-area>
  </q-page>
</template>
<script setup name="add-route" lang="ts">
import { ref, reactive } from 'vue'
import { AddRouteParams } from '../../interface/route'

const show = ref(false)
const form = reactive<AddRouteParams>({
  name: '',
  from: '',
  to: '',
  collections: []
})

const errors = reactive({
  name: false,
  from: false,
  to: false
})


const validation = () => {
  errors.name = !form.name.length
  errors.from = !form.from.length
  errors.to = !form.to.length
}

const addRoute = () => {
  validation()

  if (Object.values(errors).some(Boolean)) {
    return
  }
}
</script>
<style lang="scss">
  #add-route {
    .form-style {
      margin: 0 auto;
      height: calc(100vh - 180px);
      max-width: 500px;
    }
  }
</style>