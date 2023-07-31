import { useAsyncState } from '@vueuse/core'
import { reactive, ref, watch } from 'vue'

interface Param {
  fetchFn: (...args: any) => Promise<any>
}

export const usePageList = (fetchFn: (...args: any) => Promise<any>, params: any) => {
  const tableData = ref([])
  const pageNum = ref(1)
  const pageSize = ref(10)
  const pageTotal = ref(0)
  const { state, execute, isLoading } = useAsyncState(
    () => fetchFn({ ...params, ...{ pageNum: pageNum.value, pageSize: pageSize.value } }),
    [],
    {
      resetOnExecute: false
    }
  )

  watch(state, (val) => {
    console.log('watch', val)
    tableData.value = val.records
    pageTotal.value = val.total
  })

  watch([pageNum ,pageSize], ([pageNum, pageSize]) => {
    execute()
  })

  return {
    tableData,
    getTableList: execute,
    loading: isLoading,
    pageNum,
    pageSize,
    pageTotal
  }
}
