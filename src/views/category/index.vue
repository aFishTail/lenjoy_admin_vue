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
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
  <EditCategory v-model:visible="editCategoryState.visible" :title="editCategoryState.title" :mode="editCategoryState.mode"></EditCategory>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import EditCategory from './component/EditCategory.vue';

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

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

const editCategoryState = reactive<{
    visible: boolean
    title: string
    mode: 'create' | 'update' | 'detail'
}>({
    visible: false,
    title: '创建',
    mode: 'create'
})

</script>
<style lang="scss" scoped>
.search-wrap {
//   margin-bottom: 12px;
//   border-bottom: 1px solid #f0f2f5;
}
</style>
