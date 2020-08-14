import { getCollections, countCollections } from '@/api/manage'
import orderBy from 'lodash.orderby'

const formatCounts = function (data) {
  const newRecords = []
  for (let item of data) {
    newRecords.push({
      name: item['_id'] ? item['_id'] : 'Others',
      count: item['total'],
      key: item['_id']
    })
  }

  return orderBy(newRecords, 'count', 'desc')
}

const formatBytes = function(bytes, decimals = 2) {
  if (bytes === 0) return ''

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const formatRecords = function (data) {
  const newRecords = []

  for (const record of data) {
    newRecords.push({
      key: record.data_file_submitter_id,
      access: 'Open',
      fileName: record.data_file_submitter_id,
      library: record.dna_library_library_preparation,
      project: 'Quartet',
      dataCategory: record.data_file_data_category,
      dataFormat: record.data_file_data_format,
      fileSize: null,
      annotations: ''
    })
  }

  return newRecords
}

const data = {
  state: {

  },

  mutations: {

  },

  actions: {
    GetCollections ({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getCollections(parameter).then(response => {
          const data = {
            pageSize: response['per_page'],
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
    CountCollections ({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        countCollections(parameter).then(response => {
          const data = formatCounts(response)

          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default data
