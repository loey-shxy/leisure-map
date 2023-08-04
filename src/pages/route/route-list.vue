<template>
  <div class="favorite-routes">
    <var-sticky>
      <div class="add-route" @click="toAdd">
        <div class="text">去添加一趟新的旅程吧</div>
        <var-icon name="plus" />
      </div>
    </var-sticky>

    <var-list 
      :finished="finished"
      v-model:loading="loading"
      @load="loadList">
      <template v-for="item in favoriteRoutes">
        <var-style-provider 
        :style-vars="{
          '--card-row-height': '60px',
          '--card-floating-buttons-bottom': '60px',
          '--card-footer-margin': '2vw'
        }">
        <var-card
          :key="item.id"
          ripple
          v-model:floating="floating[item.id]"
          @click="floating[item.id] = true"
          >
            <template #title>
              <div class="list-title">
                <img src="@/assets/images/list_icon.png" class="img" />
                <div class="title-text">{{ item.name }}</div>
              </div>
            </template>
            <template #subtitle>
              <var-row class="list-sub_title">
                <var-col :span="12">
                  <img class="icon" src="@/assets/images/start.png" alt="" />
                  <div>{{ item.from }}</div>
                </var-col>
                <var-col :span="12">
                  <img class="icon" src="@/assets/images/end.png" alt="" />
                  <div>{{ item.to }}</div>
                </var-col>
              </var-row>
            </template>
            <template #extra>
              <var-space>
                <var-icon name="map-marker-radius" color="var(--color-primary)" @click="toMap(item)" />
                <var-icon v-if="item.favorite" name="heart" color="var(--color-warning)" />
                <var-icon v-else name="heart-outline" color="var(--color-warning)" />
                <var-icon name="trash-can-outline" color="var(--color-danger)" @click="del(item)" />
              </var-space>
            </template>
            <template #floating-content>
              <var-divider dashed />
              <div class="list-desc">
                <var-steps 
                  direction="vertical" 
                  active=""
                  inactive-color="#e99eb4"
                >
                  <var-step
                    v-for="col in item.pathway" 
                    :key="col.id"
                    inactive-icon="map-marker-outline"
                  >
                    <div class="collection">
                      <div class="location">{{ col.name }}</div>
                      <div class="desc">{{ col.desc }}</div>
                    </div>
                  </var-step>
                </var-steps>
              </div>
            </template>
          </var-card>
        </var-style-provider>
      </template>
    </var-list>
    <var-back-top 
      :duration="300"
      right="16"
      bottom="100"
    />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import useTable from '@/hooks/useTable'
import { FavoriteRoute } from '@/interface/route'
import { apiRouteList } from '@/apis/route'

const router = useRouter()
const loading = ref(false)
const finished = ref(false)
const floating = reactive<{ [key: number|string]: boolean }>({})
// 路线列表
const favoriteRoutes = ref<Array<FavoriteRoute>>([])

const { tableData, searchTable } = useTable<FavoriteRoute>(
  {},
  apiRouteList
)

const loadList = () => {
  if (favoriteRoutes.value.length < tableData.tableParams.total) {
    tableData.tableParams.pageNum++
    searchTable()
  } else {
    finished.value = true
  }
  loading.value = false
}

const toAdd = () => {
  router.push({ name: 'add-route' })
}

const toMap = (item: FavoriteRoute) => {
  router.push({
    name: 'map',
    query: { routeId: item.id }
  })
}

const del = (item: FavoriteRoute) => {
  // 
}

watch(
  () => tableData.list, 
  () => {
    favoriteRoutes.value = [...favoriteRoutes.value, ...tableData.list]
    favoriteRoutes.value.forEach(item => {
      floating[item.id] = false
    })
  }
)

</script>
<style lang="scss" scoped>
.favorite-routes {
  padding: 16px;
  :deep(.var-card) {
    margin-top: 16px;
  } 
  :deep(.var-card__container) {
    padding: 16px;
  }
  .list-title {
    display: flex;
    align-items: center;

    .img {
      width: 30px;
      height: 30px;
      margin-right: 16px;
    }
  }
  .list-sub_title {
    display: flex;
    align-items: center;
    margin-top: 16px;
    .icon {
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }
  }
  :deep(.var-card__floater) {
    top: 55px !important;
    bottom: 50px !important;
  }
  .list-desc {
    line-height: 28px;
  }

  .add-route {
    display: flex;
    align-items: center;
    padding: 16px;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 4px;
    box-shadow:  -1px 1px 2px -1px rgba(0, 0, 0, 0.2), 1px 1px 2px -1px rgba(0, 0, 0, 0.2);
  }
}
</style>