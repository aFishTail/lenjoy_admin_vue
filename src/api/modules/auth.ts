import { User } from '@/model/user'
import { request } from '../request/index'
import { CaptchaInfo } from '@/model/captcha'

export const login = (params: {
  username: string
  password: string
  captchaId: string
  captchaCode: string
}) => {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data: params
  })
}

export const getUserInfo = (): Promise<User> => {
  return request({
    url: '/api/auth/userInfo',
    method: 'post'
  })
}
