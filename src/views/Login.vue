<template>
  <div class="login-wrap">
    <div class="login-container">
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"> </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captchaCode">
          <el-input v-model="form.captchaCode" class="w-50 m-2" placeholder="请输入验证码">
            <template #suffix>
              <img :src="captchaRef?.imgUrl" alt="" @click="handleClickCaptcha" />
            </template>
          </el-input>
        </el-form-item>
        <el-row>
          <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getUserInfo, login } from '@/api/modules/auth'
import { queryCaptcha } from '@/api/modules/captcha'
import storage from '@/utils/storage';
import { useLocalStorage } from '@vueuse/core';
import { ElMessage, FormRules } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';

type Form = {
  username: string
  password: string
  captchaCode: string
}

const form = reactive<Form>({
  username: '',
  password: '',
  captchaCode: ''
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
  captchaCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      max: 4,
      message: '请输入4位验证码',
      trigger: 'blur'
    }
  ]
})

const captchaRef = ref<UnPromisify<typeof queryCaptcha>>()
const router = useRouter()
const tokenStore = useLocalStorage('token', '')

const handleLogin = async () => {
  const params: Parameters<typeof login>[0] = {
    ...form,
    captchaId: captchaRef.value.id
  }
  try {
    const { token } = await login(params)
    storage.setItem('token', token, 60 * 60 * 24)
    const userInfo = await getUserInfo()
    storage.setItem('userInfo', userInfo, 60 * 60 * 24)
    ElMessage.success('login success')
    router.push('/')
  } catch (error) {
    refreshCaptcha()
  }
}

const refreshCaptcha = async () => {
  captchaRef.value = await queryCaptcha()
}

const handleClickCaptcha = () => {
  refreshCaptcha()
}

onMounted(async () => {
  captchaRef.value = await queryCaptcha()
})
</script>
<style lang="scss" scoped>
.login-wrap {
  background-color: #909399;
  width: 100%;
  height: 100vh;
  .login-container {
    width: 350px;
    background-color: #fff;
    position: absolute;
    left: 60%;
    top: 30%;
    border: 1px solid #dcdfe6;
    padding: 32px 24px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
    margin: 12px 0;
  }
}
</style>
