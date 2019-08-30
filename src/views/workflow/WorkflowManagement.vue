<template>
  <page-view :title="getTitle()" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button @click="onSwitchViewer(switchBtnText)">{{ switchBtnText }}</a-button>
        <!-- <a-button><a-icon type="ellipsis"/></a-button> -->
      </a-button-group>
      <a-button type="primary" >Submit Workflow</a-button>
    </template>

    <table-list v-if="tableViewActive"></table-list>
    <standard-list v-else></standard-list>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import TableList from '@/views/list/TableList'
import StandardList from '@/views/list/StandardList'

export default {
  name: 'WorkflowManagement',
  components: {
    PageView,
    TableList,
    StandardList
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
    }
  }
}
</script>

<style scoped>

</style>
