<template>
  <div class="page">
    <div class="search-wrap">
      <el-form :inline="true" :model="searchForm" class="">
        <el-form-item label="名称">
          <el-input v-model="searchForm.tite" placeholder="请输入标题" clearable />
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
      <i-table
        :tableData="tableData"
        border
        stripe
        :loading="loading"
        v-model:pageSize="pageSize"
        v-model:pageNum="pageNum"
        :page-total="pageTotal"
      >
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="summary" label="摘要" />
        <el-table-column prop="viewCount" label="浏览量" :width="60" />
        <el-table-column prop="commentCount" label="评论量" :width="60" />
        <el-table-column prop="likeCount" label="点赞量" :width="60" />
        <el-table-column prop="favoriteCount" label="收藏量" :width="60" />
        <el-table-column prop="createAt" label="创建时间" />
        <el-table-column prop="updateAt" label="更新时间" />
        <el-table-column prop="action" label="操作">
          <template #default="{ row }">
            <el-icon @click="() => handleDelete(row)"><DeleteFilled /></el-icon>
            <el-icon @click="() => handleEdit(row)"><Edit /></el-icon>
          </template>
        </el-table-column>
      </i-table>
    </div>
    <TopicFormDialog
      v-model:visible="editCategoryState.visible"
      :title="editCategoryState.title"
      :mode="editCategoryState.mode"
      :id="editCategoryState.id"
      @submit-success="handleSubmitSuccess"
    ></TopicFormDialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from 'vue'
import TopicFormDialog from './component/TopicFormDialog.vue'
import { useAsyncState } from '@vueuse/core'
import { deleteCategory, queryCategoryList } from '@/api/modules/category'
import { CircleCheckFilled, DeleteFilled, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteTopic, queryTopicList } from '@/api/modules/topic'
import ITable from '@/components/i-table/index.vue'
import { usePageList } from '@/hooks/usePageList'

const searchForm = reactive({
  tite: ''
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

const { tableData, pageSize, pageNum, pageTotal, getTableList, loading } = usePageList(
  queryTopicList,
  { titel: searchForm.tite }
)

const handleDelete = (row) => {
  ElMessageBox.confirm('确认删除', '提醒').then(async () => {
    await deleteTopic({ id: row.id })
    ElMessage.success('删除成功')
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

const handleCurrentChange = (val) => {
  console.log('cur change', val)
  page.pageNum = val
  getTableList()
}

const handleSizeChange = (val) => {
  page.pageSize = val
  getTableList()
}

onMounted(() => {
  console.log('sss')
})
</script>
<style lang="scss" scoped>
.page {
  /* display: none; */
  //   margin-bottom: 12px;
  //   border-bottom: 1px solid #f0f2f5;
}
</style>
