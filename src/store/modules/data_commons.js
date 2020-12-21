import { getCollections, countCollections, getDataSchema, listCollections } from '@/api/manage'
import orderBy from 'lodash.orderby'
import findIndex from 'lodash.findindex'
import map from 'lodash.map'
import filter from 'lodash.filter'
import isEmpty from 'lodash.isempty'
import { config } from '@/config/defaultSettings'

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
      dataCategory: record.data_category,
      dataFormat: record.data_format,
      fileSize: formatBytes(record.file_size),
      annotations: ''
    })
  }

  return newRecords
}

const makeRule = function(field, value, type) {
  if (type == 'category') {
    return {
      type: 'rule',
      query: {
        variable: field,
        operator: 'in',
        value: [value]
      }
    }
  } else {
    return {
      type: 'rule',
      query: {
        variable: field,
        operator: '=',
        value: value
      }
    }
  }
}

const makeGroupRule = function(type, rule1, rule2) {
  return {
    type: 'group',
    operator: type,
    children: [rule1, rule2]
  }
}

const makePayload = function(payload, field, value, type) {
  const cloned_payload = JSON.parse(JSON.stringify(payload))
  if (cloned_payload.type == 'rule') {
    if (cloned_payload.query.variable == field) {
      cloned_payload.query.value.push(value)
      return cloned_payload
    } else {
      return makeGroupRule('and', makeRule(field, value, type), cloned_payload)
    }
  } else if (cloned_payload.type == 'group') {
    // 两层嵌套
    var index = findIndex(cloned_payload.children, obj => {
      return obj.query.variable == field
    })

    if (index > -1) {
      const obj = cloned_payload.children[index]
      if (obj.query.operator == 'in') {
        obj.query.value.push(value)
      } else {
        cloned_payload.children[index] = makeGroupRule('or', makeRule(field, value, type), obj)
      }
    } else {
      cloned_payload.children.push(makeRule(field, value, type))
    }

    return cloned_payload
  } else {
    return makeRule(field, value, type)
  }
}

const removeItem = function(array, val) {
  var index = array.indexOf(val)
  if (index > -1) {
    array.splice(index, 1)
  }
}

const deletePayload = function(payload, field, value, type) {
  const cloned_payload = JSON.parse(JSON.stringify(payload))
  if (cloned_payload.type == 'rule') {
    if (cloned_payload.query.variable == field) {
      if (cloned_payload.query.operator == 'in') {
        removeItem(cloned_payload.query.value, value)
        if (cloned_payload.query.value.length > 0) {
          return cloned_payload
        } else {
          return {}
        }
      } else {
        return {}
      }
    } else {
      // Doesn't exist
      return cloned_payload
    }
  } else if (cloned_payload.type == 'group') {
    var children = cloned_payload.children
    cloned_payload.children = filter(
      map(children, o => {
        return deletePayload(o, field, value, type)
      }),
      o => {
        return !isEmpty(o)
      }
    )

    if (cloned_payload.children.length <= 1) {
      return cloned_payload.children[0]
    } else {
      return cloned_payload
    }
  } else {
    return {}
  }
}

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

const data = {
  state: {
    defaultCollection: config.defaultCollection,
    collections: [
      {
        key: 'quartet',
        name: 'Chinese Quartet',
        description: 'The Quartet Projectfor Quality Controlof Multi-omics Profiling'
      },
      {
        key: 'fuscctnbc',
        name: 'FUSCC TNBC',
        description: 'Multi-omics data for primary triple-negative breast cancer (TNBC).'
      }
    ],
    queryMap: {
      parameter: {
        page: 1,
        per_page: 10
      },
      payload: {}
    },
    dataSets: [],
    currentDataSet: initCurrentDataSet(config.defaultCollection)
  },
  getters: {
    queryString: state => {
      return JSON.stringify(state.queryMap.payload)
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
    }
  },
  mutations: {
    SET_PAGE: (state, { page, per_page }) => {
      if (page >= 1) {
        state.queryMap.parameter.page = page
      }

      if (per_page >= 1) {
        state.queryMap.parameter.per_page = per_page
      }
    },
    SET_PAYLOAD: (state, { field, value, type }) => {
      state.queryMap.payload = makePayload(state.queryMap.payload, formatField(field), value, type)
    },
    DELETE_PAYLOAD: (state, { field, value, type }) => {
      state.queryMap.payload = deletePayload(state.queryMap.payload, formatField(field), value, type)
    },
    RESET_PAYLOAD: state => {
      state.queryMap.payload = {}
      state.queryMap.parameter = {
        page: 1,
        per_page: 10
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
    POP_RECORD: (state, record) => {
      state.currentDataSet = state.currentDataSet.filter(o => {
        return o.key !== record.key
      })
    }
  },
  actions: {
    SaveCurrentDataSet({ state }) {
      localStorage.setItem(`datains__${state.defaultCollection}__cart_files`, JSON.stringify(state.currentDataSet))
    },
    ResetPayload({ commit }) {
      commit('RESET_PAYLOAD')
    },
    SetCollection({ commit }, collectionName) {
      commit('SET_COLLECTION', collectionName)
    },
    AddRecord({ commit }, record) {
      commit('PUSH_RECORD', record)
    },
    RemoveRecord({ commit }, record) {
      commit('POP_RECORD', record)
    },
    GetDataSchema({ state }) {
      return new Promise((resolve, reject) => {
        getDataSchema(state.defaultCollection)
          .then(response => {
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
    GetCollection({ state }, { filePath, defaultCollection }) {
      const parameter = {
        page: 1,
        per_page: 10
      }

      const payload = {
        type: 'rule',
        query: {
          variable: 'file_path',
          operator: '=',
          value: filePath
        }
      }

      return new Promise((resolve, reject) => {
        getCollections(defaultCollection, parameter, payload)
          .then(response => {
            if (response.length > 0) {
              resolve(response[0])
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetCollections({ state }, formatMode) {
      const parameter = state.queryMap.parameter
      const payload = state.queryMap.payload
      return new Promise((resolve, reject) => {
        getCollections(state.defaultCollection, parameter, payload)
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
      const parameters = { ...state.queryMap.parameter, ...parameter }
      console.log('Parameters: ', parameters, parameter, state.queryMap.parameter)
      const payload = state.queryMap.payload

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
