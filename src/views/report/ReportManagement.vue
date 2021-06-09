<template>
  <page-view
    title="Report Management"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <template slot="action">
      <a-button type="primary" @click="onCreateReport">Create Report</a-button>
    </template>

    <div class="mask-window" v-if="reportFormVisible" @click="hideReportForm"></div>
    <report-form class="popup-form-container" :reportTool="reportTool" :mode="mode" v-if="reportFormVisible" @finished="forceUpdate"></report-form>

    <report-list :key="reportFormVisible"></report-list>
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
  props: {
    // Sometimes we need to redirect from tool list and router's query parameters can make this happen.
    creationMode: {
      default: null,
      type: String,
      required: false
    },
    reportTool: {
      default: '',
      type: String,
      required: false
    }
  },
  data() {
    return {
      reportFormVisible: false,
      mode: 'directory'
    }
  },
  methods: {
    forceUpdate() {
      // Remove query parameters for avoiding to show report-form.
      this.hideReportForm()
      // TODO: Cannot work, how to deal with it?
      this.$router.replace({
        name: 'report-management'
      })
    },
    getTitle() {
      return this.$route.meta.title
    },
    onCreateReport() {
      this.reportFormVisible = true
    },
    hideReportForm() {
      this.reportFormVisible = false
    }
  },
  created() {
    if(this.creationMode) {
      this.reportFormVisible = true
      this.mode = this.creationMode
    }
  }
}
</script>

<style lang="less" scoped>
// .mask-window and .popup-form-container are refered from external css file.
</style>
