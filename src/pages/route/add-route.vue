<template>
  <div>Add Route</div>
</template>
<script setup name="add-route" lang="ts">
import { ref, reactive } from 'vue'
import { AddRouteParams } from '@/interface/route'

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