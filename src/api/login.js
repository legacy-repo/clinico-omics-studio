import api from './index'
import { axios } from '@/utils/request'
import { config } from '@/config/defaultSettings'
import { userInfo } from '@/utils/permissions'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     client_id: '',
 *     client_secret: '',
 *     scope: 'password'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(payload) {
  return axios({
    url: api.Login,
    method: 'post',
    data: payload
  })
}

export function getInfo() {
  if (config.noPermission) {
    return new Promise((resolve) => {
      resolve(userInfo)
    })
  } else {
    return axios({
      url: api.UserInfo,
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}

export function logout() {
  return axios({
    url: api.Logout,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
