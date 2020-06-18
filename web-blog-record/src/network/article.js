import { request } from './request'
export function postArticle (title, content, atype, uid) {
  return request({
    url: 'article/post',
    method: 'post',
    params: {
      title, content, atype, uid
    }
  })
}

export function getPostArticle (uid) {
  return request({
    url: 'article/postcontent',
    params: {
      uid
    }
  })
}

export function findArticle (aid) {
  return request({
    url: 'article/content',
    params: {
      aid
    }
  })
}

export function editArticle (title, content, atype, aid) {
  return request({
    url: 'article/edit',
    method: 'post',
    params: {
      title, content, atype, aid
    }
  })
}

export function deleteArticle (aid) {
  return request({
    url: 'article/delete',
    method: 'post',
    params: {
      aid
    }
  })
}

export function allArticles () {
  return request({
    url: 'article/all'
  })
}

export function userArticle (username) {
  return request({
    url: 'article/useralist',
    method: 'post',
    params: {
      username
    }
  })
}


export function allArticlesInfo () {
  return request({
    url: 'article/allinfo'
  })
}


export function sortList (type) {
  return request({
    url: 'article/sort',
    params: {
      type
    }
  })
}

export function getSearch (keyword) {
  return request({
    url: 'article/search',
    method: 'post',
    params: {
      keyword
    }
  })
}

export function getTypeArticle (type) {
  return request({
    url: 'article/typearticle',
    method: 'post',
    params: {
      type
    }
  })
}

/*管理系统*/
export function userAndArticle () {
  return request({
    url: 'article/allarticlesinfo',

  })
}

