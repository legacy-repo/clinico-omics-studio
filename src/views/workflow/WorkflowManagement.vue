<template>
  <page-view :title="getTitle()" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button @click="onSwitchViewer(switchBtnText)">{{ switchBtnText }}</a-button>
      </a-button-group>
      <a-button type="primary" @click="onSubmitWorkflow">Submit Project</a-button>
    </template>

    <workflow-table v-if="tableViewActive"></workflow-table>
    <workflow-list v-else></workflow-list>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import WorkflowTable from '@/views/workflow/itemList/WorkflowTable'
import WorkflowList from '@/views/workflow/itemList/WorkflowList'

export default {
  name: 'WorkflowManagement',
  components: {
    PageView,
    WorkflowTable,
    WorkflowList
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
