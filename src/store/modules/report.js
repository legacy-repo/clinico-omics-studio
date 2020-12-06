import { getReportList, getReport, submitReport } from '@/api/manage'
import moment from 'moment'
import { initSeqFlowHost } from '@/config/defaultSettings'

const formatStatus = function(record) {
  const status = {}
  if (record.checked_time > 0) {
    status.checked = true
  } else {
    status.checked = false
  }

  if (record.archived_time > 0) {
    status.archived = true
  } else {
    status.archived = false
  }

  if (['Finished', 'Archived', 'Checked'].indexOf(record.status) >= 0) {
    status.finished = true
  } else {
    status.finished = false
  }

  return status
}

const formatDateTime = function(datetime) {
  if (datetime && datetime > 0) {
    return moment(datetime)
      .utcOffset('+08:00')
      .format('YYYY-MM-DD HH:mm')
  } else {
    return '0000-00-00 00:00'
  }
}

const formatRecords = function(records) {
  const newRecords = []
  for (const record of records) {
    newRecords.push({
      id: record.id,
      title: record.report_name,
      projectId: record.projectId,
      description: record.description,
      script: record.script,
      reportType: record.report_type,
      reportUrl: initSeqFlowHost() + record.report_path,
      startedAt: formatDateTime(record.started_time),
      finishedAt: formatDateTime(record.finished_time),
      checkedAt: formatDateTime(record.checked_time),
      archivedAt: formatDateTime(record.archived_time),
      status: formatStatus(record)
    })
  }

  return newRecords
}

const timeToInt = function(datetime) {
  return moment(datetime, 'YYYY-MM-DD HH:mm:ss').valueOf()
}

const formatPostData = function(data) {
  const script = {
    'plugin-name': data.reportTool,
    metadata: data.metadata,
  }

  const newData = {
    report_name: data.reportName,
    started_time: timeToInt(data.startedTime),
    script: JSON.stringify(script),
    project_id: data.project,
    report_type: 'multiqc',
    status: 'Submitted',
    description: data.description
  }

  return newData
}

const report = {
  state: {
    reportList: [],
    report: {}
  },

  mutations: {
    SET_REPORT_LIST: (state, reportList) => {
      state.reportList = reportList
    },
    SET_REPORT: (state, report) => {
      state.report = report
    }
  },

  actions: {
    // 获取用户信息
    GetReportList({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getReportList(parameter)
          .then(response => {
            console.log('GetReportList: ', parameter, response)

            const data = {
              perPage: response['per_page'],
              page: response['page'],
              total: response['total'],
              data: formatRecords(response.data)
            }
            commit('SET_REPORT_LIST', data)

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetReport({ commit }, reportId) {
      return new Promise((resolve, reject) => {
        getReport(reportId)
          .then(response => {
            console.log('GetReport: ', reportId, response)

            const data = formatRecords([response])[0]

            commit('SET_REPORT', data)

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    SubmitReport({ commit }, data) {
      const formatedData = formatPostData(data)
      console.log('SubmitReport: ', formatedData)
      return new Promise((resolve, reject) => {
        submitReport(formatedData)
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

export default report
