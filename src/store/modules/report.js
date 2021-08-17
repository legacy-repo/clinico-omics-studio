import { getReportList, getReport, submitReport } from '@/api/manage'
import moment from 'moment'
import path from 'path'
import { initTServiceHost } from '@/config/defaultSettings'

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

const formatTaskStatus = function(status) {
  if (status === 'Finished') {
    return 'Success'
  } else if (status === 'Started') {
    return 'Running'
  }
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

const formatReportUrl = function(reportPath) {
  const tServiceHost = new URL(initTServiceHost())
  const fullPath = path.join(tServiceHost.pathname, reportPath)
  const reportUrl = new URL(fullPath, tServiceHost.origin).toString()
  console.log('Format Report Url: ', tServiceHost, reportPath, reportUrl)
  return reportUrl
}

const formatRecords = function(records) {
  const newRecords = []
  for (const record of records) {
    newRecords.push({
      id: record.id,
      title: record.report_name,
      projectId: record.projectId,
      description: record.description,
      appName: record.app_name,
      reportType: record.report_type,
      reportUrl: formatReportUrl(record.report_path),
      startedAt: formatDateTime(record.started_time),
      finishedAt: formatDateTime(record.finished_time),
      checkedAt: formatDateTime(record.checked_time),
      archivedAt: formatDateTime(record.archived_time),
      status: formatStatus(record),
      taskStatus: formatTaskStatus(record.status)
    })
  }

  return newRecords
}


// eslint-disable-next-line no-unused-vars
const timeToInt = function(datetime) {
  return moment(datetime, 'YYYY-MM-DD HH:mm:ss').valueOf()
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
              perPage: response['page_size'],
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
      const reportName = data.reportName
      const payload = data.payload
      console.log('SubmitReport: ', data)
      return new Promise((resolve, reject) => {
        submitReport(reportName, payload)
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
