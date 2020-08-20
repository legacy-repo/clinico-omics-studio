<template>
  <page-view
    title="Report Management"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <template slot="action">
      <a-button type="primary" @click="onCreateReport">Create Report</a-button>
    </template>

    <div class="mask-window" v-if="reportFormVisible" @click="hideReportForm"></div>
    <report-form class="popup-form-container" v-if="reportFormVisible"></report-form>

    <report-list></report-list>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import ReportList from '@/views/report/ReportList'
import ReportForm from '@/views/report/ReportForm'

export default {
  name: 'ReportManagement',
  components: {
    PageView,
    ReportList,
    ReportForm
  },
  data() {
    return {
      reportFormVisible: false
    }
  },
  methods: {
    getTitle() {
      return this.$route.meta.title
    },
    onCreateReport() {
      this.reportFormVisible = true
    },
    hideReportForm() {
      this.reportFormVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
// .mask-window and .popup-form-container are refered from external css file.
</style>
