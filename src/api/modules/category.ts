import { request } from '../request/index'

interface Category {
  id: string
  name: string
  label: string
  description: string
}

export const queryCategoryList = (params: { name: string }) => {
  return request({
    url: '/category/list',
    method: 'post',
    data: params
  })
}

export const createCategory = (params: Category) => {
  return request({
    url: '/category/create',
    method: 'post',
    data: params
  })
}

export const deleteCategory = (params: { id: string }) => {
  return request({
    url: '/category/delete',
    method: 'post',
    data: params
  })
}
export const getCategoryDetail = (params: { id: string }): Promise<Category> => {
  return request({
    url: '/category/detail',
    method: 'post',
    data: params
  })
}
export const updateCategory = (params: Category) => {
  return request({
    url: '/category/update',
    method: 'post',
    data: params
  })
}
