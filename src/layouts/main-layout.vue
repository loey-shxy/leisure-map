<template >
  <q-layout id="main-layout">
    <q-header class="bg-teal">
      <q-toolbar>
        <q-btn
          class="desktop-menu"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          ></q-btn>
          <q-img height="40px" width="40px" />
          <q-toolbar-title class="q-pl-xs">在路上</q-toolbar-title>
          <q-btn flat round dense icon="account_circle" to="/account" />
          <!-- <q-btn to="/auth" flat round dense icon="login" /> -->
      </q-toolbar>
    </q-header>
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
      >
        <q-scroll-area id="menu-section">
          <q-list padding>
            <q-item clickable v-ripple to="/map">
              <q-item-section avatar>
                <q-icon name="explore" />
              </q-item-section>
              <q-item-section> 地 图 </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/route">
              <q-item-section avatar>
                <q-icon name="directions" />
              </q-item-section>

              <q-item-section> 线 路 </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/recommend">
              <q-item-section avatar>
                <q-icon name="recommend" />
              </q-item-section>

              <q-item-section> 推 荐 </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/account">
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>
              <q-item-section> 我 的 </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

          <div class="bg-dark text-white q-pa-md absolute-top area-height">
            <q-item-section avatar class="row">
                <!-- <div v-if="userStore.getEmail">
                  <q-icon size="20px" name="verified_user" />
                  <span  class="q-pl-sm">{{ userStore.getFirstName }} {{ userStore.getLastName }}</span>
                </div> -->
                <!-- <div v-else> -->
                  <q-icon size="20px" name="do_not_disturb" />
                  <!-- <span  class="q-pl-sm">No user logged in</span> -->
                <!-- </div> -->
            </q-item-section>
          </div>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer id="mobile-menu" elevated class="bg-white">
      <q-tabs class="bg-teal text-light shadow-2">
        <q-route-tab to="/map" label="地图" name="explore" icon="explore" class="icon-size"/>
        <q-route-tab to="/route" label="线路" name="directions" icon="directions" class="icon-size"/>
        <q-route-tab to="/recommend" label="推荐" name="recommend" icon="recommend" class="icon-size"/>
        <q-route-tab to="/account" label="我的" name="我的" icon="account_circle" class="icon-size"/>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<script setup lang="ts" name="main-layout">
import { ref } from 'vue';

const leftDrawerOpen = ref(false)
</script>
<style lang="scss">
.area-height {
  height: 50px;
}
#menu-section {
  height: calc(100% - 50px);
  margin-top: 50px;
  border-right: 1px solid #ddd
}
@media (min-width: $breakpoint-sm-max) {
  #mobile-menu {
    display: none;
  }
}

@media (max-width: $breakpoint-sm-max) {
  .desktop-menu {
    display: none;
  }
}
</style>