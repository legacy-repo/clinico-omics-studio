<template>
  <div class="log-container">
    <a-icon @click="close" theme="filled" style="font-size: 16px; position: absolute; top: 5px; right: 5px;" type="close-circle" />
    <h3>{{ title }}</h3>
    <div class="loading" v-if="loading">
      <a-spin tip="Loading..."></a-spin>
    </div>
    <a-list class="loading" v-else-if="logs.length == 0"></a-list>
    <a-tabs size="small" animated @change="changeTab" v-else>
      <a-tab-pane :tab="log.title" :key="log.id" v-for="log in logs">
        <a-textarea read-only v-model="content"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import filter from 'lodash.filter'
import { getLogList, getLog } from '@/api/manage'

export default {
  name: 'LogContainer',
  props: {
    entityId: {
      required: true,
      type: String
    },
    entityType: {
      required: false,
      type: String,
      default: 'workflow'
    },
    title: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      content: 'No content.',
      loading: true,
      logs: []
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    changeTab (activeKey) {
      const activeLog = filter(this.logs, function (o) { return o.id === activeKey })
      console.log('changeTab', activeKey, activeLog)
      this.loadContent(activeLog[0].logType, activeLog[0].content)
    },
    loadContent (logType, content) {
      console.log('loadContent: ', logType, content)
      switch (logType) {
        case 'Link':
          getLog(content).then(result => {
            const that = this
            that.content = result
          }).catch(error => {
            const that = this
            console.log('getLog: ', error)
            that.content = 'No content.'
          })
          break
        case 'Content':
          this.content = content
          break
        default:
          this.content = 'No content.'
      }
    }
  },
  watch: {
    logs: function (logs) {
      if (logs.length > 0) {
        const log = logs[0]
        this.loadContent(log.logType, log.content)
      }
    }
  },
  created () {
    this.loading = true
    getLogList({
      page: 1,
      per_page: 5,
      entity_id: this.entityId,
      entity_type: this.entityType
    }).then(result => {
      const that = this
      console.log('getLogList: ', result)
      that.logs = result.data
      this.loading = false
    }).catch(error => {
      console.log('getLogList: ', error, this.entityId, this.entityType)
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
.log-container {
  background: #ffffff;
  overflow: hidden;

  .loading {
    margin-top: 10px;
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h3 {
    text-align: center;
    margin-bottom: 0px;
  }

  .ant-input {
    height: 300px;
  }

  .ant-input::-webkit-scrollbar {
    width: 0 !important;
  }

  textarea {
    resize: none;
  }
}
</style>
