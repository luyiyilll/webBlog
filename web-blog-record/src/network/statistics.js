import { request } from './request'

export function getLikeUser (aid) {
  return request({
    url: 'statistics/likeuser',
    params: {
      aid
    }
  })
}
export function updateClickNum (aid) {
  return request({
    url: 'statistics/updatecnum',
    method: 'post',
    params: {
      aid
    }
  })
}
