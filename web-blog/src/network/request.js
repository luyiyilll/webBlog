import axios from 'axios'
export function request (config, success, failure) {
  const instance = axios.create({
    baseURL: 'http://123.56.121.160:8085',
    timeout: 5000,


  })
  return instance(config)

}