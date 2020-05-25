import axios from 'axios'
export function request (config, success, failure) {
  const instance = axios.create({
    baseURL: 'http://localhost:8085',
    timeout: 5000,


  })
  return instance(config)

}