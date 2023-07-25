import { Category } from '@/model/category'
import { request } from '../request/index'

export const queryCategoryList = (params: { name: string }): Promise<Category[]> => {
  return request({
    url: '/api/admin/category/list',
    method: 'post',
    data: params
  })
}

export const createCategory = (params: Category) => {
  return request({
    url: '/api/admin/category/create',
    method: 'post',
    data: params
  })
}

export const deleteCategory = (params: { id: string }) => {
  return request({
    url: '/api/admin/category/delete',
    method: 'post',
    data: params
  })
}
export const getCategoryDetail = (params: { id: string }): Promise<Category> => {
  return request({
    url: '/api/admin/category/detail',
    method: 'post',
    data: params
  })
}
export const updateCategory = (params: Category) => {
  return request({
    url: '/api/admin/category/update',
    method: 'post',
    data: params
  })
}
