<template>
  <page-view
    :title="getTitle($t)"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <detail-list slot="headerContent" size="small" :col="3" class="detail-layout">
      <detail-list-item :term="$t('workflow.workflowManagement.name')">{{ project.title }}</detail-list-item>
      <detail-list-item :term="$t('workflow.workflowManagement.author')">{{ project.author }}</detail-list-item>
      <detail-list-item :term="$t('workflow.workflowManagement.status')">
        <a-row class="badge-list">
          <!-- Total -->
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ $t('workflow.workflowManagement.totalJobs') }}</span>
            </template>
            <a-col
              class="badge"
              :style="{ backgroundColor: '#d9d9d9', color: '#fff' }"
            >{{ project.statusDetails.total }}</a-col>
          </a-tooltip>
          <!-- Submitted -->
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ $t('workflow.workflowManagement.submittedJobs') }}</span>
            </template>
            <a-col
              class="badge"
              :style="{ backgroundColor: '#838383', color: '#fff' }"
            >{{ countSubmitted(project) }}</a-col>
          </a-tooltip>
          <!-- Running -->
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ $t('workflow.workflowManagement.runningJobs') }}</span>
            </template>
            <a-col
              class="badge"
              :style="{ backgroundColor: '#108ee9', color: '#fff' }"
            >{{ project.statusDetails.running }}</a-col>
          </a-tooltip>
          <!-- Failed -->
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ $t('workflow.workflowManagement.failedJobs') }}</span>
            </template>
            <a-col
              class="badge"
              :style="{ backgroundColor: '#f5222d', color: '#fff' }"
            >{{ project.statusDetails.error }}</a-col>
          </a-tooltip>
          <!-- Succeeded -->
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ $t('workflow.workflowManagement.succeededJobs') }}</span>
            </template>
            <a-col
              class="badge"
              :style="{ backgroundColor: '#52c41a', color: '#fff' }"
            >{{ project.statusDetails.success }}</a-col>
          </a-tooltip>
          <!-- Warning -->
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ $t('workflow.workflowManagement.warningJobs') }}</span>
            </template>
            <a-col class="badge" :style="{ backgroundColor: '#faad14', color: '#fff' }">0</a-col>
          </a-tooltip>
        </a-row>
      </detail-list-item>
      <!-- <detail-list-item term="Percentage"> -->
      <!-- <a-progress :percent="project.percentage" :status="project.status" /> -->
      <!-- </detail-list-item> -->
      <detail-list-item :term="$t('workflow.workflowManagement.startedTime')">{{ project.startedAt }}</detail-list-item>
      <detail-list-item :term="$t('workflow.workflowManagement.finishedTime')">{{ project.finishedAt }}</detail-list-item>
      <detail-list-item :term="$t('workflow.workflowManagement.description')" style="width: 100%;">{{ project.description }}</detail-list-item>
    </detail-list>
    <a-row slot="extra" class="status-list">
      <a-col :xs="8" :sm="8">
        <div class="text">{{ $t('workflow.workflowManagement.relatedReport') }}</div>
        <div class="heading">
          <a-button
            type="primary"
            size="small"
            icon="logout"
            @click.native="onShowReport(project)"
          />
        </div>
      </a-col>
      <a-col :xs="16" :sm="16">
        <div class="text">{{ $t('workflow.workflowManagement.relatedApp') }}</div>
        <div class="heading">
          <a-tag color="#87d068" style="margin-right: 0px;">{{ project.appName }}</a-tag>
        </div>
      </a-col>
    </a-row>
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button @click="onShowReport(project)">{{ $t('workflow.workflowManagement.report') }}</a-button>
        <a-button disabled>{{ $t('workflow.workflowManagement.stop') }}</a-button>
        <a-button disabled>{{ $t('workflow.workflowManagement.restart') }}</a-button>
        <a-button type="primary" disabled>{{ $t('workflow.workflowManagement.archive') }}</a-button>
      </a-button-group>
    </template>

    <workflow-list @refresh="searchProject(projectId)"></workflow-list>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import DetailList from '@/components/Tools/DetailList'
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
  data() {
    return {
      project: {
        statusDetails: {}
      },
      timer: null
    }
  },
  computed: {
    projectId() {
      return this.$route.params.projectId
    }
  },
  methods: {
    ...mapActions({
      getProject: 'GetProject',
      getProjectStat: 'GetProjectStat',
      getReportList: 'GetReportList'
    }),
    countSubmitted(item) {
      return (
        item.statusDetails.total - (item.statusDetails.success + item.statusDetails.running + item.statusDetails.error)
      )
    },
    onShowReport(project) {
      this.getReportList({
        project_id: project.id
      })
        .then(result => {
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
            // TODO: Create Report?
            // this.$router.push({
            //   name: 'report-management',
            //   query: { creationMode: 'project', reportTool: project.projectName }
            // })
          }
        })
        .catch(error => {
          console.log('getReportList: ', error)
          this.$message.warn('No related report.')
        })
    },
    searchProject(projectId) {
      this.getProject(projectId)
        .then(result => {
          console.log('searchProject: ', result)
          this.project = result
          this.getProjectStat(result.id).then(response => {
            Object.assign(this.project.statusDetails, response)
          })
        })
        .catch(error => {
          console.log('searchProject: ', error)
          this.project = {}
        })
    },
    getTitle() {
      return this.$t('workflow.workflowManagement.projectMetadata')
    },
    onCreateProject() {
      this.$router.push({
        name: 'create-project'
      })
    }
  },
  created() {
    this.searchProject(this.projectId)
  },
  mounted() {
    this.timer = setInterval(() => {
      this.searchProject(this.projectId)
    }, 60000)
  },
  // When keepAlive is true, we need to clear timer before route leaving
  beforeRouteLeave(to, from, next) {
    next()
    if (this.timer) {
      console.log('Clear the searchProject timer.')
      clearInterval(this.timer)
      this.timer = null
    }
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
