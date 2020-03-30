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
      :bordered="false"
      title="Job List">
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
        :pagination="pagination">
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
                  <vue-json-pretty class="json-popover" v-if="Object.keys(item.jobParams).length !== 0" :data="item.jobParams"></vue-json-pretty>
                  <span v-else>No Content</span>
                </template>
                <config-logo class="config-logo" />
              </a-popover>
              <a slot="title" @click="onShowLog(item.id)">{{ item.title }}</a>
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
            <a @click="onShowLog(item.id)">Logs</a>
            &nbsp;
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>View</a></a-menu-item>
                <a-menu-item><a>Update</a></a-menu-item>
                <a-menu-item><a>Delete</a></a-menu-item>
              </a-menu>
              <a disabled>More<a-icon type="down"/></a>
            </a-dropdown>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
    <a-row class="box" v-if="logContainerActive">
      <log-container :logId="workflowId" @close="hideLogContainer()"></log-container>
    </a-row>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import LogContainer from '@/components/LogContainer/LogContainer'
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
          this.searchWorkflow(page, pageSize, this.searchStr)
        },
        onShowSizeChange: (current, pageSize) => {
          this.searchWorkflow(1, pageSize, this.searchStr)
        }
      },
      radioGroupValue: 'total',
      logContainerActive: false,
      workflowId: '',
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
      getWorkflowList: 'GetWorkflowList'
    }),
    hideLogContainer () {
      this.logContainerActive = !this.logContainerActive
    },
    searchWorkflow (page, pageSize, projectId, status) {
      this.loading = true
      this.getWorkflowList({
        page: page,
        'per-page': pageSize,
        'project-id': projectId,
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
    onShowLog (workflowId) {
      this.workflowId = workflowId
      this.logContainerActive = true
    }
  },
  created () {
    this.searchWorkflow(this.pagination.current, this.pagination.pageSize, this.projectId)
  }
}
</script>

<style lang="less" scoped>
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
