import { CreateTopicParam, Topic } from '@/model/topic'
import { request } from '../request/index'

export const queryTopicList = (params: { name: string, pageNum: number, pageSize: number }): Promise<PageResult<Topic>> => {
  return request({
    url: '/topic/list',
    method: 'post',
    data: params
  })
}

export const createTopic = (params: CreateTopicParam) => {
  return request({
    url: '/topic/create',
    method: 'post',
    data: params
  })
}

export const deleteTopic = (params: { id: string }) => {
  return request({
    url: '/topic/delete',
    method: 'post',
    data: params
  })
}
export const getTopicDetail = (params: { id: string }): Promise<Topic> => {
  return request({
    url: '/topic/detail',
    method: 'post',
    data: params
  })
}
export const updateTopic = (params: Partial<CreateTopicParam>) => {
  return request({
    url: '/topic/update',
    method: 'post',
    data: params
  })
}
