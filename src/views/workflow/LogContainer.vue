<template>
  <div class="log-container">
    <a-icon
      @click="close"
      theme="filled"
      style="font-size: 16px; position: absolute; top: 5px; right: 5px;"
      type="close-circle"
    />
    <h3>{{ title }}</h3>
    <div class="loading" v-if="loading">
      <a-spin tip="Loading..."></a-spin>
    </div>
    <a-list class="loading" v-else-if="logs.length == 0"></a-list>
    <a-row v-else :gutter="16">
      <a-select @change="selectLog" allowClear autoFocus showSearch placeholder="Select Log File">
        <a-select-option :value="item" :key="item" v-for="item in logKeys()">{{ cleanedLogKey(item) }}</a-select-option>
      </a-select>
      <a-tabs size="small" :activeKey="defaultTab" animated type="card" @change="switchTab">
        <a-tab-pane tab="Standard Output" key="stdout">
          <a-textarea read-only v-model="stdoutContent" />
        </a-tab-pane>
        <a-tab-pane tab="Standard Error" key="stderr">
          <a-textarea read-only v-model="stderrContent" />
        </a-tab-pane>
      </a-tabs>
    </a-row>
  </div>
</template>

<script>
import { getLogList } from '@/api/manage'
import sortBy from 'lodash.sortby'
import { initSeqFlowHost } from '@/utils/util'

export default {
  name: 'LogContainer',
  props: {
    workflowId: {
      required: true,
      type: String
    },
    title: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      loading: false,
      logs: {
        fastqc: {
          stdout: 'http://10.157.72.53:3000/cromwell/test_rna_seq/4e4a30f2-745e-4ae9-a8bd-6a151ab77c4d/call-fastqc/execution/stdout',
          stderr: 'http://10.157.72.53:3000/cromwell/test_rna_seq/4e4a30f2-745e-4ae9-a8bd-6a151ab77c4d/call-fastqc/execution/stderr'
        }
      },
      stdoutContent: 'Choose a log key from the dropdown menu.',
      stderrContent: 'Choose a log key from the dropdown menu.',
      currentLogKey: '',
      seqFlowHost: initSeqFlowHost(),
      defaultTab: 'stdout'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    selectLog (logKey) {
      if (logKey) {
        this.currentLogKey = logKey
        const stdoutLink = this.logs[logKey].stdout
        this.defaultTab = 'stdout'
        if (logKey !== 'system') {
          this.loadLog(stdoutLink, 'stdoutContent')
        } else {
          this.loadSystemLog('system')
        }
      } else {
        this.stdoutContent = 'Choose a log key from the dropdown menu.'
        this.stderrContent = 'Choose a log key from the dropdown menu.'
        this.currentLogKey = ''
        this.defaultTab = 'stdout'
      }
    },
    switchTab (tabKey) {
      this.defaultTab = tabKey

      if (this.currentLogKey) {
        if (this.currentLogKey !== 'system') {
          if (tabKey === 'stdout') {
            const stdoutLink = this.logs[this.currentLogKey].stdout
            this.loadLog(stdoutLink, 'stdoutContent')
          } else {
            const stderrLink = this.logs[this.currentLogKey].stderr
            this.loadLog(stderrLink, 'stderrContent')
          }
        } else {
          this.loadSystemLog('system')
        }
      }
    },
    logKeys () {
      return sortBy(Object.keys(this.logs))
    },
    cleanedLogKey (o) {
      return o.replace(/^[a-zA-Z0-9_]+\./gi, '')
    },
    loadSystemLog (logKey) {
      this.stdoutContent = this.logs[logKey].stdout
      this.stderrContent = this.logs[logKey].stderr
    },
    loadLog (fileLink, objKey) {
      const link = this.seqFlowHost + '/cromwell' + fileLink
      this.$http
        .get(link + `?timestamp=${new Date().getTime()}`)
        .then(response => {
          this[objKey] = response
        })
        .catch(error => {
          this[objKey] = 'Not Found Log.'
          console.log('Fetch Error: ', error)
        })
    },
    loadLogs (workflowId) {
      getLogList(workflowId)
        .then(response => {
          if (response.message) {
            this.logs = {}
          } else {
            this.logs = response
          }
        })
        .catch(error => {
          console.log('getLogList Error: ', error)
          this.logs = {}
        })
    },
    changeItem () {}
  },
  created () {
    this.loadLogs(this.workflowId)
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
    margin-bottom: 10px;
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

  .ant-select {
    position: absolute;
    right: 0px;
    width: 150px;
    top: 5px;
    z-index: 1000;
  }
}
</style>

<style lang="less">
.log-container {
  .ant-tabs {
    .ant-tabs-bar {
      margin: 0px 0px 5px 0px;
    }
  }
}
</style>