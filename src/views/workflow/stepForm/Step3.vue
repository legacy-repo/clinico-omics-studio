<template>
  <div>
    <a-form style="margin: 40px auto 0;">
      <result title="Success" :is-success="true" description="Expected to be completed within half an hour." style="max-width: 560px;">
        <div class="information">
          <a-row>
            <a-col :sm="8" :xs="24">Project Name: </a-col>
            <a-col :sm="16" :xs="24"></a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">Description: </a-col>
            <a-col :sm="16" :xs="24"></a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">Submmiter: </a-col>
            <a-col :sm="16" :xs="24"></a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">Choppy App: </a-col>
            <a-col :sm="16" :xs="24">RNAseq_Variant_Calling</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">Started Time: </a-col>
            <a-col :sm="16" :xs="24">2019-09-20 08:30:00</a-col>
          </a-row>
        </div>
        <div slot="action">
          <a-button type="primary" @click="showJobs">Show Jobs</a-button>
          <a-button style="margin-left: 8px" @click="showProjects">Show Projects</a-button>
        </div>
      </result>
    </a-form>
  </div>
</template>

<script>
import { Result } from '@/components'

export default {
  name: 'Step3',
  components: {
    Result
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    showJobs () {
      this.$router.push({ name: 'job-management' })
    },
    showProjects () {
      this.$router.push({ name: 'project-management' })
    }
  }
}
</script>
<style lang="less" scoped>
  .information {
    line-height: 22px;

    .ant-row:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  .money {
    font-family: "Helvetica Neue",sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 14px;
  }
</style>
