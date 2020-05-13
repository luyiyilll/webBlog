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