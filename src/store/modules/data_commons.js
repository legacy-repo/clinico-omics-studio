import { getCollections, countCollections } from '@/api/manage'
import orderBy from 'lodash.orderby'
import findIndex from 'lodash.findindex'
import map from 'lodash.map'
import filter from 'lodash.filter'
import isEmpty from 'lodash.isempty'

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

const makeRule = function (field, value, type) {
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

const makeGroupRule = function (type, rule1, rule2) {
  return {
    type: 'group',
    operator: type,
    children: [
      rule1,
      rule2
    ]
  }
}

const makePayload = function (payload, field, value, type) {
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

const remove = function(array, val) {
  var index = array.indexOf(val);
  if (index > -1) {
    array.splice(index, 1);
  }
}

const deletePayload = function (payload, field, value, type) {
  const cloned_payload = JSON.parse(JSON.stringify(payload))
  if (cloned_payload.type == 'rule') {
    if (cloned_payload.query.variable == field) {
      if (cloned_payload.query.operator == 'in') {
        remove(cloned_payload.query.value, value)
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
    cloned_payload.children = filter(map(children, o => {
      return deletePayload(o, field, value, type)
    }), o => {
      return !isEmpty(o)
    })
    return cloned_payload
  } else {
    return {}
  }
}

const data = {
  state: {
    queryMap: {
      parameter: {
        page: 1,
        per_page: 10
      },
      payload: {}
    }
  },
  getters: {
    queryString: state => {
      return JSON.stringify(state.queryMap.payload)
    }
  },
  mutations: {
    SET_PAGE: (state, {page, per_page}) => {
      if (page >= 1) {
        state.queryMap.parameter.page = page
      }

      if (per_page >= 1) {
        state.queryMap.parameter.per_page = per_page
      }
    },
    SET_PAYLOAD: (state, {field, value, type}) => {
      state.queryMap.payload = makePayload(state.queryMap.payload, field, value, type)
    },
    DELETE_PAYLOAD: (state, {field, value, type}) => {
      state.queryMap.payload = deletePayload(state.queryMap.payload, field, value, type)
    }
  },
  actions: {
    GetCollections ({ state }) {
      const parameter = state.queryMap.parameter
      const payload = state.queryMap.payload
      return new Promise((resolve, reject) => {
        getCollections(parameter, payload).then(response => {
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
    CountCollections ({ state }, parameter) {
      const parameters = { ...state.queryMap.parameter, ...parameter}
      console.log('Parameters: ', parameters, parameter, state.queryMap.parameter)
      const payload = state.queryMap.payload

      return new Promise((resolve, reject) => {
        countCollections(parameters, payload).then(response => {
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
