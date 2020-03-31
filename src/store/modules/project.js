import { getProjectList, getProject, submitProject } from '@/api/manage'
import moment from 'moment'

const formatStatus = function (status) {
  switch (status) {
    case 'Running':
      return 'active'
    case 'Submitted':
      return 'active'
    case 'Aborted':
      return 'exception'
    case 'Aborting':
      return 'exception'
    case 'Failed':
      return 'exception'
    case 'On Hold':
      return 'active'
    case 'Succeeded':
      return 'success'
    default:
      return 'active'
  }
}

const formatDateTime = function (datetime) {
  if (datetime && datetime > 0) {
    return moment(datetime).utcOffset('+16:00').format('YYYY-MM-DD HH:mm')
  } else {
    return '0000-00-00 00:00'
  }
}

const timeToInt = function (datetime) {
  return moment(datetime, 'YYYY-MM-DD HH:mm:ss').valueOf()
}

const formatRecords = function (records) {
  const newRecords = []
  for (const record of records) {
    newRecords.push({
      id: record.id,
      title: record.project_name,
      description: record.description,
      appName: record.app_name,
      appId: record.app_id,
      author: record.author,
      groupName: record.group_name,
      startedAt: formatDateTime(record.started_time),
      finishedAt: formatDateTime(record.finished_time),
      samples: record.samples,
      labels: record.labels,
      status: formatStatus(record.status),
      percentage: 10
    })
  }

  return newRecords
}

const formatPostData = function (data) {
  const newData = {
    'project-name': data.projectName,
    'group-name': data.group,
    'started-time': timeToInt(data.createdTime),
    'app-name': data.appName,
    'author': data.author,
    'app-id': data.appId,
    'description': data.description,
    'samples': data.samples
  }

  return newData
}

const project = {
  state: {
    projectList: [],
    project: {}
  },

  mutations: {
    SET_PROJECT_LIST: (state, projectList) => {
      state.projectList = projectList
    },
    SET_PROJECT: (state, project) => {
      state.project = project
    }
  },

  actions: {
    // 获取用户信息
    GetProjectList ({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getProjectList(parameter).then(response => {
          console.log('GetProjectList: ', parameter, response)

          const data = {
            perPage: response['per-page'],
            page: response['page'],
            total: response['total'],
            data: formatRecords(response.data)
          }
          commit('SET_PROJECT_LIST', data)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ExistProject ({ commit }, projectName) {
      var parameter = {
        'project-name': projectName
      }

      return new Promise((resolve, reject) => {
        getProjectList(parameter).then(response => {
          console.log('ExistProject: ', parameter, response)

          const data = {
            perPage: response['per-page'],
            page: response['page'],
            total: response['total'],
            data: formatRecords(response.data)
          }

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetProject ({ commit }, projectId) {
      return new Promise((resolve, reject) => {
        getProject(projectId).then(response => {
          console.log('GetProject: ', projectId, response)

          const data = formatRecords([response])[0]

          commit('SET_PROJECT', data)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SubmitProject ({ commit }, data) {
      const formatedData = formatPostData(data)
      console.log('SubmitProject: ', formatedData)
      return new Promise((resolve, reject) => {
        submitProject(formatedData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default project
