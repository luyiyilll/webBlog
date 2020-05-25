import { request } from './request'
export function register (username, password, avatar) {
  return request({
    url: '/user/register',
    method: 'post',
    params: {
      username,
      password,
      avatar,
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export function login (username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    params: {
      username,
      password,
    }
  })
}

export function update (id, school, college, sex, introduce) {
  return request({
    url: '/user/update',
    method: 'post',
    params: {
      id,
      school,
      college,
      sex,
      introduce,
    },

  })
}

export function updateAvatar (avatar, id) {
  return request({
    url: 'user/avatar',
    method: 'post',
    params: {
      avatar,
      id
    }
  })
}

export function updatePassword (password, id) {
  return request({
    url: 'user/password',
    method: 'post',
    params: {
      password, id
    }
  })
}


export function userInfo (username) {
  return request({
    url: 'user/info',
    method: 'post',
    params: {
      username
    }
  })
}

export function userInfoById (uid) {
  return request({
    url: 'user/infoid',
    method: 'post',
    params: {
      uid
    }
  })
}


export function topThree () {
  return request({
    url: 'user/three',
  })
}

export function getActiveUser () {
  return request({
    url: 'user/activeuser'
  })
}



