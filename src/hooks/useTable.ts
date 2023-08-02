import { reactive } from 'vue'
import { cloneDeep } from 'lodash'
import { PagingQuery } from '../interface/common'

export default function useTable<T>(
  params: { [key: string]: any }, // 查询参数
  initFunction: Function, // 初始化方法
  activated = true // 是否触发onActivated(取决于当前路由是否需要被缓存，若缓存了不传，否则传false)
) {
  const basicParams: PagingQuery = {
    pageSize: 10,
    pageNum: 1,
    total: 0
  }

  const tableParams = Object.assign(cloneDeep(basicParams), params)
  const tableData = reactive({
    tableParams: cloneDeep(tableParams),
    list: [] as Array<T>
  })

  onMounted(() => {
    initTable()
  })

  onActivated(() => {
    initTable()
  })

  /**
   * @description 初始化表格数据
   */
  const initTable = async () => {
    const params = { ...tableData.tableParams }
    for (const key in params) {
      if (params[key] === '' || params[key] === null || params[key] === undefined) {
        delete params[key]
      }
    }

    const result = await initFunction(params)
    tableData.tableParams.total = result.total
    tableData.list = result.list
  }

  /**
   * @description 重置表格数据
   */
  const resetTable = () => {
    for (const key in tableParams) {
      tableData.tableParams[key] = tableParams[key]
    }
    initTable()
  }

  /**
   * @description 搜索
   */
  const searchTable = () => {
    tableData.tableParams.pageNum = 1
    initTable()
  }

  watch(() => tableData.tableParams.pageNum, initTable)
  watch(() => tableData.tableParams.pageSize, initTable)

  return {
    tableData,
    initTable,
    resetTable,
    searchTable
  }
}