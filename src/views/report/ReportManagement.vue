<template>
  <page-view :title="getTitle()" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <table-list v-if="tableViewActive"></table-list>
    <report-list v-else></report-list>
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
