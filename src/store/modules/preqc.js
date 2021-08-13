import Vue from 'vue'
import PreQCService from '@/api/preqc'
import map from 'lodash.map'

const formatBytes = function(bytes, decimals = 2) {
  if (bytes === 0) return ''

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const preqc = {
  namespaced: true,
  state: () => ({
    columns: [
      {
        title: 'File Name',
        dataIndex: 'name',
        key: 'name',
        visible: true,
        align: 'center'
      },
      {
        title: 'File Path',
        dataIndex: 'filepath',
        key: 'filepath',
        visible: false,
        align: 'center'
      },
      {
        title: 'Expected MD5',
        dataIndex: 'expected_md5sum',
        key: 'expected_md5sum',
        visible: true,
        // width: 320,
        align: 'center'
      },
      {
        title: 'Real MD5',
        dataIndex: 'md5sum',
        key: 'md5sum',
        visible: true,
        // width: 320,
        align: 'center'
      },
      {
        title: 'File Size',
        dataIndex: 'filesize',
        key: 'filesize',
        align: 'center',
        visible: true,
        sorter: (a, b) => a.filesize - b.filesize,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Data Size',
        dataIndex: 'datasize',
        key: 'datasize',
        align: 'center',
        visible: true,
        // width: 150,
        sorter: (a, b) => a.datasize - b.datasize,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 150,
        visible: true,
        scopedSlots: { customRender: 'tag' }
      }
    ],
    specialColumns: [
      {
        key: 'filepath',
        title: 'File Path'
      }
    ],
    items: [],
    selected: [],
    loading: false,
    current: 0,
    total: 0,
    searchOptions: {
      limit: 10,
      offset: 0,
      q: ''
    }
  }),
  getters: {
    currentItem(state) {
      if (state.items[state.current]) {
        return state.items[state.current]
      } else {
        return {}
      }
    }
  },
  mutations: {
    setCurrent(state, payload) {
      state.current = payload
    },
    setItems(state, payload) {
      state.items = payload
      state.total = payload.length
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setTotalItems(state, payload) {
      state.total = payload
    },
    updateSearchOptions(state, payload) {
      state.searchOptions = Object.assign(state.searchOptions, payload)
    },
    updateRecord(state, { filepath, updatedValues }) {
      // Cannot make vue know the mutation
      // map(state.items, record => {
      //   if (record.filepath === filepath) {
      //     Object.assign(record, updatedValues)
      //   }
      // })
      const index = state.items.findIndex(item => item.filepath === filepath)
      if (index !== -1) {
        Vue.set(state.items, index, Object.assign(state.items[index], updatedValues))
      }
    },
    updateColumn(state, { key, value }) {
      map(state.columns, record => {
        if (record.key === key) {
          record.visible = value
        }
      })
    },
    initSearchOptions(state) {
      state.searchOptions = {
        limit: 10,
        offset: 0,
        q: ''
      }
    }
  },
  actions: {
    getItem({ commit }, record) {
      // We don't need a loading status
      // commit('setLoading', true)
      commit('updateRecord', {
        filepath: record.filepath,
        updatedValues: {
          status: 'active',
          matchedStatus: 'Unknown'
        }
      })

      return new Promise((resolve, reject) => {
        PreQCService.getItem(record.filepath)
          .then(response => {
            const updatedValues = {}
            if (response.filemeta) {
              updatedValues['filesize'] = formatBytes(response.filemeta.filesize)
              updatedValues['md5sum'] = response.filemeta.md5sum
              updatedValues['datasize'] = response.fastqc.datasize
            } else {
              updatedValues['filesize'] = formatBytes(response.filesize)
              updatedValues['md5sum'] = response.md5sum
              updatedValues['datasize'] = -1
            }

            if (record.expected_md5sum) {
              if (updatedValues['md5sum'] !== record.expected_md5sum) {
                updatedValues['status'] = 'warning'
                updatedValues['matchedStatus'] = 'Mismatch'
              } else {
                updatedValues['status'] = 'success'
                updatedValues['matchedStatus'] = 'Matched'
              }
            } else {
              updatedValues['status'] = 'success'
              updatedValues['matchedStatus'] = 'Unknown'              
            }

            commit('updateRecord', {
              filepath: record.filepath,
              updatedValues: updatedValues
            })

            resolve({ ...updatedValues, filepath: record.filepath })
          })
          .catch(error => {
            console.log('PreQC Error: ', error)

            commit('updateRecord', {
              filepath: record.filepath,
              updatedValues: {
                status: 'exception',
                matchedStatus: 'Unknown Error'
              }
            })

            reject(error)
          })
      })
    }
  }
}

export default preqc
