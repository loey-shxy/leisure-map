<template>
  <div class="favoriteRoutes">
    <q-toolbar class="bg-teal-8 text-white">
      <q-toolbar-title></q-toolbar-title>
      <q-btn @click="isLoggedInAddRoute" flat round dense size="20px" icon="add" />
    </q-toolbar>

    <div v-if="favoriteRoutes.length > 0" class="section-title">
      <div class="text-h6 q-mx-sm">选择一条路线出发吧！</div>
    </div>

    <div v-if="favoriteRoutes.length < 1" class="text-center q-pt-lg">
      <q-btn
        @click="isLoggedInAddRoute"
        flat
        round
        dense
        size="33px"
        icon="add_circle_outline"
      />
      <div class="text-h6">添加其他旅程!</div>
      <div class="q-pa-md info">你可以添加你最喜欢或最常见的旅程!</div>
    </div>

    <q-scroll-area v-else class="list">
      <q-separator spaced inset />
      <div id="scroll-target-id" class="q-pa-md scroll-list">
        <q-infinite-scroll @load="loadList" :offset="250" scroll-target="#scroll-target-id">
          <q-list v-for="favoriteRoute in favoriteRoutes" :key="favoriteRoute.id" @click="card = !card">
            <q-expansion-item>
              <template v-slot:header>
                <q-item>
                  <q-item-section top avatar>
                    <q-avatar color="green" text-color="white" icon="directions" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ favoriteRoute.name }}</q-item-label>
                    <q-item-label caption>
                      <div class="q-px-sm q-pb-xs"><b>起点</b>: {{ favoriteRoute.from }}</div>
                      <div class="q-px-sm q-pb-xs"><b>终点</b>: {{ favoriteRoute.to }}</div>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side bottom>
                    <q-btn
                        class="q-ma-sm"
                        size="sm"
                        color="green"
                        label="地图"
                      />
                      <q-btn class="q-mx-sm" size="sm" color="red" label="删除" />
                  </q-item-section>
                </q-item>
              </template>

              <q-card>
                <q-card-section>
                  <div class="q-px-lg q-pb-md">
                    <q-timeline color="secondary">
                      <q-timeline-entry
                          v-for="collection in favoriteRoute.collections"
                          :key="collection.id"
                          :subtitle="collection.county"
                        >
                          <div>一些描述</div>
                        </q-timeline-entry>
                    </q-timeline>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator spaced inset />
          </q-list>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </q-scroll-area>
  </div>
</template>
<script setup name="route-list" lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import useTable from '../../hooks/useTable'
import { FavoriteRoute } from '../../interface/route'
import { apiFavoriteRouteList} from '../../apis/route'

const router = useRouter()
const $q = useQuasar()
const favoriteRoutes = ref<Array<FavoriteRoute>>([])
const card = ref(false)

const { tableData, searchTable } = useTable<FavoriteRoute>(
  {},
  apiFavoriteRouteList
)

watch(() => tableData.list, () => {
  favoriteRoutes.value = [...favoriteRoutes.value, ...tableData.list]
})

const loadList = (index: number, done: Function) => {
  tableData.tableParams.pageNum++
  searchTable()
  done()
}

const isLoggedInAddRoute = () => {
  router.push({ name: 'add-route' })
}
</script>
<style lang="scss">
  .favoriteRoutes {

  .section-title {
    padding: 12px 10px 8px 10px;
    max-width: 500px;
    margin: 0 auto;
  }

  .info {
    font-size: 16px;
  }

  .borderBottom {
    border-bottom: 1px solid rgb(201, 201, 201);
  }

  .list {
    margin: 0 auto;
    height: calc(100vh - 250px);
    max-width: 500px;
  }
  .scroll-list {
    max-height: calc(100vh - 250px);
  }
  .q-item {
    flex: 1;
  }
}
</style>