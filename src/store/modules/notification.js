import { getNotificationList } from '@/api/manage'
import moment from 'moment'

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
      title: record.title,
      description: record.description,
      createdAt: formatDateTime(record.created_time),
      status: record.status,
      notificationType: record.notification_type
    })
  }

  return newRecords
}

const notification = {
  state: {
    notificationList: [],
    notification: {}
  },

  mutations: {
    SET_NOTIFICATION_LIST: (state, notificationList) => {
      state.notificationList = notificationList
    },
    SET_NOTIFICATION: (state, notification) => {
      state.notification = notification
    }
  },

  actions: {
    // 获取用户信息
    GetNotificationList ({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getNotificationList(parameter).then(response => {
          console.log('GetNotificationList: ', parameter, response)

          const data = {
            perPage: response['per_page'],
            page: response['page'],
            total: response['total'],
            data: formatRecords(response.data)
          }
          commit('SET_NOTIFICATION_LIST', data)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default notification
