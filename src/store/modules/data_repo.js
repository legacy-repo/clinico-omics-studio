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
    AddRepo({ commit }, { name, description }) {
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
    UpdateRepo({ commit }, { name, files, config }) {
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
    AddRepoVersion({ commit }, { name, message, files }) {
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
    GetRepoStatus({ commit }, { name, subpath }) {
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
    GetRepoFiles({ commit }, { name, commitId, subpath }) {
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
