import { welcome } from '@/utils/util'

const user = {
  state: {
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
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
    }
  },

  actions: {
    // 获取用户信息
    GetInfo ({ commit }, userInfo) {
      commit('SET_ROLES', userInfo.role)
      commit('SET_INFO', userInfo)
      commit('SET_NAME', { name: userInfo.name, welcome: welcome() })
      commit('SET_AVATAR', userInfo.avatar)
    }
  }
}

export default user
