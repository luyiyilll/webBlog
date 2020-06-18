import { request } from './request'

export function getLikeUser (aid) {
  return request({
    url: 'like/userlist',
    method: 'post',
    params: {
      aid
    }
  })
}

export function deleteLike (aid, uid) {
  return request({
    url: 'like/delete',
    method: 'post',
    params: {
      aid, uid
    }
  })
}

export function addLike (aid, uid) {
  return request({
    url: 'like/add',
    method: 'post',
    params: {
      aid, uid
    }
  })
}