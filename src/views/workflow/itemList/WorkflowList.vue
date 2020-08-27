<template>
  <div>
    <a-card :bordered="false" v-if="false">
      <a-row>
        <a-col :sm="6" :xs="24">
          <head-info title="Running" content="8" :bordered="true"/>
        </a-col>
        <a-col :sm="6" :xs="24">
          <head-info title="Failed" content="32" :bordered="true"/>
        </a-col>
        <a-col :sm="6" :xs="24">
          <head-info title="Finished" content="24" :bordered="true"/>
        </a-col>
        <a-col :sm="6" :xs="24">
          <head-info title="Total" content="64"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 10px"
      :bordered="false">
      <div slot="title"><a-tag color="#87d068">Number of Jobs: {{ data.length }}</a-tag></div>
      <div slot="extra">
        <a-radio-group @change="onClickRadioBtn" defaultValue="total" :value="radioGroupValue">
          <a-radio-button value="total">Total</a-radio-button>
          <a-radio-button value="Running">Running</a-radio-button>
          <a-radio-button value="Failed">Failed</a-radio-button>
          <a-radio-button value="Succeeded">Finished</a-radio-button>
        </a-radio-group>
        <a-input-search
          style="margin-left: 16px; width: 272px;"
          placeholder="Please Enter Job Name"
          :loading="loading"
          :value="searchStr"
          disabled
          @search="searchWorkflow"
        />
      </div>

      <a-list
        size="large"
        :loading="loading"
        :pagination="pagination"
        class="job-list">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-col :lg="8" :md="8" :sm="24" :xs="24">
            <a-list-item-meta>
              <div slot="description">
                <a-tag color="pink" :key="key" v-for="(value, key) in item.labels">
                  {{ key }} = {{ value }}
                </a-tag>
              </div>
              <a-popover slot="avatar" placement="right" title="Job Parameters">
                <template slot="content">
                  <vue-json-pretty class="json-popover" @click="onClickNode" v-if="Object.keys(item.jobParams).length !== 0" :data="item.jobParams"></vue-json-pretty>
                  <span v-else>No Content</span>
                </template>
                <config-logo class="config-logo" />
              </a-popover>
              <a-tooltip placement="top" slot="title">
                <template slot="title">
                  <a @click="doCopy(item.workflowId)">Copy WorkflowId</a>
                </template>
                <a @click="onShowLog(item.workflowId, item.title)">{{ item.workflowId }}</a>
              </a-tooltip>
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
            <a @click="onShowLog(item.workflowId, item.title)">Logs</a>
            &nbsp;
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a @click=redirectToFS(item.workflowId)>Results</a></a-menu-item>
              </a-menu>
              <a>More Actions<a-icon type="down"/></a>
            </a-dropdown>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
    <a-row class="box" v-if="logContainerActive">
      <log-container :workflowId="workflowId" :title="workflowName" @close="hideLogContainer()"></log-container>
    </a-row>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
// import LogContainer from '@/components/LogContainer/LogContainer'
import LogContainer from '@/views/workflow/LogContainer'
import { configLogo } from '@/core/icons'
import VueJsonPretty from 'vue-json-pretty'
import { mapActions } from 'vuex'

export default {
  name: 'WorkflowList',
  components: {
    HeadInfo,
    LogContainer,
    configLogo,
    VueJsonPretty
  },
  data () {
    return {
      searchStr: '',
      data: [],
      pagination: {
        pageSizeOptions: ['5', '10', '20', '30', '40', '50'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 5,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.searchWorkflow(page, pageSize, this.projectId)
        },
        onShowSizeChange: (current, pageSize) => {
          this.searchWorkflow(1, pageSize, this.projectId)
        }
      },
      radioGroupValue: 'total',
      logContainerActive: false,
      workflowId: '',
      workflowName: 'Log Container',
      loading: false
    }
  },
  computed: {
    projectId () {
      return this.$route.params.projectId
    }
  },
  methods: {
    ...mapActions({
      getWorkflowList: 'GetWorkflowList',
      getWorkflow: 'GetWorkflow'
    }),
    hideLogContainer () {
      this.logContainerActive = !this.logContainerActive
    },
    searchWorkflow (page, pageSize, projectId, status) {
      this.loading = true
      this.getWorkflowList({
        page: page,
        per_page: pageSize,
        project_id: projectId,
        status: status
      }).then(result => {
        const that = this
        console.log('searchWorkflow: ', result)
        that.data = result.data
        that.pagination.pageSize = result.perPage
        that.pagination.total = result.total
        that.pagination.current = result.page
        this.loading = false
      })
    },
    onClickRadioBtn (event) {
      this.radioGroupValue = event.target.value
      console.log('Current Radio Button Value: ', this.radioGroupValue)
      if (this.radioGroupValue === 'total') {
        this.searchWorkflow(this.pagination.current, this.pagination.pageSize, this.projectId)
      } else {
        this.searchWorkflow(this.pagination.current, this.pagination.pageSize, this.projectId, this.radioGroupValue)
      }
    },
    onShowLog (workflowId, workflowName) {
      this.workflowId = workflowId
      this.workflowName = workflowName
      this.logContainerActive = true
    },
    doCopy (text) {
      this.$copyText(text).then(message => {
        console.log('copy', message)
        this.$message.success('Copied')
      }).catch(err => {
        console.log('copy.err', err)
        this.$message.error('Failed')
      })
    },
    redirectToFS (workflowId) {
      this.getWorkflow(workflowId)
        .then(response => {
          const workflowOutput = response.workflowOutput
          if (workflowOutput) {
            this.$router.push({
              name: 'file-manager',
              query: { path: workflowOutput }
            }) 
          } else {
            this.$message.warning('No such result.')
          }
        })
        .catch(error => {
          console.log('redirectToFS: ', error)
          this.$message.error('Unknown Error.')
        })
    },
    onClickNode (path, data) {
      if (data.startsWith('s3://') || data.startsWith('oss://') || data.startsWith('minio://')) {
        this.$router.push({
          name: 'file-manager',
          query: { path: data }
        })
      } else {
        this.$message.warning('Non-file Link.')
      }
    }
  },
  created () {
    this.searchWorkflow(this.pagination.current, this.pagination.pageSize, this.projectId)
  },
  mounted () {
    this.timer = setInterval(() => {
      this.searchWorkflow(this.pagination.current, this.pagination.pageSize, this.projectId)
    }, 60000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
@import (reference) "~@/components/index.less";

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

.job-list {
  .ant-list-item-meta-title > a {
    color: @primary-color;
  }
}

.json-popover {
  margin-top: 10px;
  max-width: 500px;
  max-height: 300px;
  overflow: scroll;
}

.json-popover::-webkit-scrollbar {
  width: 0 !important;
}

.box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.3);
  z-index: 10;

  .log-container {
    position: absolute;
    top: 150px;
    left: 10%;
    width: 80%;
    margin: 0px auto;
    z-index: 11;
    padding: 20px 30px 30px;
    border-radius: 5px;
    min-height: 300px;
  }
}

.config-logo {
  font-size: 16px;
  padding: 4px;
  width: 60px;
  height: 60px;
  vertical-align: middle;
}
</style>

<style lang="less">
.vjs-tree .vjs-value__string:hover {
  cursor: pointer;
}
</style>
