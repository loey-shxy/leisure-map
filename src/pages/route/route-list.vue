<template>
  <div class="favorite-routes">
    Route List
  </div>
</template>
<script setup name="route-list" lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import useTable from '@/hooks/useTable'
import { FavoriteRoute } from '@/interface/route'
import { apiFavoriteRouteList} from '@/apis/route'

const router = useRouter()
const favoriteRoutes = ref<Array<FavoriteRoute>>([])

const { tableData, searchTable } = useTable<FavoriteRoute>(
  {},
  apiFavoriteRouteList
)

watch(() => tableData.list, () => {
  favoriteRoutes.value = [...favoriteRoutes.value, ...tableData.list]
})


const isLoggedInAddRoute = () => {
  router.push({ name: 'add-route' })
}
</script>
<style lang="scss" scoped>

</style>