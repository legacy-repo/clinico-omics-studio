<template>
  <div class="log-container">
    <a-icon @click="close" theme="filled" style="font-size: 16px; position: absolute; top: 3px; right: 3px;" type="close-circle" />
    <h3>{{ title }}</h3>
    <div class="loading" v-if="loading">
      <a-spin tip="Loading..."></a-spin>
    </div>
    <div class="loading" v-else-if="logs.length == 0">
      <a-textarea readOnly placeholder="Not found"/>
    </div>
    <a-tabs size="small" animated @change="loadContent" v-else>
      <a-tab-pane :tab="log.title" :key="log.link" v-for="log in logs">
        <a-textarea readOnly v-model="content"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { getLogList, getLog } from '@/api/manage'
import orderBy from 'lodash.orderby'

export default {
  name: 'LogContainer',
  props: {
    logId: {
      required: true,
      type: String
    },
    logType: {
      required: false,
      type: String,
      default: 'workflow'
    },
    title: {
      required: false,
      type: String,
      default: 'Log Container'
    }
  },
  data () {
    return {
      content: '',
      loading: true,
      logs: []
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    loadContent (activeKey) {
      if (activeKey) {
        getLog(activeKey).then(result => {
          const that = this
          that.content = result
        }).catch(error => {
          const that = this
          console.log('getLog: ', error)
          that.content = 'No content.'
        })
      }
    }
  },
  watch: {
    logs: function (logs) {
      if (logs.length > 0) {
        this.loadContent(logs[0].link)
      }
    }
  },
  created () {
    this.loading = true
    getLogList({
      page: 1,
      per_page: 5,
      log_id: this.logId,
      log_type: this.logType
    }).then(result => {
      const that = this
      console.log('getLogList: ', result)
      that.logs = orderBy(result.data, [item => item.title.toLowerCase()], ['asc'])
      this.loading = false
    }).catch(error => {
      console.log('getLogList: ', error, this.logId, this.logType)
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
.log-container {
  background: #f5f5f5;
  overflow: hidden;

  .loading {
    margin-top: 5px;
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
}
</style>
