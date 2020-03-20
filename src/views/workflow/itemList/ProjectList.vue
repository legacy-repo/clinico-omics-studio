<template>
  <div>
    <a-card style="margin-top: 10px" :bordered="false">
      <a-badge slot="extra" :count="total" :numberStyle="{backgroundColor: '#52c41a'}"/>
      <div slot="title">
        <a-radio-group @change="onClickRadioBtn" defaultValue="total" :value="radioGroupValue">
          <a-radio-button value="total">Total</a-radio-button>
          <a-radio-button value="running">Running</a-radio-button>
          <a-radio-button value="finished">Finished</a-radio-button>
          <a-radio-button value="unfinished">Unfinished</a-radio-button>
        </a-radio-group>
        <a-input-search
          style="margin-left: 16px; width: 272px;"
          placeholder="Please Enter Project Name"
          @search="onSearch"
        />
      </div>

      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: perPage, total: total, current: page}">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.description">
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a @click="onShowWorkflowList(item.title)">View</a>
          </div>
          <div slot="actions">
            <a @click="onShowReport(item.title, item.report)" :disabled="!item.report">Report</a>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>Started</span>
              <p>{{ item.startedAt }}</p>
            </div>
            <div class="list-content-item">
              <span>Finished</span>
              <p>{{ item.finishedAt }}</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px" />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import { getWorkflowList } from '@/api/manage'
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
      data: {},
      total: 0,
      perPage: 5,
      page: 1,
      radioGroupValue: 'total'
    }
  },
  methods: {
    onSearch (value, event) {
      console.log('Search Box: ', value)
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
    onShowReport (workflowName, reportId) {
      this.$router.push({
        name: 'report-details',
        params: {
          reportId: reportId
        },
        query: {
          readonly: true,
          description: 'The Report of ' + workflowName
        }
      })
    }
  },
  created () {
    getWorkflowList({
      page: 1,
      per_page: 5
    }).then(result => {
      const that = this
      that.data = orderBy(result.data, [item => item.title.toLowerCase()], ['asc'])
      that.perPage = result.per_page
      that.total = result.total
      that.page = result.page
    })
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
}

.list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 20px;
    span {
        line-height: 20px;
    }
    p {
        margin-top: 4px;
        margin-bottom: 0;
        line-height: 22px;
    }
}

.popover {
  width: 300px;
}
</style>
