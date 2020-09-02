<template>
  <a-row class="form-table-container" :style="{ height: clientHeight + 'px' }">
    <a-button-group>
      <a-button @click="hide">Cancel</a-button>
      <a-button @click="saveData" type="primary">Confirm</a-button>
    </a-button-group>
    <hot-table ref="hotTable" :settings="hotSettings" licenseKey="non-commercial-and-evaluation"></hot-table>
  </a-row>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import map from 'lodash.map'
import filter from 'lodash.filter'
import compact from 'lodash.compact'

export default {
  name: 'FormTable',
  props: {
    clientHeight: {
      required: false,
      default: 650,
      type: Number
    },
    header: {
      required: true,
      type: Array
    },
    body: {
      required: false,
      type: Array,
      default: () => []
    },
    forceUpdate: {
      required: false,
      type: String,
      default: ''
    }
  },
  data() {
    return {
      hotSettings: {
        bindRowsWithHeaders: true,
        colHeaders: this.getHeader(),
        rowHeaders: true,
        filters: true,
        minRows: 200,
        startCols: this.getHeader().length,
        maxCols: this.getHeader().length,
        data: null,
        manualColumnFreeze: true,
        dropdownMenu: [
          'undo',
          '---------',
          'redo',
          '---------',
          'make_read_only',
          '---------',
          'clear_column',
          '---------',
          'alignment',
          '---------',
          'filter_by_condition',
          'filter_operators',
          'filter_by_condition2',
          'filter_by_value',
          'filter_action_bar'
        ],
        autoRowSize: true,
        autoColSize: true,
        className: 'htCenter', // Align Center
        stretchH: 'all',
        height: '100%',
        width: '100%',
        manualColumnResize: true,
        multiColumnSorting: true,
        undo: true,
        redo: true,
        contextMenu: {
          items: {
            make_read_only: {},
            redo: {},
            undo: {},
            row_below: {},
            row_above: {},
            freeze_column: {},
            unfreeze_column: {}
          }
        }
      }
    }
  },
  methods: {
    getHeader() {
      if (this.header.length > 0) {
        return this.header
      } else {
        return []
      }
    },
    getBody() {
      const headers = this.getHeader()
      if (this.body.length > 0) {
        return map(this.body, item => {
          const record = []
          headers.forEach(field => {
            record.push(item[field])
          })

          return record
        })
      } else {
        return []
      }
    },
    hide() {
      this.$emit('cancel', true)
    },
    loadData() {
      const body = this.getBody()
      if (body.length > 0) {
        const container = this.$refs.hotTable.hotInstance
        container.loadData(body)
      }
    },
    isNull(arr) {
      if (compact(arr).length == 0) {
        return true
      } else {
        return false
      }
    },
    saveData() {
      const container = this.$refs.hotTable.hotInstance
      const data = container.getData()
      const filterdData = filter(data, arr => {
        return !this.isNull(arr)
      })
      this.$emit('save', filterdData)
      this.hide()
      this.$message.success('Successfully.')
    }
  },
  computed: {
    keymap() {
      return {
        'meta+s': this.saveData,
        'ctrl+s': this.saveData
      }
    }
  },
  mounted() {
    this.loadData()
  },
  created() {
    console.log('FormTable: ', this.hotSettings, this.maxCols)
  },
  components: {
    HotTable
  }
}
</script>

<style lang="css">
@import '~handsontable/dist/handsontable.full.css';
</style>

<style lang="less" scoped>
.form-table-container {
  height: 100%;
  width: 100%;

  .ant-btn-group {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
}
</style>
