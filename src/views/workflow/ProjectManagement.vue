<template>
  <page-view :title="getTitle()" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <template slot="action">
      <a-button type="primary" @click="onCreateProject">{{ $t('workflow.projectManagement.createProject') }}</a-button>
    </template>

    <project-list :id="refreshToken"></project-list>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import ProjectList from '@/views/workflow/itemList/ProjectList'
import { formatTitle } from '@/views/utils'

export default {
  name: 'ProjectManagement',
  components: {
    PageView,
    ProjectList
  },
  props: {
    refresh: {
      default: true,
      type: Boolean,
      required: false
    }
  },
  data () {
    return {

    }
  },
  computed: {
    refreshToken () {
      if (this.refresh) {
        return Math.random().toString(36).slice(-8)
      } else {
        return 'static'
      }
    }
  },
  methods: {
    getTitle () {
      return formatTitle(this, this.$route.meta.title)
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
