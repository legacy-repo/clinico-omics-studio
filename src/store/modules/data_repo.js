import {
  getRepoFiles,
  getRepoStatus,
  addRepo,
  updateRepo,
  addRepoVersion,
  listRepo,
  listRepoVersion
} from '@/api/manage'

const repo = {
  state: {
    repoList: [],
    currentRepo: {}
  },

  mutations: {
    SET_REPO_LIST: (state, repoList) => {
      state.repoList = repoList
    },
    SET_REPO: (state, repo) => {
      state.repo = repo
    }
  },

  actions: {
    // 获取用户信息
    GetRepoList({ commit }) {
      return new Promise((resolve, reject) => {
        listRepo()
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    AddRepo({ commit }, payload) {
      const { name, description } = payload
      return new Promise((resolve, reject) => {
        addRepo(name, description)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateRepo({ commit }, payload) {
      const { name, files, config } = payload
      return new Promise((resolve, reject) => {
        updateRepo(name, files, config)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    AddRepoVersion({ commit }, payload) {
      const { name, message, files } = payload
      return new Promise((resolve, reject) => {
        addRepoVersion(name, message, files)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetRepoVersion({ commit }, name) {
      return new Promise((resolve, reject) => {
        listRepoVersion(name)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetRepoStatus({ commit }, payload) {
      const { name, subpath } = payload
      return new Promise((resolve, reject) => {
        getRepoStatus(name, subpath)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetRepoFiles({ commit }, payload) {
      const { name, commitId, subpath } = payload
      return new Promise((resolve, reject) => {
        getRepoFiles(name, commitId, subpath)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default repo
