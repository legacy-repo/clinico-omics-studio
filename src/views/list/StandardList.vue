<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="Running" content="8 tasks" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="Failed" content="32 tasks" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="Finished" content="24 tasks"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 10px"
      :bordered="false"
      title="Task List">

      <div slot="extra">
        <a-radio-group @change="onClickRadioBtn" defaultValue="total" :value="radioGroupValue">
          <a-radio-button value="total">Total</a-radio-button>
          <a-radio-button value="running">Running</a-radio-button>
          <a-radio-button value="failed">Failed</a-radio-button>
          <a-radio-button value="finished">Finished</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" placeholder="Please Enter Task Name" @search="onSearch" />
      </div>

      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: perPage, total: total, current: page}">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a @click="onShowReport(item.title, item.report)" :disabled="!item.report">Report</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a @click="onShowTask(item.title)">View</a></a-menu-item>
                <a-menu-item><a>Update</a></a-menu-item>
                <a-menu-item><a>Delete</a></a-menu-item>
              </a-menu>
              <a>More<a-icon type="down"/></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>Owner</span>
              <p>{{ item.owner }}</p>
            </div>
            <div class="list-content-item">
              <span>Started</span>
              <p>{{ item.startAt }}</p>
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

      <task-form ref="taskForm" />
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import TaskForm from './modules/TaskForm'
import { getTaskList } from '@/api/manage'

export default {
  name: 'StandardList',
  components: {
    HeadInfo,
    TaskForm
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
    onShowTask (taskName) {

    },
    onShowReport (taskName, reportId) {
      this.$router.push({
        name: 'report',
        params: {
          reportId: reportId
        },
        query: {
          readonly: true,
          description: 'The Report of ' + taskName
        }
      })
    }
  },
  created () {
    getTaskList().then(res => {
      const that = this
      that.data = res.data
      that.perPage = res.per_page
      that.total = res.total
      that.page = res.page
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
    margin-left: 40px;
    span {
        line-height: 20px;
    }
    p {
        margin-top: 4px;
        margin-bottom: 0;
        line-height: 22px;
    }
}
</style>
