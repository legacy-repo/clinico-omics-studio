import { getWorkflowList, getWorkflow, updateWorkflow } from '@/api/manage'
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
      workflowId: record.workflow_id, // Cromwell Workflow ID.
      startedAt: formatDateTime(record.started_time),
      finishedAt: formatDateTime(record.finished_time),
      jobParams: record.job_params,
      labels: record.labels,
      status: formatStatus(record.status),
      percentage: Math.floor(record.percentage * 100) / 100
    })
  }

  return newRecords
}

const formatRecord = function (record) {
  return {
    id: record.id,
    title: record.sample_id,
    workflowId: record.workflow_id, // Cromwell Workflow ID.
    startedAt: formatDateTime(record.started_time),
    finishedAt: formatDateTime(record.finished_time),
    jobParams: record.job_params,
    labels: record.labels,
    status: formatStatus(record.status),
    percentage: Math.floor(record.percentage * 100) / 100,
    workflowOutput: record.workflow_output,
    outputs: record.outputs,
  }
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
            perPage: response['per_page'],
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
    },
    GetWorkflow ({ commit }, workflowId) {
      return new Promise((resolve, reject) => {
        getWorkflow(workflowId).then(response => {
          console.log('GetWorkflow: ', workflowId, response)

          resolve(formatRecord(response))
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateWorkflow ({ commit }, data) {
      const workflowId = data.workflowId
      delete data['workflowId']
      return new Promise((resolve, reject) => {
        updateWorkflow(workflowId, data).then(response => {
          console.log('Update Workflow: ', workflowId, response)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default workflow
