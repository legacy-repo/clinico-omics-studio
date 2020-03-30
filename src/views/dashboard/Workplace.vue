<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}<span class="welcome-text">{{ welcome }}</span></div>
      <div>[Cardiothoracic Surgeon] - [Software Developer] - [Data Scientist]</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info :title="$t('dashboard.workplace.projects')" :content="projectNums" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info :title="$t('dashboard.workplace.jobs')" :content="jobNums" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info :title="$t('dashboard.workplace.reports')" :content="reportNums" :center="false" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-card
          class="project-list"
          :loading="projectLoading"
          style="margin: 0px 12px 10px;"
          :bordered="false"
          title="Ongoing Projects"
          :body-style="{ padding: 0 }">
          <a slot="extra" @click="onShowProjectMgmt">All Projects</a>
          <div>
            <a-card-grid @click.native="showProject(item.id)" style="width:25%;" class="project-card-grid" :key="i" v-for="(item, i) in projects">
              <a-card :bordered="false" :body-style="{ padding: 0 }">
                <a-card-meta>
                  <div slot="title" class="card-title">
                    <a-icon v-if="runningStatus(item)" theme="filled" spin type="clock-circle" style="color: #52c41a"/>
                    <a-badge v-else :count="item.percentage" :overflowCount="100" showZero :numberStyle="{backgroundColor: whichColor(item.status)}"/>>
                    <a>{{ item.title }}</a>
                  </div>
                  <div slot="description" class="card-description">
                    {{ item.description }}
                  </div>
                </a-card-meta>
                <div class="project-item">
                  <a>{{ item.author }}</a>
                  <span class="datetime">{{ getDuration(item.startedAt, item.finishedAt) }}</span>
                </div>
              </a-card>
            </a-card-grid>
          </div>
        </a-card>
      </a-row>
      <a-row :gutter="24">
        <a-col
          style="padding: 0 12px;"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="Quick Start / Navigation" style="height: 100px; margin-bottom: 10px" :bordered="false" :body-style="{padding: 0}">
            <div class="item-group">
              <!-- <a>操作一</a> -->
              <a-button disabled size="small" type="primary" ghost icon="plus">Add</a-button>
            </div>
          </a-card>
          <a-card :loading="teamLoading" title="Team" style="margin-bottom: 10px" :bordered="false">
            <div class="members">
              <a-row v-if="teams.length > 0">
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
              <a-row v-else>No Data</a-row>
            </div>
          </a-card>
        </a-col>
        <a-col
          style="padding-left: 0px;"
          :xl="16"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card :loading="activityLoading" title="Activity" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar" />
                  <div slot="title">
                    <span>{{ item.user.nickname }}</span>&nbsp;
                    On&nbsp;<a href="#">{{ item.project.name }}</a>&nbsp;
                    <span>{{ item.project.action }}</span>&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import moment from 'moment'
import { timeFix } from '@/utils/util'
import { mapState, mapActions } from 'vuex'

import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'

export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},

      projects: [],
      activities: [],
      teams: [],
      projectNums: '0',
      jobNums: '0',
      reportNums: '0',
      projectLoading: false,
      activityLoading: false,
      teamLoading: false
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome
    }),
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
    this.getProjects()
    this.getReportNums()
    this.getJobNums()
    // this.getActivity()
    // this.getTeams()
  },
  methods: {
    ...mapActions({
      getProjectList: 'GetProjectList',
      getReportList: 'GetReportList',
      getWorkflowList: 'GetWorkflowList'
    }),
    showProject (projectId) {
      this.$router.push({
        name: 'job-management',
        params: {
          projectId: projectId
        }
      })
    },
    runningStatus (project) {
      return project.percentage < 100 && project.status === 'active'
    },
    whichColor (status) {
      if (status === 'success') {
        return '#52c41a'
      } else if (status === 'active') {
        return '#fff'
      } else if (status === 'exception') {
        return 'red'
      } else {
        return 'cyan'
      }
    },
    getDuration (startedAt, finishedAt) {
      var currentTime = moment()

      if (finishedAt && finishedAt.length > 0) {
        currentTime = moment(finishedAt)
      }

      const startedTime = moment(startedAt)
      const du = moment.duration(currentTime - startedTime, 'ms')
      return du.locale('zh-cn').humanize()
    },
    onShowProjectMgmt () {
      this.$router.push({
        name: 'project-management'
      })
    },
    getProjects () {
      this.loading = true
      this.getProjectList({
        page: 1,
        'per-page': 12
      }).then(result => {
        this.projects = result.data
        this.projectNums = result.total.toString()
        this.loading = false
      })
    },
    getReportNums () {
      this.getReportList({
        page: 1,
        'per-page': 1
      }).then(result => {
        this.reportNums = result.total.toString()
      })
    },
    getJobNums () {
      this.getWorkflowList({
        page: 1,
        'per-page': 1
      }).then(result => {
        this.jobNums = result.total.toString()
      })
    },
    getActivity () {
      this.$http.get('/workplace/activity')
        .then(res => {
          this.activities = res.result
        })
    },
    getTeams () {
      this.$http.get('/workplace/teams')
        .then(res => {
          this.teams = res.result
        })
    }
  }
}
</script>

<style lang="less" scoped>
.project-list {

  .project-card-grid {
    cursor: pointer;
  }

  .card-title {
    font-size: 0;

    .anticon, .ant-badge {
      font-size: 20px;
      margin-top: 2px;
    }

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }
  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }
    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }
  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 10px 0 10px 24px;
  font-size: 0;
  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, .65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {

    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
