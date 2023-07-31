<template>
  <div class="i-table">
    <el-table :data="tableData" border stripe v-loading="loading" v-bind="$attrs">
      <slot></slot>
    </el-table>
    <div class="footer">
      <el-pagination
        background
        layout="sizes,prev, pager, next"
        :current-page="pageNum"
        :page-size="pageSize"
        :total="pageTotal"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Page {
    pageNum: number
    pageSize: number
    total: number
  }

interface TableProps {
  tableData: unknown[]
  loading: boolean
  pageNum: number;
  pageSize: number;
  pageTotal: number;
}

const props = withDefaults(defineProps<TableProps>(), {
  tableData: () => [],
  loading: false,
  pageNum: 1,
  pageSize: 10,
  pageTotal: 0
})

const emit = defineEmits<{
  'update:pageNum':[size: number]
  'update:pageSize':[current: number]
}>()

const handleCurrentChange = (current: number) => {
  emit('update:pageNum', current)
}

const handleSizeChange = (size: number) => {
  emit('update:pageSize', size)
}
</script>
<style lang="scss" scoped>
.i-table {
  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 24px 0;
  }
}
</style>
