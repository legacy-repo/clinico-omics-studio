import Papa from 'papaparse'
import v from 'voca'
import filter from 'lodash.filter'
import findIndex from 'lodash.findindex'
import { map } from 'core-js/fn/array'

const baseName = function(str) {
  var base = new String(str).substring(str.lastIndexOf('/') + 1)
  if (base.lastIndexOf('.') != -1) base = base.substring(0, base.lastIndexOf('.'))
  return base
}

const get_file = function(name) {
  return {
    name: name,
    key: v.snakeCase(name),
    closable: true,
    url: '',
    data: [],
    meta: {}
  }
}

const getObj = function(index, data) {
  const [name, objName] = index.split('.')

  const filtered = filter(data, item => {
    return item.name == name
  })

  console.log('getObj: ', filtered, data, index)

  if (filtered.length > 0) {
    const filteredData = filtered[0].data
    return map(filteredData, item => {
      return item[objName]
    })
  }
}

const chartStudio = {
  state: {
    files: [],
    figure: {
      data: [],
      layout: {
        hovermode: 'closest',
        autosize: true,
        height: '420',
        margin: {
          l: 60,
          r: 50,
          b: 80,
          t: 50,
          pad: 4
        }
      },
      frames: [],
      config: { responsive: true }
    },
    trace: {
      mode: 'markers',
      name: '',
      type: '',
      marker: {},
      meta: {},
      x: [],
      y: [],
      dy: 0,
      y0: 0,
      visible: true,
      showlegend: true,
      legendgroup: null,
      xcalendar: 'gregorian',
      ycalendar: 'gregorian',
      stackgroup: null,
      text: '',
      hovertext: '',
      cliponaxis: true,
      fill: 'none',
      hoveron: 'points',
      hovertemplate: null,
      error_y: {},
      error_x: {},
      selected: {},
      unselected: {},
      opacity: 1,
      hoverinfo: 'x+y+z+text',
      hoverlabel: {},
      yaxis: 'y',
      xaxis: 'x'
    }
  },
  mutations: {
    ADD_DATA: (state, { name, url, data, meta }) => {
      state.files.push({
        name: name, // A user defined name
        key: name,
        closable: true,
        url: url, // The md5sum of fileLink
        data: data,
        meta: meta // meta contains extra information about the parse, such as delimiter used, the newline sequence, whether the process was aborted, etc. Properties in this object are not guaranteed to exist in all situations.
      })
    },
    ADD_TRACE: (state, { name, type, x, y }) => {
      console.log("ADD_TRACE: ", name, type, x, y, state.files)
      const trace = JSON.parse(JSON.stringify(state.trace))
      trace.name = name
      trace.type = type

      if (x) {
        trace.x = getObj(x, state.files)
      }

      if (y) {
        trace.y = getObj(y, state.files)
      }

      state.figure.data.push(trace)
    },
    REMOVE_TRACE: (state, name) => {
      const index = findIndex(state.figure.data, item => {
        return item.name == name
      })

      console.log('REMOVE_TRACE: ', index, name)

      if (index >= 0) {
        state.figure.data.splice(index, 1)
      }
    },
    RESET_FILES: (state, data) => {
      state.files = data

      if (state.files.length == 0) {
        state.files.push(get_file('Unamed Grid 1'))
      }
    },
    INIT_FILES: state => {
      if (state.files.length == 0) {
        state.files.push(get_file('Unamed Grid 1'))
      }
    },
    ADD_NEW_FILE: (state, name) => {
      state.files.forEach(item => {
        if (item.name !== name) {
          state.files.push(get_file(name))
        } else {
          state.files.push(get_file(name + '0'))
        }
      })
    }
  },
  actions: {
    GetFile({ commit }, url) {
      return new Promise((resolve, reject) => {
        Papa.parse(url, {
          header: true,
          dynamicTyping: true,
          worker: true,
          complete: (results, file) => {
            console.log('Papa Parse: ', results, file)
            const name = baseName(url)
            const { meta, data, errors } = results
            commit('ADD_DATA', {
              name: name,
              key: v.snakeCase(name),
              closable: true,
              url: url,
              data: data,
              meta: meta
            })
            resolve(true)
          },
          error: (error, file) => {
            reject(error)
          },
          download: true,
          downloadRequestHeaders: undefined,
          downloadRequestBody: undefined,
          skipEmptyLines: true,
          delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
        })
      })
    },
    ResetFiles({ commit }, data) {
      commit('RESET_FILES', data)
    },
    InitFiles({ commit }) {
      commit('INIT_FILES')
    },
    AddNewFile({ commit }, key) {
      commit('ADD_NEW_FILE', key)
    },
    UpdateTrace({ commit, state }, trace) {
      if (state.figure.data.length > 0) {
        state.figure.data.forEach(item => {
          if (item.name == trace.name) {
            delete trace.name

            if (trace.x) {
              trace.x = getObj(trace.x, state.files)
            }

            if (trace.y) {
              trace.y = getObj(trace.y, state.files)
            }

            Object.assign(item, trace)
            console.log("Update Trace", item)
          } else {
            commit('ADD_TRACE', trace)
          }
        })
      } else {
        commit('ADD_TRACE', trace)
      }
    },
    AddTrace({ commit, state }, trace_name) {
      commit('ADD_TRACE', {
        name: trace_name
      })
    },
    RemoveTrace({ commit, state }, name) {
      console.log('RemoveTrace: ', name)
      commit('REMOVE_TRACE', name)
    }
  }
}

export default chartStudio
