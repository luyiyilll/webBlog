import axios from 'axios'
export function request (config, success, failure) {
  const instance = axios.create({
    // baseURL: 'http://123.56.121.160:8085',
    baseURL: 'http://localhost:8085',
    timeout: 5000,
    headers: {
      "Content-Security-Policy": "upgrade-insecure-requests"
    }


  })
  return instance(config)

}