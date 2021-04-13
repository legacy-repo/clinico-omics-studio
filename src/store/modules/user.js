import { getInfo, login, logout } from '@/api/login'
import { welcome } from '@/config/defaultSettings'
import { checkToken } from '@/utils/util'
import { userInfo } from '@/utils/permissions'
import v from 'voca'

const user = {
  state: {
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    isAuthenticated: false
  },

  mutations: {
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_STATE: (state, isAuthenticated) => {
      state.isAuthenticated = isAuthenticated
    }
  },

  actions: {
    CheckToken({ commit }) {
      return new Promise(resolve => {
        const authJSON = checkToken()
        if (authJSON) {
          commit('SET_STATE', true)
        } else {
          commit('SET_STATE', false)
        }

        resolve(authJSON)
      })
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            userInfo.name = response.name ? response.name : response.preferred_username
            userInfo.username = v.titleCase(userInfo.name)
            userInfo.groups = response.groups

            console.log('GetInfo: ', response, userInfo, userInfo.name)

            if (userInfo.role && userInfo.role.permissions.length > 0) {
              const role = userInfo.role

              role.permissions.map(per => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map(action => {
                    return action.action
                  })
                  per.actionList = action
                }
              })

              role.permissionList = role.permissions.map(permission => {
                return permission.permissionId
              })
              commit('SET_ROLES', userInfo.role)
              commit('SET_INFO', userInfo)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }

            commit('SET_NAME', { name: userInfo.name, welcome: welcome() })
            commit('SET_AVATAR', userInfo.avatar)

            resolve(userInfo)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    Login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const authJSON = checkToken()
        if (authJSON) {
          commit('SET_STATE', true)
          resolve(authJSON)
        } else {
          login(payload)
            .then(response => {
              console.log('login ', response)
              localStorage.setItem('CLINICO_OMICS_AUTH', JSON.stringify(response))
              commit('SET_STATE', true)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    },
    Logout({ dispatch }) {
      return new Promise((resolve, reject) => {
        for (var i in localStorage) {
          if (i == new RegExp('kc-callback', 'gi')) {
            console.log('Remove kc-callback: ', i, localStorage.getItem(i))
            localStorage.removeItem(i)
            break
          }
        }
        if (localStorage.getItem('CLINICO_OMICS_AUTH')) {
          if (window.location.hostname !== 'localhost') {
            logout()
              .then(response => {
                console.log('Logout ', response)
                localStorage.removeItem('CLINICO_OMICS_AUTH')
                resolve(response)
              })
              .catch(error => {
                localStorage.removeItem('CLINICO_OMICS_AUTH')
                // It will be failed When encounter CORS problem
                // reject(error)
                resolve()
              })
          } else {
            localStorage.removeItem('CLINICO_OMICS_AUTH')
            resolve()
          }
        } else {
          resolve()
        }
      })
    }
  }
}

export default user
