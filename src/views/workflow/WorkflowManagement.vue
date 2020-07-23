<template>
  <page-view :title="getTitle()" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="Name">{{ project.title }}</detail-list-item>
      <detail-list-item term="Author">{{ project.author }}</detail-list-item>
      <detail-list-item term="Started Time">{{ project.startedAt }}</detail-list-item>
      <detail-list-item term="Finished Time">{{ project.finishedAt }}</detail-list-item>
      <detail-list-item term="Description">{{ project.description }}</detail-list-item>
      <a-row class="badge-list" :gutter="10">
        <!-- Total -->
        <a-tooltip placement="top">
          <template slot="title">
            <span>Total Jobs</span>
          </template>
          <a-col class="badge" :style="{ backgroundColor: '#d9d9d9', color: '#fff' }">{{ project.statusDetails.total }}</a-col>
        </a-tooltip>
        <!-- Running -->
        <a-tooltip placement="top">
          <template slot="title">
            <span>Running Jobs</span>
          </template>
          <a-col class="badge" :style="{ backgroundColor: '#108ee9', color: '#fff' }">{{ project.statusDetails.running }}</a-col>
        </a-tooltip>
        <!-- Red -->
        <a-tooltip placement="top">
          <template slot="title">
            <span>Failed Jobs</span>
          </template>
          <a-col class="badge" :style="{ backgroundColor: '#f5222d', color: '#fff' }">{{ project.statusDetails.error }}</a-col>
        </a-tooltip>
        <!-- Green -->
        <a-tooltip placement="top">
          <template slot="title">
            <span>Succeeded Jobs</span>
          </template>
          <a-col class="badge" :style="{ backgroundColor: '#52c41a', color: '#fff' }">{{ project.statusDetails.success }}</a-col>
        </a-tooltip>
        <!-- Yellow -->
        <a-tooltip placement="top">
          <template slot="title">
            <span>Warning Jobs</span>
          </template>
          <a-col class="badge" :style="{ backgroundColor: '#faad14', color: '#fff' }">0</a-col>
        </a-tooltip>
      </a-row>
      <!-- <detail-list-item term="Percentage"> -->
      <!-- <a-progress :percent="project.percentage" :status="project.status" /> -->
      <!-- </detail-list-item> -->
    </detail-list>
    <a-row slot="extra" class="status-list">
      <a-col :xs="8" :sm="8" >
        <div class="text">Related Report</div>
        <div class="heading">
          <a-button type="primary" size="small" icon="logout" @click.native="onShowReport(project.id)"/>
        </div>
      </a-col>
      <a-col :xs="16" :sm="16">
        <div class="text">Related App</div>
        <div class="heading">
          <a-tag color="#87d068" style="margin-right: 0px;">{{ project.appName }}</a-tag>
        </div>
      </a-col>
    </a-row>
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button disabled>Stop</a-button>
        <a-button disabled>Restart</a-button>
        <a-button type="primary" disabled>Archive</a-button>
      </a-button-group>
    </template>

    <workflow-list></workflow-list>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import WorkflowList from '@/views/workflow/itemList/WorkflowList'
import { mapActions } from 'vuex'

const DetailListItem = DetailList.Item

export default {
  name: 'WorkflowManagement',
  components: {
    PageView,
    WorkflowList,
    DetailList,
    DetailListItem
  },
  data () {
    return {
      project: {}
    }
  },
  computed: {
    projectId () {
      return this.$route.params.projectId
    }
  },
  methods: {
    ...mapActions({
      getProject: 'GetProject',
      getProjectStat: 'GetProjectStat',
      getReportList: 'GetReportList'
    }),
    onShowReport (projectId) {
      this.getReportList({
        'project_id': projectId
      }).then(result => {
        console.log('onShowReport: ', result)
        if (result.length > 0) {
          this.$router.push({
            name: 'report-details',
            params: {
              reportId: result[0].id
            },
            query: {
              readonly: true
            }
          })
        } else {
          this.$message.warn('No related report.')
        }
      }).catch(error => {
        console.log('getReportList: ', error)
        this.$message.warn('No related report.')
      })
    },
    searchProject (projectId) {
      this.getProject(projectId).then(result => {
        console.log('searchProject: ', result)
        this.project = result
        this.getProjectStat(result.id).then(response => {
          Object.assign(this.project.statusDetails, response)
        })
      }).catch(error => {
        console.log('searchProject: ', error)
        this.project = {}
      })
    },
    getTitle () {
      return 'Project Metadata'
    },
    onCreateProject () {
      this.$router.push({
        name: 'create-project'
      })
    }
  },
  created () {
    this.searchProject(this.projectId)
  },
  mounted () {
    this.timer = setInterval(() => {
      this.searchProject(this.projectId)
    }, 60000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.heading {
  margin-top: 5px;
}

.detail-layout {
  .badge-list {
    display: flex;
    flex-direction: row;
    margin-top: 4px;
    margin-left: 0px !important;
    margin-bottom: 0px;

    .badge {
      margin-right: 5px;
      border-radius: 50px;
      width: 25px;
      height: 25px;
      font-size: 12px;
      justify-content: center;
      align-items: center;
      display: flex;
    }
  }
}
</style>
