import {
  getBuckets,
  getObjects,
  makeDownloadUrl,
  makeUploadUrl,
  addBucket,
  makeDirectory,
  deleteBucket,
  deleteObject,
  existObject
} from '@/api/manage'
import moment from 'moment'

const formatDateTime = function (datetime) {
  if (datetime) {
    return moment(datetime).format('YYYY-MM-DD HH:mm')
  } else {
    return ''
  }
}

const formatBuckets = function (records) {
  const newRecords = []
  for (const record of records) {
    newRecords.push({
      createdAt: record.CreationDate,
      name: record.Name
    })
  }

  return newRecords
}

const formatObjects = function (records) {
  const newRecords = []
  for (const record of records) {
    newRecords.push({
      name: record.Key,
      etag: record.ETag,
      modified: formatDateTime(record.LastModified),
      size: record.Size,
      storageClass: record.StorageClass,
      path: record.Path
    })
  }

  return newRecords
}

const fs = {
  state: {},

  mutations: {},

  actions: {
    // 获取Buckets
    GetBuckets ({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getBuckets()
          .then(response => {
            console.log('Get Buckets: ', parameter, response)

            const data = {
              data: formatBuckets(response.data)
            }

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetObjects ({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getObjects(parameter.name, {
          page: parameter.page,
          per_page: parameter.pageSize,
          prefix: parameter.prefix
        })
          .then(response => {
            console.log('Get Objects: ', parameter, response)

            const data = {
              pageSize: response['per_page'],
              page: response['page'],
              total: response['total'],
              data: formatObjects(response.data)
            }

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    MakeDirectory ({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        makeDirectory(parameter.name, {
          key: parameter.key
        })
          .then(response => {
            console.log('Make Directory: ', parameter, response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    MakeUploadUrl ({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        makeUploadUrl(parameter.name, {
          key: parameter.key
        })
          .then(response => {
            console.log('Make Upload Url: ', parameter, response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default fs
