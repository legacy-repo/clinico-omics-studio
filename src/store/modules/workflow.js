import { getWorkflowList } from '@/api/manage'
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
    return moment(datetime).utcOffset('+08:00').format('YYYY-MM-DD HH:mm')
  } else {
    return '0000-00-00 00:00'
  }
}

const formatRecords = function (records) {
  const newRecords = []
  for (const record of records) {
    newRecords.push({
      id: record.id,
      title: record.sample_id,
      startedAt: formatDateTime(record.started_time),
      finishedAt: formatDateTime(record.finished_time),
      jobParams: record.job_params,
      labels: record.labels,
      status: formatStatus(record.status),
      percentage: 10
    })
  }

  return newRecords
}

const workflow = {
  state: {
    workflowList: []
  },

  mutations: {
    SET_WORKFLOW_LIST: (state, workflowList) => {
      state.workflowList = workflowList
    }
  },

  actions: {
    // 获取用户信息
    GetWorkflowList ({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getWorkflowList(parameter).then(response => {
          console.log('GetWorkflowList: ', parameter, response)

          const data = {
            perPage: response['per-page'],
            page: response['page'],
            total: response['total'],
            data: formatRecords(response.data)
          }
          commit('SET_WORKFLOW_LIST', data)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default workflow
