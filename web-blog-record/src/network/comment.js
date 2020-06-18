
import { request } from './request'
export function findArticleComment (aid) {
  return request({
    url: 'comment/articlecomment',
    method: 'post',
    params: {
      aid
    }
  })
}

export function insertComment (aid, content, username, avatar) {
  return request({
    url: 'comment/insert',
    method: 'post',
    params: {
      aid, content, username, avatar
    }
  })
}

export function updateComment (cid, content) {
  return request({
    url: 'comment/update',
    method: 'post',
    params: {
      cid, content
    }
  })
}

export function deleteComment (cid) {
  return request({
    url: 'comment/delete',
    method: 'post',
    params: {
      cid
    }
  })
}


/*管理系统*/
export function getArticleComment () {
  return request({
    url: 'comment/allacomment'
  })
}

