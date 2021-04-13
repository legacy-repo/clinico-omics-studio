<template>
  <div class="hot-table">
    <a-row class="table-header">
      <a-button-group>
        <a-button block @click="downloadFile">{{ $t('workflow.stepForm.argumentTable.download') }}</a-button>
        <a-button block v-shortkey="['meta', 's']" @shortkey="saveData" @click="saveData">{{ $t('workflow.stepForm.argumentTable.save') }}</a-button>
        <a-button block @click="clearData">{{ $t('workflow.stepForm.argumentTable.reset') }}</a-button>
      </a-button-group>
      <h3 class="title">{{ $t('workflow.stepForm.argumentTable.jobParameters') }}</h3>
    </a-row>
    <hot-table ref="hotTable" :settings="hotSettings" licenseKey="non-commercial-and-evaluation"></hot-table>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import filter from 'lodash.filter'

export default {
  name: 'ArgumentTable',
  props: {
    header: {
      required: true,
      type: Array
    },
    body: {
      required: false,
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      hotSettings: {
        bindRowsWithHeaders: true,
        colHeaders: this.getHeader(),
        filters: true,
        manualColumnFreeze: true,
        fixedColumnsLeft: 1,
        rowHeaders: true,
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
        height: '400',
        width: '100%',
        manualColumnResize: true,
        maxRows: 100,
        maxCols: 50,
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
        },
        afterChange: (change, changeType) => {
          if (changeType === 'edit' || changeType === 'Autofill.fill') {
            this.saveData()
          }
          console.log('ArgumentTable: ', change, changeType)
        }
      }
    }
  },
  methods: {
    getHeader () {
      return this.header
    },
    getBody () {
      const data = JSON.parse(localStorage.getItem('datains_FINAL_APP_DATA'))
      if (data && data.body) {
        return data.body
      } else {
        return this.body
      }
    },
    clearData () {
      localStorage.removeItem('datains_FINAL_APP_DATA')
      this.$message.success(this.$t('workflow.stepForm.argumentTable.refreshSuccessfully'))
      this.loadData()
    },
    filterData (data) {
      return filter(data, function (o) {
        return o.every(function (i) { return i == null }) === false
      })
    },
    saveData () {
      const container = this.$refs.hotTable.hotInstance
      const data = container.getData()
      const header = this.getHeader()
      localStorage.setItem('datains_FINAL_APP_DATA', JSON.stringify({
        header: header,
        body: this.filterData(data)
      }))
      this.$message.success(this.$t('workflow.stepForm.argumentTable.saveSuccessfully'))
    },
    loadData () {
      const container = this.$refs.hotTable.hotInstance
      container.loadData(this.getBody())
    },
    downloadFile () {
      const container = this.$refs.hotTable.hotInstance
      var exportPlugin = container.getPlugin('exportFile')
      exportPlugin.downloadFile('csv', {
        bom: false,
        columnDelimiter: ',',
        columnHeaders: false,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: 'iseq-analyzer-csv-file-[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: '\r\n',
        rowHeaders: false
      })
    }
  },
  computed: {
    bodyInValid () {
      return this.body.length === 0
    },
    keymap () {
      return {
        'meta+s': this.saveData,
        'ctrl+s': this.saveData
      }
    }
  },
  mounted () {
    this.loadData()
  },
  components: {
    HotTable
  }
}
</script>

<style lang="less" scoped>
.hot-table {
  width: 100%;
  height: 100%;

  .table-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 8px;

    .title {
      margin-top: 3px;
      margin-bottom: 0px;
    }

    .ant-btn-group {
      position: absolute;
      left: 0px;
      width: 200px;
      display: flex;
    }
  }
}
</style>

<style lang="css">
@import '~handsontable/dist/handsontable.full.css';
</style>
