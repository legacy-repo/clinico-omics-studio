<template>
  <div class="project-list">
    <a-card style="margin-top: 10px; height: 81vh;" :bordered="false">
      <a-badge slot="extra" showZero :count="pagination.total" :numberStyle="{ backgroundColor: '#52c41a' }" />
      <div slot="title">
        <a-radio-group @change="onClickRadioBtn" defaultValue="total" :value="radioGroupValue">
          <a-radio-button value="total">{{ $t('workflow.itemList.projectList.total') }}</a-radio-button>
          <a-radio-button value="Running">{{ $t('workflow.itemList.projectList.running') }}</a-radio-button>
          <a-radio-button value="Failed">{{ $t('workflow.itemList.projectList.failed') }}</a-radio-button>
          <a-radio-button value="Succeeded">{{ $t('workflow.itemList.projectList.finished') }}</a-radio-button>
          <a-radio-button value="Aborted">{{ $t('workflow.itemList.projectList.aborted') }}</a-radio-button>
        </a-radio-group>

        <a-select
          style="margin-left: 10px; width: 272px"
          :placeholder="$t('workflow.itemList.projectList.searchPlaceholder')"
          @change="onSelectApp"
          allowClear
        >
          <a-select-option :value="item.id" :key="item.name" v-for="item in installedApps">
            {{ item.name }}
          </a-select-option>
        </a-select>

        <a-input-search
          disabled
          style="margin-left: 16px; width: 272px"
          :placeholder="$t('workflow.itemList.projectList.enterProjectName')"
          :loading="loading"
          allowClear
          @search="onSearchProject"
        />
      </div>

      <a-list size="large" :loading="loading" :pagination="pagination">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-col :lg="8" :md="8" :sm="24" :xs="24">
            <a-list-item-meta>
              <div slot="description">{{ item.description }}</div>
              <a-popover slot="avatar" placement="right">
                <template slot="title">
                  {{ $t('workflow.itemList.projectList.appName') }}:
                  <a-tag color="#87d068" style="font-size: 16px">{{ item.appName }}</a-tag>
                </template>
                <template slot="content">
                  <vue-good-table
                    class="table-popover"
                    :search-options="{ enabled: true }"
                    styleClass="vgt-table striped bordered condensed"
                    :columns="genColumns(item.samples)"
                    :rows="item.samples"
                    v-if="item.samples.length !== 0"
                    :pagination-options="paginationOptions"
                    :line-numbers="true"
                  >
                    <template slot="table-row" slot-scope="props">
                      <a-tooltip placement="top">
                        <template slot="title">
                          <span>{{ props.formattedRow[props.column.field] }}</span>
                        </template>
                        <span>{{ formatRow(props.formattedRow[props.column.field]) }}</span>
                      </a-tooltip>
                    </template>
                  </vue-good-table>
                  <span v-else>{{ $t('workflow.itemList.projectList.noContent') }}</span>
                </template>
                <project-logo class="project-logo" />
              </a-popover>
              <a slot="title" @click="onShowWorkflowList(item.id, item.title)">{{ item.title }}</a>
            </a-list-item-meta>
          </a-col>
          <a-col class="list-content" :lg="12" :md="12" :sm="24" :xs="24" :gutter="16">
            <a-col class="list-content-item" :span="8">
              <span>{{ $t('workflow.itemList.projectList.startedTime') }}</span>
              <p>{{ item.startedAt }}</p>
            </a-col>
            <a-col class="list-content-item" :span="8">
              <span>{{ $t('workflow.itemList.projectList.finishedTime') }}</span>
              <p>{{ item.finishedAt }}</p>
            </a-col>
            <a-col class="list-content-item" :span="8">
              <!-- <a-progress :stroke-color="strokeColor" :percent="item.percentage" :status="!item.status ? null : item.status" style="width: 180px" /> -->
              <span>{{ $t('workflow.itemList.projectList.status') }}</span>
              <a-row class="badge-list" :gutter="10">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{{ $t('workflow.itemList.projectList.totalJobs') }}</span>
                  </template>
                  <a-col class="badge" :style="{ backgroundColor: '#a2a2a2', color: '#fff' }">
                    {{ item.statusDetails.total }}</a-col>
                </a-tooltip>
                <!-- Submitted -->
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{{ $t('workflow.itemList.projectList.submittedJobs') }}</span>
                  </template>
                  <a-col class="badge" :style="{ backgroundColor: '#838383', color: '#fff' }">
                    {{ countSubmitted(item) }}</a-col>
                </a-tooltip>
                <!-- Running -->
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{{ $t('workflow.itemList.projectList.runningJobs') }}</span>
                  </template>
                  <a-col class="badge" :style="{ backgroundColor: '#108ee9', color: '#fff' }">
                    {{ item.statusDetails.running }}</a-col>
                </a-tooltip>
                <!-- Red -->
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{{ $t('workflow.itemList.projectList.failedJobs') }}</span>
                  </template>
                  <a-col class="badge" :style="{ backgroundColor: '#f5222d', color: '#fff' }">
                    {{ item.statusDetails.error }}</a-col>
                </a-tooltip>
                <!-- Green -->
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{{ $t('workflow.itemList.projectList.succeededJobs') }}</span>
                  </template>
                  <a-col class="badge" :style="{ backgroundColor: '#52c41a', color: '#fff' }">{{
                    item.statusDetails.success
                  }}</a-col>
                </a-tooltip>
                <!-- Yellow -->
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{{ $t('workflow.itemList.projectList.warningJobs') }}</span>
                  </template>
                  <a-col class="badge" :style="{ backgroundColor: '#faad14', color: '#fff' }">0</a-col>
                </a-tooltip>
              </a-row>
            </a-col>
          </a-col>
          <div slot="actions">
            <a @click="onShowWorkflowList(item.id, item.title)">{{ $t('workflow.itemList.projectList.view') }}</a>
            &nbsp;
            <a @click="onShowReport(item.id)" :disabled="!item.id">{{ $t('workflow.itemList.projectList.report') }}</a>
            &nbsp;
            <a-popover :title="$t('workflow.itemList.projectList.notice')" trigger="hover" placement="bottomRight">
              <span slot="content" style="margin-bottom: 10px; display: block">
                {{ $t('workflow.itemList.projectList.noticeContent') }}
              </span>
              <a-row slot="content" style="text-align: end;">
                <a-button
                  type="danger"
                  @click="onAbortProject(item.id)"
                  size="small"
                >
                  <a-icon type="delete" />{{ $t('workflow.itemList.projectList.archive') }}
                </a-button>
              </a-row>
              <a v-if="adminGroup && item.status !== 'aborted'">
                {{ $t('workflow.itemList.projectList.archive') }}
              </a>
            </a-popover>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import v from 'voca'
import sortBy from 'lodash.sortby'
import orderBy from 'lodash.orderby'
import filter from 'lodash.filter'
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import { projectLogo } from '@/core/icons'

export default {
  name: 'ProjectList',
  components: {
    VueGoodTable,
    projectLogo
  },
  data() {
    return {
      popoverVisible: false,
      selectedApp: '',
      searchStr: '',
      data: [],
      pagination: {
        pageSizeOptions: ['30', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 30,
        page: 1,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.pagination.page = page
          this.pagination.pageSize = pageSize
          this.refresh()
        },
        onShowSizeChange: (current, pageSize) => {
          this.pagination.page = 1
          this.pagination.pageSize = pageSize
          this.refresh()
        }
      },
      paginationOptions: {
        enabled: true,
        mode: 'records',
        perPage: 5,
        position: 'top',
        perPageDropdown: [5, 10, 15, 20],
        dropdownAllowAll: false,
        setCurrentPage: 1,
        nextLabel: 'next',
        prevLabel: 'prev',
        rowsPerPageLabel: 'Rows per page',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All'
      },
      installedApps: [],
      loading: false,
      radioGroupValue: 'total',
      strokeColor: { '0%': '#108ee9', '100%': '#87d068' },
      timer: null
    }
  },
  computed: {
    adminGroup() {
      return this.userInfo().groups.includes('admin')
    }
  },
  methods: {
    ...mapActions({
      getProjectList: 'GetProjectList',
      getProjectStat: 'GetProjectStat',
      getInstalledAppList: 'GetInstalledAppList',
      getReportList: 'GetReportList',
      updateProject: 'UpdateProject'
    }),
    ...mapGetters(['userInfo']),
    countSubmitted(item) {
      return (
        item.statusDetails.total - (item.statusDetails.success + item.statusDetails.running + item.statusDetails.error)
      )
    },
    onSelectApp(selectedApp) {
      this.selectedApp = selectedApp
      this.refresh()
    },
    getInstalledApps() {
      this.getInstalledAppList().then(res => {
        console.log('res', res)
        this.installedApps = orderBy(
          res.data,
          [
            item => {
              item.name.toLowerCase()
            }
          ],
          ['asc']
        )
      })
    },
    makePayload() {
      const payload = {}
      if (this.searchStr && this.searchStr.length > 0) {
        payload['project_name'] = this.searchStr
      }

      if (this.selectedApp && this.selectedApp.length > 0) {
        payload['app_id'] = this.selectedApp
      }

      if (this.radioGroupValue !== 'total') {
        payload['status'] = this.radioGroupValue
      } else {
        // TODO: datains service need to support advanced query condition
        payload['status'] = 'Submitted'
      }

      return payload
    },
    onSearchProject(value) {
      this.searchStr = value
      this.refresh()
    },
    refresh() {
      const payload = this.makePayload()
      this.searchProject(this.pagination.page, this.pagination.pageSize, payload)
    },
    searchProject(page, pageSize, searchMap) {
      this.loading = true
      const payload = {
        page: page,
        page_size: pageSize,
        ...searchMap
      }
      this.getProjectList(payload).then(result => {
        const that = this

        that.data = result.data

        const statusDetails = new Array()
        for (let item of result.data) {
          const projectId = item.id
          statusDetails.push(this.getProjectStat(projectId))
        }

        Promise.all(statusDetails).then(values => {
          for (const idx in values) {
            Object.assign(that.data[idx].statusDetails, values[idx])
          }
        })

        that.pagination.pageSize = result.perPage
        that.pagination.total = result.total
        that.pagination.current = result.page
        this.loading = false
      })
    },
    formatKey(key) {
      return v.titleCase(key)
    },
    genColumns(rows) {
      var columns = []
      if (rows.length > 0) {
        const record = rows[0]
        for (const [key, value] of Object.entries(record)) {
          const config = {
            // label: this.formatKey(key),
            label: key,
            field: key,
            width: '180px',
            tdClass: 'text-center',
            thClass: 'text-center'
          }

          if (key === 'sample_id') {
            config['hidden'] = true
          }

          columns.push(config)
        }
      }

      return sortBy(columns, o => {
        return o.label
      })
    },
    formatRow(value) {
      if (value.match(/^\/(\w+\/?)+/)) {
        return this.baseName(value)
      } else {
        return value
      }
    },
    baseName(str) {
      return String(str).substring(str.lastIndexOf('/') + 1)
    },
    onClickRadioBtn(event) {
      // Reset Page
      this.pagination.page = 1
      this.radioGroupValue = event.target.value
      console.log('Current Radio Button Value: ', this.radioGroupValue)
      this.refresh()
    },
    onShowWorkflowList(projectId, projectName) {
      this.$router.push({
        name: 'job-management',
        params: {
          projectId: projectId
        },
        query: {
          projectName: projectName
        }
      })
    },
    onAbortProject(projectId) {
      this.updateProject(projectId).then(response => {
        console.log('onAbortProject: ', response)
        this.refresh()
      })
    },
    onShowReport(projectId) {
      this.getReportList({
        project_id: projectId
      })
        .then(result => {
          console.log('onShowReport: ', result)
          if (result.total > 0) {
            const data = result.data
            this.$router.push({
              name: 'report-details',
              params: {
                reportId: data[0].id
              },
              query: {
                readonly: true
              }
            })
          } else {
            this.$message.warn('No related report.')
          }
        })
        .catch(error => {
          console.log('getReportList: ', error)
          this.$message.warn('No related report.')
        })
    }
  },
  created() {
    this.searchProject(this.pagination.current, this.pagination.pageSize, { status: 'Submitted' })
    this.getInstalledApps()
  },
  mounted() {
    this.timer = setInterval(() => {
      this.refresh()
    }, 60000)
  },
  beforeRouteLeave(to, from, next) {
    next()
    if (this.timer) {
      console.log('Clear the refresh timer.')
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>

<style lang="less">
.text-center {
  text-align: center;
}

.project-list {
  .ant-card-body {
    height: calc(100% - 65px);
    overflow: scroll;
  }

  .ant-list-item {
    flex-wrap: wrap;
  }

  .list-content {
    display: flex;
    flex-direction: row;
  }

  .ant-list-item-meta,
  .list-content-item {
    margin-top: 5px;
  }

  .ant-list-item-action {
    margin-left: 0px;
    float: right;
  }

  .list-content-item {
    color: rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    font-size: 14px;

    .ant-tag {
      margin-bottom: 5px;
    }

    span {
      line-height: 20px;
    }

    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }

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

.json-popover,
.table-popover {
  margin-top: 0px;
  max-width: 600px;
  max-height: 300px;
  overflow: scroll;
}

.project-logo {
  font-size: 16px;
  padding: 4px;
  width: 55px;
  height: 55px;
  vertical-align: middle;
}
</style>
