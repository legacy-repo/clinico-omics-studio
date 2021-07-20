<template>
  <div class="hot-table" :style="{ height: clientHeight + 'px' }">
    <hot-table
      :id="'hottable_' + id"
      :ref="'hottable_' + id"
      :data="getTableData(data)"
      :settings="hotSettings"
      licenseKey="non-commercial-and-evaluation"
    ></hot-table>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import map from 'lodash.map'

export default {
  name: 'ChartTable',
  props: {
    clientHeight: {
      required: false,
      default: 150,
      type: Number
    },
    id: {
      required: false,
      default: Math.random()
        .toString(36)
        .slice(-8),
      type: String
    },
    data: {
      required: false,
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      hotSettings: {
        bindRowsWithHeaders: true,
        colHeaders: true,
        rowHeaders: true,
        filters: true,
        minCols: 50,
        minRows: 200,
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
    refreshTable(id) {
      const instance = this.$refs['hottable_' + id]
      console.log('refreshTable: ', id, instance)
      if (instance) {
        setTimeout(() => {
          instance.hotInstance.render()
          instance.hotInstance.refreshDimensions()
        }, 100)
      }
    },
    getHeader(data) {
      return Object.keys(data[0])
    },
    getTableData(data) {
      if (data.length > 0) {
        const headers = this.getHeader(data)
        const body = map(data, item => {
          const record = []
          headers.forEach(field => {
            record.push(item[field])
          })

          return record
        })

        return [headers].concat(body)
      } else {
        return null
      }
    }
  },
  mounted() {},
  components: {
    HotTable
  },
  created() {
    console.log('Data: ', this.data)
  }
}
</script>

<style lang="css">
@import '~handsontable/dist/handsontable.full.css';
</style>

<style lang="less">
.hot-table {
  width: 100%;
  height: 100%;

  .ant-tabs-tabpane {
    border-right: 1px solid #d6d6d6;
  }

  .ant-tabs-bar {
    margin-bottom: 5px;
  }

  .ant-tabs,
  .ant-tabs-content,
  .ant-tabs-tabpane {
    height: calc(100% - 8px);
  }

  .resize-bar {
    width: 100%;
    background-color: #a2b1c6;
    height: 8px;
    cursor: row-resize;
    padding-top: 2px;
  }

  .divider {
    width: 18px;
    height: 4px;
    border: 1px solid #fff;
    border-width: 1px 0 1px 0;
    clear: both;
    margin: auto;
  }

  // Improve table
  .ht_clone_top {
    z-index: 1;
  }

  .ht_clone_left {
    z-index: 1;
  }

  .ht_clone_top_left_corner {
    z-index: 1;
  }
}
</style>
