<template>
  <el-dialog :model-value="visible" title="Tips" width="60%" :before-close="handleClose">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px" status-icon>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="类型" prop="category">
        <el-select v-model="form.categoryId" style="width: 100%">
          <el-option v-for="item in categoryList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <el-input v-model="form.summary" />
      </el-form-item>
      <el-form-item label="内容" prop="label">
        <Editor v-model:content="form.content"></Editor>
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
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { queryCategoryList } from '@/api/modules/category'
import { CreateTopicParam, Topic } from '@/model/topic';
import Editor from '@/components/Editor.vue'
import { createTopic, updateTopic } from '@/api/modules/topic';
import { useAsyncState } from '@vueuse/core';

interface IProps {
  visible: boolean
  title: string
  mode: 'create' | 'update' | 'detail'
  id: string
}

type Form = CreateTopicParam;

const props = withDefaults(defineProps<IProps>(), {
  visible: false,
  title: '',
  mode: 'create',
  id: ''
})

const emit = defineEmits(['update:visible', 'submitSuccess'])

const ruleFormRef = ref<FormInstance>()
const form = reactive<Form>({
  title: '',
  content: '',
  summary: '',
  categoryId: ''
})

const rules = reactive<FormRules<Form>>({
  title: [
    { required: true, message: '标题不能为空', trigger: 'blur' },
    { min: 1, max: 10, message: '长度不能超过50', trigger: 'blur' }
  ],
  categoryId: [
    { required: true, message: '帖子类型不能为空', trigger: 'blur' }
  ],
  content: [
    { required: false, message: '内容不能为空', trigger: 'blur' },
  ],
  summary: [
    { required: false, message: '', trigger: 'blur' },
    { min: 1, max: 200, message: '描述长度不能超过200', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (props.mode === 'create') {
        await createTopic({ ...form })
      ElMessage.success('创建成功')
      } else {
        // await updateCategory({ ...form })
        await updateTopic({ ...form })
      ElMessage.success('编辑成功')
      }
      emit('update:visible', false)
      emit('submitSuccess')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleClose = () => {
  console.log('reset', ruleFormRef.value.resetFields)
  ruleFormRef.value.resetFields()
  emit('update:visible', false)
}

const init = async () => {
  if(props.mode === 'update') {
    const data = await getCategoryDetail({ id: props.id })
  Object.assign(form, data)
  }
}

const {
  state: categoryList
} = useAsyncState(() => queryCategoryList({}), [], { resetOnExecute: true })

watch(() => props.visible, (val) => {
  console.log('ss', val, props, props.id)
  if (val) {
    init()
  }
})
</script>
