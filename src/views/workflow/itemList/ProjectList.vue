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
          disabled
          style="margin-left: 16px; width: 272px;"
          placeholder="Please Enter Project Name"
          :loading="loading"
          :value="searchStr"
          @search="searchProject"
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
                  <vue-good-table class="table-popover" styleClass="vgt-table striped" :columns="genColumns(item.samples)" :rows="item.samples" v-if="item.samples.length !== 0"/>
                  <span v-else>No Content</span>
                </template>
                <project-logo class="project-logo" />
              </a-popover>
              <a slot="title" @click="onShowWorkflowList(item.id)">{{ item.title }}</a>
            </a-list-item-meta>
          </a-col>
          <a-col class="list-content" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="list-content-item">
              <span>Started</span>
              <p>{{ item.startedAt }}</p>
            </div>
            <div class="list-content-item">
              <span>Finished</span>
              <p>{{ item.finishedAt }}</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="item.percentage" :status="!item.status ? null : item.status" style="width: 180px" />
            </div>
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
      data: {},
      pagination: {
        pageSizeOptions: ['5', '10', '20', '30', '40', '50'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 5,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.searchProject(page, pageSize, this.searchStr)
        },
        onShowSizeChange: (current, pageSize) => {
          this.searchProject(1, pageSize, this.searchStr)
        }
      },
      loading: false,
      radioGroupValue: 'total'
    }
  },
  computed: {},
  methods: {
    ...mapActions({
      getProjectList: 'GetProjectList',
      getReportList: 'GetReportList'
    }),
    searchProject (page, pageSize, status) {
      this.loading = true
      this.getProjectList({
        page: page,
        'per-page': pageSize,
        status: status
      }).then(result => {
        const that = this
        that.data = result.data
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
      const columns = []
      if (rows.length > 0) {
        const record = rows[0]
        for (const [key, value] of Object.entries(record)) {
          columns.push({
            label: this.formatKey(key),
            field: key
          })
        }
      }

      return columns
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
        'project-id': projectId
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
    }
  },
  created () {
    this.searchProject(this.pagination.current, this.pagination.pageSize, this.searchStr)
  }
}
</script>

<style lang="less">
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
    margin-right: 40px;

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
}

.json-popover {
  margin-top: 10px;
  max-width: 500px;
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
