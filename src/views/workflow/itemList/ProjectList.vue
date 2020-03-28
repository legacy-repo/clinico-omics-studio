<template>
  <div class="project-list">
    <a-card style="margin-top: 10px" :bordered="false">
      <a-badge slot="extra" :count="pagination.total" :numberStyle="{backgroundColor: '#52c41a'}"/>
      <div slot="title">
        <a-radio-group disabled @change="onClickRadioBtn" defaultValue="total" :value="radioGroupValue">
          <a-radio-button value="total">Total</a-radio-button>
          <a-radio-button value="running">Running</a-radio-button>
          <a-radio-button value="finished">Finished</a-radio-button>
          <a-radio-button value="unfinished">Unfinished</a-radio-button>
        </a-radio-group>
        <a-input-search
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
          <a-col :lg="10" :md="8" :sm="24" :xs="24">
            <a-list-item-meta>
              <div slot="description">
                <span>{{ item.description }}</span>
                <br>
                <a-tag color="#108ee9">{{ item.appName }}</a-tag>
              </div>
              <a slot="title">{{ item.title }}</a>
            </a-list-item-meta>
          </a-col>
          <a-col class="list-content" :lg="10" :md="12" :sm="24" :xs="24">
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
            <a @click="onShowReport(item.reportId)" :disabled="!item.reportId">Report</a>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import { getProjectList } from '@/api/manage'
import Avatar from '@/components/Avatar'
import orderBy from 'lodash.orderby'

export default {
  name: 'ProjectList',
  components: {
    Avatar,
    HeadInfo
  },
  data () {
    return {
      searchStr: '',
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
  methods: {
    searchProject (page, pageSize, searchStr) {
      this.loading = true
      getProjectList({
        page: page,
        per_page: pageSize,
        query_str: searchStr
      }).then(result => {
        const that = this
        that.data = orderBy(result.data, [item => item.title.toLowerCase()], ['asc'])
        that.pagination.pageSize = result.per_page
        that.pagination.total = result.total
        that.pagination.current = result.page
        this.loading = false
      })
    },
    onClickRadioBtn (event) {
      this.radioGroupValue = event.target.value
      console.log('Current Radio Button Value: ', this.radioGroupValue)
    },
    onShowWorkflowList (projectId) {
      this.$router.push({
        name: 'job-management',
        params: {
          projectId: projectId
        }
      })
    },
    onShowReport (reportId) {
      this.$router.push({
        name: 'report-details',
        params: {
          reportId: reportId
        },
        query: {
          readonly: true
        }
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

  .ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
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

.popover {
  iframe {
    width: 500px;
    min-height: 300px;
  }
}
</style>
