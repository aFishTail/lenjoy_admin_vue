<template>
  <el-dialog :model-value="visible" title="Tips" width="60%" :before-close="handleClose">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" status-icon>
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-input v-model="ruleForm.label" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="ruleForm.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { createCategory, getCategoryDetail, updateCategory } from '@/api/modules/category'

interface IProps {
  visible: boolean
  title: string
  mode: 'create' | 'update' | 'detail'
  id: string
}

interface RuleForm {
  name: string
  label: string
  description: string
}

const props = withDefaults(defineProps<IProps>(), {
  visible: false,
  title: '',
  mode: 'create',
  id: ''
})

const emit = defineEmits(['update:visible', 'submitSuccess'])

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  description: '',
  label: ''
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '名称不能为空', trigger: 'blur' },
    { min: 1, max: 10, message: '长度不能超过10', trigger: 'blur' }
  ],
  label: [
    { required: false, message: '标签不能为空', trigger: 'blur' },
    { min: 1, max: 36, message: '长度不能超过36', trigger: 'blur' }
  ],
  description: [
    { required: false, message: '', trigger: 'blur' },
    { min: 1, max: 200, message: '描述长度不能超过200', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (props.mode === 'create') {
        await createCategory({ ...ruleForm })
      ElMessage.success('创建成功')
      } else {
        // await updateCategory({ ...ruleForm })
        await updateCategory({ ...ruleForm })
      ElMessage.success('编辑成功')
      }
      emit('update:visible', false)
      emit('submitSuccess')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleClose = (done: () => void) => {
  console.log('reset', ruleFormRef.value.resetFields)
  ruleFormRef.value.resetFields()
  emit('update:visible', false)
}

const init = async () => {
  if(props.mode === 'update') {
    const data = await getCategoryDetail({ id: props.id })
  Object.assign(ruleForm, data)
  }
}

watch(() => props.visible, (val) => {
  console.log('ss', val, props, props.id)
  if (val) {
    init()
  }
})
</script>
