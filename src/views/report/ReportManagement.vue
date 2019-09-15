<template>
  <page-view :title="getTitle()" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button @click="onSwitchViewer(switchBtnText)">{{ switchBtnText }}</a-button>
      </a-button-group>
      <a-button type="primary" @click="onSubmitWorkflow">Submit Workflow</a-button>
    </template>

    <table-list v-if="tableViewActive"></table-list>
    <report-list v-else></report-list>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import TableList from '@/views/list/TableList'
import ReportList from '@/views/list/ReportList'

export default {
  name: 'ReportManagement',
  components: {
    PageView,
    TableList,
    ReportList
  },
  data () {
    return {
      tableViewActive: false,
      switchBtnText: 'Table Mode'
    }
  },
  methods: {
    getTitle () {
      return this.$route.meta.title
    },
    onSwitchViewer (switchBtnText) {
      if (switchBtnText === 'List Mode') {
        this.switchBtnText = 'Table Mode'
      } else {
        this.switchBtnText = 'List Mode'
      }

      this.tableViewActive = !this.tableViewActive
    },
    onSubmitWorkflow () {
      this.$router.push({
        name: 'submit-workflow'
      })
    }
  }
}
</script>

<style scoped>

</style>
