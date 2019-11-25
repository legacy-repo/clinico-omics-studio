<template>
  <div class="hot-table">
    <hot-table :data="data" :settings="hotSettings" licenseKey="non-commercial-and-evaluation">
    </hot-table>
    <a-row class="btn-group">
      <a-button :loading="loading" type="primary" @click="nextStep">Submit</a-button>
      <a-button style="margin-left: 8px" @click="prevStep">Previous Step</a-button>
    </a-row>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'

export default {
  name: 'Step2',
  data () {
    return {
      data: [
        ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
        ['2019', 10, 11, 12, 13],
        ['2020', 20, 11, 14, 13],
        ['2021', 30, 15, 12, 13]
      ],
      hotSettings: {
        colHeaders: true,
        filters: true,
        rowHeaders: true,
        dropdownMenu: true,
        autoRowSize: true,
        autoColSize: true,
        stretchH: 'all',
        height: '600',
        colWidths: 100,
        manualColumnFreeze: true,
        manualColumnResize: true,
        maxRows: 100,
        maxCols: 50,
        minRows: 50,
        minCols: 10,
        multiColumnSorting: true,
        undo: true,
        contextMenu: {
          items: {
            'row_above': {
              name: 'Insert row above this one (custom name)'
            },
            'row_below': {},
            'clear_custom': {
              name: 'Clear all cells (custom)',
              callback: function () {
                this.clear()
              }
            }
          }
        }
      },
      loading: false
    }
  },
  methods: {
    nextStep () {
      const that = this
      that.loading = true
      console.log('表单 values', that.data)
      that.timer = setTimeout(function () {
        that.loading = false
        that.$emit('nextStep')
      }, 1500)
    },
    prevStep () {
      this.$emit('prevStep')
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
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

  .btn-group {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>

<style lang="css">
@import '~handsontable/dist/handsontable.full.css';
</style>
