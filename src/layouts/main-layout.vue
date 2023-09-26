<template >
  <div class="main-layout">
    <var-app-bar
      image="https://varlet.gitee.io/varlet-ui/tree.jpeg"
      image-linear-gradient="to right top, rgba(29, 68, 147, 0.5) 0%, rgba(74, 198, 170, 0.9) 100%"
      >
        在路上
        <template #left>
          <var-button v-if="showLogo" round text color="transparent" text-color="#fff">
            <div class="logo">
              <img src="@/assets/images/logo.png" />
            </div>
          </var-button>
          <var-icon v-else :size="30" name="chevron-left" @click="back" />
        </template>
        <template #right>
          <var-button round text color="transparent" text-color="#fff">
            <var-icon name="account-circle" size="24" />
          </var-button>
        </template>
      </var-app-bar>

    <div class="page-container">
      <router-view />
    </div>

    <PageFooter>
      <var-style-provider 
        :style-vars="{
          '--bottom-navigation-background-color': 'var(--color-success)',
          '--bottom-navigation-item-active-background-color': 'transparent',
          '--bottom-navigation-item-active-color': '#fff',
          '--bottom-navigation-item-inactive-color': '#ccc'
        }">
        <var-bottom-navigation v-model:active="active">
          <var-bottom-navigation-item label="地图" name="map" icon="map-marker-radius" @click="changeRoute" />
          <var-bottom-navigation-item label="路线" name="route" icon="star" @click="changeRoute" />
          <var-bottom-navigation-item label="推荐" name="recommend" icon="thumb-up" @click="changeRoute" />
          <var-bottom-navigation-item label="我的" name="account" icon="account-circle" @click="changeRoute" />
        </var-bottom-navigation>
      </var-style-provider>
    </PageFooter>
  </div>
</template>
<script setup lang="ts" name="main-layout">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PageFooter from './page-footer.vue'
import { isEmpty } from 'lodash'

const router = useRouter()
const route = useRoute()
const active = ref('map')

watch(route, () => {
  active.value = route?.matched[0].name as string
})

const showLogo = computed(() => {
  return ['map', 'route', 'nearby', 'account'].includes(route?.name as string) && isEmpty(route.query)
})

const changeRoute = (active: string | number) => {
  router.push({ name: active as string })
}

const back = () => {
  router.back()
}

</script>
<style lang="scss" scoped>
.main-layout {
  .logo {
    width: 30px;
    height: 30px;
    img {
      width: 100%;
    }
  }
  &:deep(.var-style-provider) {
    width: 100%;
    display: flex;
  }
  .page-container {
    position: fixed;
    top: 55px;
    bottom: 50px;
    width: 100%;
    overflow-y: auto;
  }
}
</style>