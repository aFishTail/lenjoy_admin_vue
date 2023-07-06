<template>
  <div class="search-wrap">
    <el-form :inline="true" :model="searchForm" class="">
      <el-form-item label="名称">
        <el-input v-model="searchForm.name" placeholder="请输入类型名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCreate">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table-wrap">
    <el-table :data="tableData" style="width: 100%" border stripe v-loading="isLoading">
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-icon><CircleCheckFilled :color="row.status === 1 ? '#67C23A' : ''"/></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作">
        <template #default="{ row }">
          
          <el-icon @click="() => handleDelete(row)"><DeleteFilled/></el-icon>
          <el-icon @click="() =>handleEdit(row)"><Edit/></el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <EditCategory
    v-model:visible="editCategoryState.visible"
    :title="editCategoryState.title"
    :mode="editCategoryState.mode"
    :id="editCategoryState.id"
    @submit-success="handleSubmitSuccess"
  ></EditCategory>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from 'vue'
import EditCategory from './component/EditCategory.vue'
import { useAsyncState } from '@vueuse/core'
import { deleteCategory, queryCategoryList } from '@/api/modules/category'
import { CircleCheckFilled, DeleteFilled, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const searchForm = reactive({
  name: ''
})

const onSearch = () => {
  getTableList()
}

const handleCreate = () => {
  editCategoryState.visible = true
  editCategoryState.title = '创建分类'
  editCategoryState.mode = 'create'
  editCategoryState.id = ''
}

const editCategoryState = reactive<{
  visible: boolean
  title: string
  mode: 'create' | 'update' | 'detail'
  id: string
}>({
  visible: false,
  title: '创建',
  mode: 'create',
  id: ''
})

const {
  state: tableData,
  isReady,
  isLoading,
  execute: getTableList
} = useAsyncState(() => queryCategoryList({ name: searchForm.name }), [], { resetOnExecute: true })

const handleDelete = (row) => {
  ElMessageBox.confirm("确认删除", "提醒").then(async() => {
    await deleteCategory({id: row.id})
    ElMessage.success("删除成功")
    getTableList()
  })
}
const handleEdit = (row) => {
  editCategoryState.title = '编辑类型'
  editCategoryState.mode = 'update'
  editCategoryState.id = row.id
  editCategoryState.visible = true
}

const handleSubmitSuccess = () => {
  console.log('ssssss')
  getTableList()
}

onMounted(() => {
  console.log('sss')
})
</script>
<style lang="scss" scoped>
.search-wrap {
  //   margin-bottom: 12px;
  //   border-bottom: 1px solid #f0f2f5;
}
</style>
