import Vue from 'vue'
import { getCollections, countCollections, getDataSchema, listCollections } from '@/api/manage'
import orderBy from 'lodash.orderby'
import uniqBy from 'lodash.uniqby'
import xorWith from 'lodash.xorwith'
import isEqual from 'lodash.isequal'
import map from 'lodash.map'
import filter from 'lodash.filter'
import { config } from '@/config/defaultSettings'
import merge from 'lodash.merge'
import findIndex from 'lodash.findindex'

const formatCounts = function(data) {
  const newRecords = []
  for (let item of data) {
    newRecords.push({
      name: item['_id'] ? item['_id'] : 'Unknown',
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

const formatRecords = function(data) {
  const newRecords = []

  for (const record of data) {
    newRecords.push({
      key: record.file_name,
      path: record.file_path,
      access: 'Open',
      fileName: record.file_name,
      project: record.project_name ? record.project_name : record.project_id,
      // dataCategory: record.data_category,
      dataCategory: record.data_type,
      dataFormat: record.data_format,
      fileSize: formatBytes(record.file_size),
      annotations: ''
    })
  }

  return newRecords
}

const formatRecord = function(record) {
  const newRecord = {
    key: record.file_name,
    path: record.file_path,
    access: 'Open',
    fileName: record.file_name,
    patientId: record.patient_id,
    project: record.project_name ? record.project_name : record.project_id,
    // dataCategory: record.data_category,
    dataCategory: record.data_type,
    dataType: record.data_type,
    dataFormat: record.data_format,
    fileSize: formatBytes(record.file_size),
    annotations: ''
  }

  const deletedItems = [
    'patient_id',
    'file_name',
    'file_path',
    'project_id',
    'data_category',
    'data_format',
    'file_size'
  ]
  deletedItems.forEach(o => {
    delete record[o]
  })

  return { ...record, ...newRecord }
}

const makeRule = function(field, value, type, operator) {
  // TODO: how to keep operator valid?
  if (type == 'category') {
    return {
      type: 'rule',
      query: {
        variable: field,
        operator: 'in',
        value: Array.isArray(value) ? value : [value]
      }
    }
  } else {
    return {
      type: 'rule',
      query: {
        variable: field,
        operator: operator,
        value: value
      }
    }
  }
}

const makeGroupRule = function(operator, rule1, rule2) {
  return {
    type: 'group',
    operator: operator,
    children: [rule1, rule2]
  }
}

// eslint-disable-next-line no-unused-vars
const formatField = function(fieldName) {
  console.log('formatField: ', fieldName, fieldName.replace('.', '_'))
  return fieldName.replace('.', '_')
}

const existRecord = function(collection, record) {
  const filtered = filter(collection, o => {
    return o.key === record.key
  })

  if (filtered.length > 0) {
    return true
  } else {
    return false
  }
}

const initCurrentDataSet = function(defaultCollection) {
  const dataset = JSON.parse(localStorage.getItem(`datains__${defaultCollection}__cart_files`))
  if (dataset) {
    return dataset
  } else {
    return []
  }
}

const remarkAllFields = function(allFields, predict) {
  return map(allFields, o => {
    if (predict(o)) {
      o['selected'] = true
    } else {
      o['selected'] = false
    }

    // console.log('remarkAllFields: ', o)
    // Initialize all fields
    if (o.type == 'category') {
      const data = []
      // TODO: Some fields have not values property?
      if (o.values) {
        o.values.forEach(item => {
          if (item == '' || item == undefined || item == null) {
            data.push({
              name: 'Unknown',
              key: item,
              count: 0
            })
          } else {
            data.push({
              name: item,
              key: item,
              count: 0
            })
          }
        })
      }

      o['data'] = data
    } else {
      o['data'] = []
    }

    return o
  })
}

const makeQueryMap = function(fieldsData) {
  const rules = []
  const fieldKeys = Object.keys(fieldsData)

  fieldKeys.forEach(fieldKey => {
    const field = fieldsData[fieldKey]
    if (Array.isArray(field)) {
      const checked = map(
        filter(field, item => {
          return item.checked
        }),
        'key'
      )

      if (checked.length > 0) {
        rules.push(makeRule(fieldKey, checked, 'category'))
      }
    } else {
      rules.push(
        makeGroupRule(
          'or',
          makeRule(field.key, field.min, 'number', '>='),
          makeRule(field.key, field.max, 'number', '<=')
        )
      )
    }
  })

  if (rules.length > 1) {
    return {
      type: 'group',
      operator: 'and',
      children: rules
    }
  } else if (rules.length == 1) {
    return rules[0]
  } else {
    return {}
  }
}

const data = {
  state: {
    defaultCollection: config.defaultCollection,
    collections: config.collections,
    queryParameter: {
      page: 1,
      per_page: 10
    },
    fieldsData: {},
    allFields: [],
    dataSets: [],
    currentDataSet: initCurrentDataSet(config.defaultCollection)
  },
  getters: {
    getTabs: state => (key) => {
      const collection = filter(state.collections, o => {
        return o.key == key
      })

      if (collection.length > 0) {
        return collection[0].tabs
      } else {
        return []
      }
    },
    getFieldDataByKey: state => (key, filterValue) => {
      if (filterValue) {
        return filter(state.fieldsData[key], record => {
          // Remove Special Character
          const pattern = /[`~!@#$^&*()=|{}':;',\\[\].<>/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g
          return record.name.match(new RegExp(filterValue.replace(pattern, ''), 'i'))
        })
      } else {
        return state.fieldsData[key] ? state.fieldsData[key] : []
      }
    },
    queryString: state => {
      return JSON.stringify(makeQueryMap(state.fieldsData))
    },
    defaultCollection: state => {
      return state.defaultCollection
    },
    collections: state => {
      return state.collections
    },
    dataSets: state => {
      return state.dataSets
    },
    currentDataSet: state => {
      return state.currentDataSet
    },
    selectedRowKeys: state => {
      return map(state.currentDataSet, o => {
        return o.key
      })
    },
    allFields: state => {
      return state.allFields
    },
    fieldsData: state => {
      return state.fieldsData
    }
  },
  mutations: {
    RESET_QUERY_MAP: state => {
      Vue.set(state, 'fieldsData', {})
    },
    ADD_FIELD: (state, key) => {
      const field = filter(state.allFields, o => {
        return o.key == key
      })

      if (field.length > 0) {
        field[0].selected = true
      }
    },
    REMOVE_FIELD: (state, key) => {
      const field = filter(state.allFields, o => {
        return o.key === key
      })

      if (field.length > 0) {
        field[0].selected = false
      }
    },
    UPDATE_FIELD: (state, { fieldKey, data }) => {
      if (state.fieldsData[fieldKey]) {
        const index = findIndex(state.fieldsData[fieldKey], o => {
          return o.key == data.key
        })

        state.fieldsData[fieldKey][index] = { ...data }

        // make the fieldsData change and activate updateing
        state.fieldsData = { ...state.fieldsData }
        console.log('UPDATE_FIELD: ', fieldKey, state.fieldsData, data, index)
      }
    },
    UPDATE_FIELD_DATA: (state, { fieldKey, data }) => {
      if (state.fieldsData[fieldKey]) {
        const oldData = state.fieldsData[fieldKey]
        const updatedData = map(oldData, record => {
          const matched = filter(data, item => {
            return item.key === record.key
          })

          if (matched.length > 0) {
            return merge(record, matched[0])
          } else {
            return {
              ...record,
              count: 0
            }
          }
        })

        Vue.set(state.fieldsData, fieldKey, updatedData)

        console.log('updatedData: ', updatedData, data)
      } else {
        const initiatedData = map(data, o => {
          return { ...o, checked: false }
        })
        console.log('initiatedData: ', initiatedData, data)
        Vue.set(state.fieldsData, fieldKey, initiatedData)
      }
    },
    SET_FIELDS: (state, fields) => {
      state.allFields = fields
    },
    SET_PAGE: (state, { page, per_page }) => {
      if (page >= 1) {
        state.queryParameter.page = page
      }

      if (per_page >= 1) {
        state.queryParameter.per_page = per_page
      }
    },
    SET_COLLECTION: (state, collectionName) => {
      state.defaultCollection = collectionName
      state.currentDataSet = initCurrentDataSet(collectionName)
    },
    PUSH_RECORD: (state, record) => {
      if (!existRecord(state.currentDataSet, record)) {
        state.currentDataSet.push(record)
      }
    },
    PUSH_RECORDS: (state, records) => {
      const dataset = state.currentDataSet.concat(records)
      state.currentDataSet = uniqBy(dataset, 'key')
    },
    POP_RECORD: (state, record) => {
      state.currentDataSet = state.currentDataSet.filter(o => {
        return o.key !== record.key
      })
    },
    POP_RECORDS: (state, records) => {
      // 差集
      state.currentDataSet = xorWith(state.currentDataSet, records, isEqual)
    }
  },
  actions: {
    SaveCurrentDataSet({ state }) {
      localStorage.setItem(`datains__${state.defaultCollection}__cart_files`, JSON.stringify(state.currentDataSet))
    },
    GetDataSchema({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDataSchema(state.defaultCollection)
          .then(response => {
            commit(
              'SET_FIELDS',
              remarkAllFields(response, o => {
                return o.priority <= 5
              })
            )
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    ListCollections({ state }) {
      return new Promise((resolve, reject) => {
        listCollections()
          .then(response => {
            resolve(response.collections)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetCollection({ state }, { key, value, defaultCollection }) {
      const parameter = {
        page: 1,
        per_page: 10
      }

      const payload = {
        type: 'rule',
        query: {
          variable: key,
          operator: '=',
          value: value
        }
      }

      return new Promise((resolve, reject) => {
        getCollections(defaultCollection, parameter, payload)
          .then(response => {
            if (response.total > 0) {
              resolve(formatRecord(response.data[0]))
            } else {
              reject('No such record')
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetCollections({ state }, { formatMode, parameter }) {
      let payload = {}
      let parameters = {}

      if (parameter && parameter.queryMap) {
        payload = parameter.queryMap
        delete parameter.queryMap
        parameters = { ...state.queryParameter, ...parameter }
      } else {
        payload = makeQueryMap(state.fieldsData)
        parameters = { ...state.queryParameter, ...parameter }
      }

      return new Promise((resolve, reject) => {
        getCollections(state.defaultCollection, parameters, payload)
          .then(response => {
            let data = response
            if (formatMode) {
              data = {
                pageSize: response['per_page'],
                page: response['page'],
                total: response['total'],
                data: formatRecords(response.data)
              }
            }

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    CountCollections({ state }, parameter) {
      let payload = {}
      let parameters = {}

      if (parameter.queryMap) {
        payload = parameter.queryMap
        delete parameter.queryMap
        parameters = { ...state.queryParameter, ...parameter }
      } else {
        payload = makeQueryMap(state.fieldsData)
        parameters = { ...state.queryParameter, ...parameter }
      }

      console.log('Parameters: ', parameters, parameter, state.queryParameter, payload)

      return new Promise((resolve, reject) => {
        countCollections(state.defaultCollection, parameters, payload)
          .then(response => {
            const data = formatCounts(response)

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default data
