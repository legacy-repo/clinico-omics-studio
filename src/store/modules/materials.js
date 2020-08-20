import {
  getMaterialsSeqData,
  getMaterialsMetadata,
  getMaterialsDIN,
  getMaterialsRIN,
  getMaterialsLicense,
  getMaterialsTemperature
} from '@/api/manage'
import groupBy from 'lodash.groupby'
import map from 'lodash.map'
import sumBy from 'lodash.sumby'
import orderBy from 'lodash.orderby'

const generateRankList = function(data, group, total) {
  const rankList = map(groupBy(data, group), (record, id) => ({
    name: id,
    total: parseFloat(sumBy(record, total).toFixed(2))
  }))

  return orderBy(rankList, 'total', 'desc')
}

const amountSeqData = function(data) {
  return sumBy(data, 'totalSize') * 1024 * 1024 * 1024
}

const amountMaterialsData = function(data) {
  return sumBy(data, 'tubes')
}

const formatBytes = function(bytes, decimals = 2) {
  if (bytes === 0) return ''

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const materials = {
  state: {},

  mutations: {},

  actions: {
    // 获取Materials
    GetMaterialsSeqData({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getMaterialsSeqData()
          .then(response => {
            // console.log('GetMaterialsSeqData: ', parameter, response)

            const data = {
              rankList: generateRankList(response, 'site', 'totalSize'),
              data: response,
              total: formatBytes(amountSeqData(response))
            }

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetMaterialsMetadata({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getMaterialsMetadata()
          .then(response => {
            const data = {
              rankList: generateRankList(response, 'receiver', 'tubes'),
              data: response,
              total: amountMaterialsData(response)
            }

            console.log('GetMaterialsMetadata: ', parameter, response, data)

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetMaterialsDIN({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getMaterialsDIN()
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetMaterialsRIN({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getMaterialsRIN()
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetMaterialsTemperature({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getMaterialsTemperature()
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetMaterialsLicense({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getMaterialsLicense()
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

export default materials
