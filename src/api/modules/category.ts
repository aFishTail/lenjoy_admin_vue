import {request} from '../request/index'

export const queryCategoryList = () => {
    return request({
        url: '/category/list',
        method: 'post'
    })
}