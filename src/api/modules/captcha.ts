import { request } from '../request/index'
import { CaptchaInfo } from '@/model/captcha'

export const queryCaptcha = (): Promise<CaptchaInfo> => {
  return request({
    url: '/api/captcha/get',
    method: 'post'
  })
}

export const showCaptcha = (params:{id: string}) => {
  return request({
    url: '/api/captcha/show',
    method: 'get',
    params
  })
}

export const verifyCaptcha = (params: {captchaId: number; value: string}): Promise<CaptchaInfo> => {
  return request({
    url: '/api/captcha/verify',
    method: 'post',
    data: params
  })
}