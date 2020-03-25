<template>
  <div class="hot-table">
    <a-row class="table-header">
      <a-button-group>
        <a-button block @click="downloadFile">Download</a-button>
        <a-button block v-shortkey="['meta', 's']" @shortkey="saveData" @click="saveData">Save</a-button>
        <a-button block @click="clearData">Reset</a-button>
      </a-button-group>
      <h3 class="title">Job Parameters</h3>
    </a-row>
    <hot-table ref="hotTable" :settings="hotSettings" licenseKey="non-commercial-and-evaluation"></hot-table>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'

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
        rowHeaders: true,
        dropdownMenu: true,
        autoRowSize: true,
        autoColSize: true,
        stretchH: 'all',
        height: '400',
        width: '100%',
        manualColumnFreeze: true,
        manualColumnResize: true,
        maxRows: 100,
        maxCols: 50,
        multiColumnSorting: true,
        undo: true,
        contextMenu: {
          items: {
            'row_above': {},
            'row_below': {}
          }
        },
        afterChange: (change, changeType) => { 
          if (changeType === 'edit') {
            this.saveData()
          }
        }
      }
    }
  },
  methods: {
    getHeader () {
      return this.header
    },
    getBody () {
      const data = JSON.parse(localStorage.getItem('finalAppData'))
      if (data && data.length > 0) {
        return data
      } else {
        return this.body
      }
    },
    clearData () {
      localStorage.removeItem('finalAppData')
      this.$message.success('Refresh Successfully.')
      this.loadData()
    },
    saveData () {
      const container = this.$refs.hotTable.hotInstance
      const data = container.getData()
      localStorage.setItem('finalAppData', JSON.stringify(data))
      this.$message.success('Save Successfully.')
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
