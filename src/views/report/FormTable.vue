<template>
  <a-row class="form-table-container" :style="{ height: clientHeight + 'px' }">
    <a-button-group>
      <a-button @click="cancel()">Cancel</a-button>
      <a-button @click="confirm()" type="primary">Confirm</a-button>
    </a-button-group>
    <hot-table ref="hotTable" :settings="hotSettings" licenseKey="non-commercial-and-evaluation"></hot-table>
  </a-row>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import map from 'lodash.map'

export default {
  name: 'FormTable',
  props: {
    clientHeight: {
      required: false,
      default: 650,
      type: Number
    },
    data: {
      required: true,
      type: Array
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
        className: "htCenter",  // Align Center
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
      if (this.data.length > 0) {
        return Object.keys(this.data[0])
      } else {
        return []
      }
    },
    getBody() {
      const headers = this.getHeader()
      return map(this.data, item => {
        const record = []
        headers.forEach((field) => {
          record.push(item[field])
        })

        return record
      })
    },
    cancel() {},
    confirm() {},
    loadData() {
      const container = this.$refs.hotTable.hotInstance
      container.loadData(this.getBody())
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
