import { getProjectList, getProject, submitProject, getProjectStat, updateProject } from '@/api/manage'
import moment from 'moment'

const formatStatus = function(status) {
  switch (status) {
    case 'Running':
      return 'active'
    case 'Submitted':
      return 'active'
    case 'Aborted':
      return 'aborted'
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

const formatDateTime = function(datetime) {
  if (datetime && datetime > 0) {
    return moment(datetime)
      .utcOffset('+8:00')
      .format('YYYY-MM-DD HH:mm')
  } else {
    return '0000-00-00 00:00'
  }
}

const timeToInt = function(datetime) {
  // TODO: DataPicker can't save datetime with correct timezone
  return moment(datetime, 'YYYY-MM-DD HH:mm:ss').utc(8).valueOf()
}

const formatRecords = function(records) {
  const newRecords = []
  for (const record of records) {
    // Filter by status
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
      status: record.finished_time && record.status === 'Submitted' ? 'success' : formatStatus(record.status),
      statusDetails: {
        success: 0,
        running: 0,
        submitted: 0,
        total: record.samples.length,
        error: 0
      },
      percentage: record.finished_time ? 100 : Math.floor(record.percentage * 100) / 100
    })
  }

  return newRecords
}

const formatPostData = function(data) {
  const newData = {
    project_name: data.projectName,
    group_name: data.group,
    started_time: timeToInt(data.createdTime),
    app_name: data.appName,
    author: data.author,
    app_id: data.appId,
    description: data.description,
    samples: data.samples
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
    GetProjectList({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getProjectList(parameter)
          .then(response => {
            const data = {
              perPage: response['per_page'],
              page: response['page'],
              total: response['total'],
              data: formatRecords(response.data)
            }
            commit('SET_PROJECT_LIST', data)

            console.log('GetProjectList: ', parameter, response, data)

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    ExistProject({ commit }, projectName) {
      var parameter = {
        project_name: projectName
      }

      return new Promise((resolve, reject) => {
        getProjectList(parameter)
          .then(response => {
            console.log('ExistProject: ', parameter, response)

            const data = {
              perPage: response['per_page'],
              page: response['page'],
              total: response['total'],
              data: formatRecords(response.data)
            }

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetProject({ commit }, projectId) {
      return new Promise((resolve, reject) => {
        getProject(projectId)
          .then(response => {
            console.log('GetProject: ', projectId, response)

            const data = formatRecords([response])[0]

            commit('SET_PROJECT', data)

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UpdateProject({ commit }, projectId) {
      const payload = {
        status: 'Aborted'
      }
      return new Promise((resolve, reject) => {
        updateProject(projectId, payload)
          .then(response => {
            console.log('Abort Project: ', projectId, response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetProjectStat({ commit }, projectId) {
      return new Promise((resolve, reject) => {
        getProjectStat(projectId)
          .then(response => {
            // console.log('GetProject: ', projectId, response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    SubmitProject({ commit }, data) {
      const formatedData = formatPostData(data)
      console.log('SubmitProject: ', formatedData)
      return new Promise((resolve, reject) => {
        submitProject(formatedData)
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

export default project
