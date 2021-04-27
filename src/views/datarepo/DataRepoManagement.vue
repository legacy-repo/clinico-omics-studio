<template>
  <page-view
    title="Data Repo Management"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <template slot="action">
      <a-button type="primary" @click="onCreateDataRepo">Create Data Repo</a-button>
    </template>

    <div class="mask-window" v-if="dataRepoFormVisible" @click="hideDataRepoForm"></div>
    <!-- <data-repo-form class="popup-form-container" :reportTool="reportTool" :mode="mode" v-if="dataRepoFormVisible" @finished="forceUpdate"></-form> -->

    <data-repo-list></data-repo-list>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import DataRepoList from '@/views/datarepo/DataRepoList'
// import DataRepoForm from '@/views/datarepo/DataRepoForm'

export default {
  name: 'DataRepoManagement',
  components: {
    PageView,
    DataRepoList,
    // DataRepoForm
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
      dataRepoFormVisible: false,
      mode: 'directory'
    }
  },
  methods: {
    forceUpdate() {
      // Remove query parameters for avoiding to show report-form.
      this.$router.push({
        name: 'report-management'
      })
    },
    getTitle() {
      return this.$route.meta.title
    },
    onCreateDataRepo() {
      this.dataRepoFormVisible = true
    },
    hideDataRepoForm() {
      this.dataRepoFormVisible = false
    }
  },
  created() {
    if(this.creationMode) {
      this.dataRepoFormVisible = true
      this.mode = this.creationMode
    }
  }
}
</script>

<style lang="less" scoped>
// .mask-window and .popup-form-container are refered from external css file.
</style>
