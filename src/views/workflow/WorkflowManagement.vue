<template>
  <page-view :title="getTitle()" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <workflow-list></workflow-list>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import WorkflowList from '@/views/workflow/itemList/WorkflowList'

export default {
  name: 'WorkflowManagement',
  components: {
    PageView,
    WorkflowList
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
