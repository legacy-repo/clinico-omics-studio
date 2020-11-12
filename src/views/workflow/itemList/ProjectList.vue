<template>
  <div class="project-list">
    <a-card style="margin-top: 10px" :bordered="false">
      <a-badge slot="extra" showZero :count="pagination.total" :numberStyle="{backgroundColor: '#52c41a'}"/>
      <div slot="title">
        <a-radio-group @change="onClickRadioBtn" defaultValue="total" :value="radioGroupValue">
          <a-radio-button value="total">Total</a-radio-button>
          <a-radio-button value="Running">Running</a-radio-button>
          <a-radio-button value="Failed">Failed</a-radio-button>
          <a-radio-button value="Succeeded">Finished</a-radio-button>
        </a-radio-group>
        <a-input-search
          style="margin-left: 16px; width: 272px;"
          placeholder="Please Enter Project Name"
          :loading="loading"
          allowClear
          disabled
          @search="onSearchProject"
        />
      </div>

      <a-list
        size="large"
        :loading="loading"
        :pagination="pagination">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-col :lg="8" :md="8" :sm="24" :xs="24">
            <a-list-item-meta>
              <div slot="description">{{ item.description }}</div>
              <a-popover slot="avatar" placement="right">
                <template slot="title">
                  App Name: <a-tag color="#87d068" style="font-size: 16px;">{{ item.appName }}</a-tag>
                </template>
                <template slot="content">
                  <vue-good-table class="table-popover" :search-options="{ enabled: true }"
                                  styleClass="vgt-table striped bordered condensed" :columns="genColumns(item.samples)" 
                                  :rows="item.samples" v-if="item.samples.length !== 0"
                                  :pagination-options="paginationOptions" :line-numbers="true">
                    <template slot="table-row" slot-scope="props">
                      <a-tooltip placement="top">
                        <template slot="title">
                          <span>{{ props.formattedRow[props.column.field] }}</span>
                        </template>
                        <span>{{ formatRow(props.formattedRow[props.column.field]) }}</span>
                      </a-tooltip>
                    </template>
                  </vue-good-table>
                  <span v-else>No Content</span>
                </template>
                <project-logo class="project-logo" />
              </a-popover>
              <a slot="title" @click="onShowWorkflowList(item.id)">{{ item.title }}</a>
            </a-list-item-meta>
          </a-col>
          <a-col class="list-content" :lg="12" :md="12" :sm="24" :xs="24" :gutter="16">
            <a-col class="list-content-item" :span="8">
              <span>Started</span>
              <p>{{ item.startedAt }}</p>
            </a-col>
            <a-col class="list-content-item" :span="8">
              <span>Finished</span>
              <p>{{ item.finishedAt }}</p>
            </a-col>
            <a-col class="list-content-item" :span="8">
              <!-- <a-progress :stroke-color="strokeColor" :percent="item.percentage" :status="!item.status ? null : item.status" style="width: 180px" /> -->
              <span>Status</span>
              <a-row class="badge-list" :gutter="10">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>Total Jobs</span>
                  </template>
                  <a-col class="badge" :style="{ backgroundColor: '#a2a2a2', color: '#fff' }">{{ item.statusDetails.total }}</a-col>
                </a-tooltip>
                <!-- Running -->
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>Running Jobs</span>
                  </template>
                  <a-col class="badge" :style="{ backgroundColor: '#108ee9', color: '#fff' }">{{ item.statusDetails.running }}</a-col>
                </a-tooltip>
                <!-- Red -->
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>Failed Jobs</span>
                  </template>
                  <a-col class="badge" :style="{ backgroundColor: '#f5222d', color: '#fff' }">{{ item.statusDetails.error }}</a-col>
                </a-tooltip>
                <!-- Green -->
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>Succeeded Jobs</span>
                  </template>
                  <a-col class="badge" :style="{ backgroundColor: '#52c41a', color: '#fff' }">{{ item.statusDetails.success }}</a-col>
                </a-tooltip>
                <!-- Yellow -->
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>Warning Jobs</span>
                  </template>
                  <a-col class="badge" :style="{ backgroundColor: '#faad14', color: '#fff' }">0</a-col>
                </a-tooltip>
              </a-row>
            </a-col>
          </a-col>
          <div slot="actions">
            <a @click="onShowWorkflowList(item.id)">View</a>
            &nbsp;
            <a @click="onShowReport(item.id)" :disabled="!item.id">Report</a>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import v from 'voca'
import sortBy from 'lodash.sortby'
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import { projectLogo } from '@/core/icons'

export default {
  name: 'ProjectList',
  components: {
    VueGoodTable,
    projectLogo
  },
  data () {
    return {
      searchStr: null,
      data: [],
      pagination: {
        pageSizeOptions: ['30', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 30,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.searchProject(page, pageSize, this.searchStr)
        },
        onShowSizeChange: (current, pageSize) => {
          this.searchProject(1, pageSize, this.searchStr)
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
      loading: false,
      radioGroupValue: 'total',
      strokeColor: { '0%': '#108ee9', '100%': '#87d068' }
    }
  },
  computed: {},
  methods: {
    ...mapActions({
      getProjectList: 'GetProjectList',
      getProjectStat: 'GetProjectStat',
      getReportList: 'GetReportList'
    }),
    onSearchProject (value) {
      this.searchProject(this.pagination.page, this.pagination.pageSize, value)
    },
    searchProject (page, pageSize, status) {
      this.loading = true
      this.getProjectList({
        page: page,
        per_page: pageSize,
        status: status
      }).then(result => {
        const that = this
        that.data = result.data

        const statusDetails = new Array()
        for (let item of result.data) {
          const projectId = item.id
          statusDetails.push(this.getProjectStat(projectId))
        }

        Promise.all(statusDetails).then((values) => {
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
    formatKey (key) {
      return v.titleCase(key)
    },
    genColumns (rows) {
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

      return sortBy(columns, (o) => {
        return o.label
      })
    },
    formatRow (value) {
      if (value.match(/^\/(\w+\/?)+/)) {
        return this.baseName(value)
      } else {
        return value
      }
    },
    baseName (str) {
      return String(str).substring(str.lastIndexOf('/') + 1)
    },
    onClickRadioBtn (event) {
      this.radioGroupValue = event.target.value
      console.log('Current Radio Button Value: ', this.radioGroupValue)
      if (this.radioGroupValue === 'total') {
        this.searchProject(this.pagination.current, this.pagination.pageSize)
      } else {
        this.searchProject(this.pagination.current, this.pagination.pageSize, this.radioGroupValue)
      }
    },
    onShowWorkflowList (projectId) {
      this.$router.push({
        name: 'job-management',
        params: {
          projectId: projectId
        }
      })
    },
    onShowReport (projectId) {
      this.getReportList({
        'project_id': projectId
      }).then(result => {
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
      }).catch(error => {
        console.log('getReportList: ', error)
        this.$message.warn('No related report.')
      })
    }
  },
  created () {
    this.searchProject(this.pagination.current, this.pagination.pageSize, this.searchStr)
  },
  mounted () {
    this.timer = setInterval(() => {
      this.searchProject(this.pagination.current, this.pagination.pageSize, this.searchStr)
    }, 60000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less">
.text-center {
  text-align: center;
}

.project-list {
  .ant-list-item {
    flex-wrap: wrap;
  }

  .list-content {
    display: flex;
    flex-direction: row;
  }

  .ant-list-item-meta, .list-content-item {
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

.json-popover, .table-popover {
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
