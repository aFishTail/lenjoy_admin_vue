<template>
  <div class="search-wrap">
    <el-form :inline="true" :model="formInline" class="">
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCreate">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table-wrap">
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="description" label="描述" width="180" />
      <el-table-column prop="status" label="状态" >
        <template #default="scope">
          <el-icon><CircleCheckFilled /></el-icon>
      </template>
      </el-table-column>
    </el-table>
  </div>
  <EditCategory v-model:visible="editCategoryState.visible" :title="editCategoryState.title" :mode="editCategoryState.mode"></EditCategory>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import EditCategory from './component/EditCategory.vue';
import { useAsyncState } from '@vueuse/core';
import { queryCategoryList } from '@/api/modules/category';
import {CircleCheckFilled} from '@element-plus/icons-vue'

const formInline = reactive({
  user: '',
  region: '',
  date: ''
})

const onSubmit = () => {
  console.log('submit!')
}

const handleCreate = () => {
    editCategoryState.visible = true
}

const editCategoryState = reactive<{
    visible: boolean
    title: string
    mode: 'create' | 'update' | 'detail'
}>({
    visible: false,
    title: '创建',
    mode: 'create'
})

const { state, isReady, isLoading } = useAsyncState(
  queryCategoryList().then(data => data),
  {}
)

const tableData = computed(() => {
  return state.value || []
})

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
