import PreQCService from '@/api/preqc'
import map from 'lodash.map'

const preqc = {
  namespaced: true,
  state: () => ({
    columns: [
      {
        title: 'File Name',
        dataIndex: 'name',
        key: 'name',
        visible: true,
        width: 240,
        align: 'center'
      },
      {
        title: 'Expected MD5',
        dataIndex: 'expected_md5sum',
        key: 'expected_md5sum',
        visible: true,
        width: 240,
        align: 'center'
      },
      {
        title: 'Real MD5',
        dataIndex: 'md5sum',
        key: 'md5sum',
        visible: true,
        width: 150,
        align: 'center'
      },
      {
        title: 'Data Size',
        dataIndex: 'datasize',
        key: 'datasize',
        width: 120,
        align: 'center',
        visible: true,
        sorter: (a, b) => a.datasize - b.datasize,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        align: 'center',
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
      if (state.total === 0) {
        state.total = payload.length
      }
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
      map(state.items, record => {
        if (record.filepath === filepath) {
          Object.assign(record, updatedValues)
        }
      })
    },
    updateColumn(state, { name, value }) {
      map(state.columns, record => {
        if (record.name === name) {
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
          statusMsg: 'Running'
        }
      })

      return new Promise((resolve, reject) => {
        PreQCService.getItem(record.filepath)
          .then(response => {
            const updatedValues = {}
            updatedValues['filesize'] = response.data.filemeta.filesize
            updatedValues['md5sum'] = response.data.filemeta.md5sum
            updatedValues['datasize'] = response.data.fastqc.datasize

            if (updatedValues['md5sum'] === record.expected_md5sum) {
              updatedValues['status'] = 'success'
              updatedValues['statusMsg'] = 'Success'
            } else {
              updatedValues['status'] = 'custom'
              updatedValues['statusMsg'] = 'Mismatch'
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
                statusMsg: 'Unknown Error'
              }
            })

            reject(error)
          })
      })
    }
  }
}

export default preqc
