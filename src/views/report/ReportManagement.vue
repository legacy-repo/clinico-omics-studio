<template>
  <page-view title="Report Management" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <template slot="action">
      <a-button type="primary" @click="onCreateReport">Create Report</a-button>
    </template>

    <report-list></report-list>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import ReportList from '@/views/report/ReportList'

export default {
  name: 'ReportManagement',
  components: {
    PageView,
    ReportList
  },
  data () {
    return {

    }
  },
  methods: {
    getTitle () {
      return this.$route.meta.title
    },
    onCreateReport () {
      this.$router.push({
        name: 'create-report'
      })
    }
  }
}
</script>

<style scoped>

</style>
