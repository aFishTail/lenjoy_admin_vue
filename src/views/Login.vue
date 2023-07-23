<template>
  <div class="login-wrap">
    <div class="login-container">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="类型" prop="category">
          <el-select v-model="form.categoryId" style="width: 100%">
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input v-model="form.summary" />
        </el-form-item>
        <el-form-item label="内容" prop="label">
          <Editor v-model:content="form.content"></Editor>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FormRules } from 'element-plus'
import { reactive } from 'vue'

type Form = {
  username: string
  password: string
  confirmPassword: string
  captcha: string
}

const form = reactive<Form>({
  username: '',
  password: '',
  confirmPassword: '',
  captcha: ''
})

const rules = reactive<FormRules<Form>>({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    {
      max: 18,
      message: '用户名长度不能超过18',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      max: 18,
      message: '密码长度不能超过18',
      trigger: 'blur'
    }
  ],
  confirmPassword: '',
  captcha: ''
})
</script>
<style lang="scss" scoped></style>
