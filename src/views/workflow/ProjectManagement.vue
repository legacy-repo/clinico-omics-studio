<template>
  <page-view :title="getTitle()" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <template slot="action">
      <a-button type="primary" @click="onCreateProject">Create Project</a-button>
    </template>

    <project-list></project-list>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import ProjectList from '@/views/workflow/itemList/ProjectList'

export default {
  name: 'ProjectManagement',
  components: {
    PageView,
    ProjectList
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
