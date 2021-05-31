import {
  getServices,
  getBuckets,
  getObjects,
  makeDownloadUrl,
  makeUploadUrl,
  addBucket,
  makeDirectory,
  deleteBucket,
  deleteObject,
  getObjectMeta
} from '@/api/manage'
import moment from 'moment'

const formatDateTime = function(datetime) {
  if (datetime) {
    return moment(datetime).format('YYYY-MM-DD HH:mm')
  } else {
    return ''
  }
}

const formatBuckets = function(records) {
  const newRecords = []
  for (const record of records) {
    // newRecords.push({
    //   createdAt: record.CreationDate,
    //   name: record.Name
    // })
    newRecords.push(record.Name)
  }

  return newRecords
}

const formatMeta = function(record) {
  const meta = record.meta
  return {
    etag: meta.etag,
    name: meta.name,
    key: meta.key,
    createdTime: formatDateTime(meta['created-time']),
    contentType: meta['content-type'],
    size: meta.length,
    bucket: meta.bucket
  }
}

const formatObjects = function(records) {
  const newRecords = []
  for (const record of records) {
    newRecords.push({
      name: record.key,
      etag: record.etag,
      modified: formatDateTime(record['last-modified']),
      size: record.size,
      storageClass: record['storage-class'],
      path: record.path
    })
  }

  return newRecords
}

const fs = {
  state: {},

  mutations: {},

  actions: {
    GetServices({ commit }) {
      return new Promise((resolve, reject) => {
        getServices()
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取Buckets
    GetBuckets({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getBuckets(parameter.service)
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
    GetObjects({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getObjects(parameter.service, parameter.name, {
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
              data: formatObjects(response.data),
              bucket: response['bucket'],
              location: response['location']
            }

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    MakeDirectory({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        makeDirectory(parameter.service, parameter.name, {
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
    MakeUploadUrl({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        makeUploadUrl(parameter.service, parameter.name, {
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
    },
    MakeDownloadUrl({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        makeDownloadUrl(parameter.service, parameter.name, {
          key: parameter.key
        })
          .then(response => {
            console.log('Make Download Url: ', parameter, response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetObjectMeta({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getObjectMeta(parameter.service, parameter.name, {
          key: parameter.key
        })
          .then(response => {
            console.log('Get Object Meta: ', parameter, response)
            if (typeof response.meta !== 'object') {
              reject('Object does not exist')
            } else {
              resolve(formatMeta(response))
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default fs
