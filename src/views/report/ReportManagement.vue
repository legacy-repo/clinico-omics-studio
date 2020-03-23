<template>
  <page-view title="Report Management" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
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
    onCreateProject () {
      this.$router.push({
        name: 'create-project'
      })
    }
  }
}
</script>

<style scoped>

</style>
