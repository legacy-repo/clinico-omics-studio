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
        ['project_name', 'sample_id', 'read1', 'read2', 'sample_name'],
        ['quartet_0225', '1', 'oss://chinese-quartet/quartet-storage-data/Short_reads_fastq/ILM_Nova_ARD_DNA/Quartet_DNA_ILM_Nova_ARD_LCL5_1_20181108_R1.fastq.gz', 'oss://chinese-quartet/quartet-storage-data/Short_reads_fastq/ILM_Nova_ARD_DNA/Quartet_DNA_ILM_Nova_ARD_LCL5_1_20181108_R2.fastq.gz', 'Quartet_DNA_ILM_Nova_ARD_LCL5_1_20181108']
      ],
      hotSettings: {
        colHeaders: true,
        filters: true,
        rowHeaders: true,
        dropdownMenu: true,
        autoRowSize: true,
        autoColSize: true,
        stretchH: 'all',
        height: '420',
        colWidths: 100,
        manualColumnFreeze: true,
        manualColumnResize: true,
        maxRows: 100,
        maxCols: 50,
        minRows: 20,
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
