<template>
  <page-view
    title="Merge Expression Table for RNA-Seq"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <a-row class="tool-page" :gutter="16">
      <div class="mask-window" v-if="fileBrowserActive"></div>
      <popup-file-browser
        filterType="/"
        @select-files="confirmSelectFiles"
        @cancel-select-files="cancelSelectFiles"
        v-if="fileBrowserActive"
      ></popup-file-browser>
      <a-row class="page-header">
        <a-col :span="12" class="title">Parameters</a-col>
        <a-col :span="12" class="btn-group">
          <a-button type="primary" @click="handleConvert">Run</a-button>
        </a-col>
      </a-row>
      <a-row class="tool-form">
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <a-form
            :form="form"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
            layout="horizontal"
          >
            <a-form-item label="Data">
              <a-button @click="selectDirectory" style="margin-bottom: 5px;">
                <a-icon type="plus" />Select Directory
              </a-button>
              <a-select
                placeholder="Select the Directory"
                disabled
                v-decorator="['filepath', {rules: [{required: true, message: 'Please select directory!'}]}]"
              >
                <a-select-option v-for="d in options['filepath']" :key="d.value">{{ d.text }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Enable MultiQC">
              <a-select
                v-decorator="['enable_multiqc', { initialValue: 'true', rules: [{ required: true, message: 'Whether to enable multiqc?' }]}]"
                placeholder="Select a option"
              >
                <a-select-option value="true">True</a-select-option>
                <a-select-option value="false">False</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Excludes">
              <a-select disabled v-decorator="['excludes']" placeholder="Select a option"></a-select>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24" class="help-doc">
          <vue-markdown :source="helpMsg" @rendered="update" class="markdown-viewer"></vue-markdown>
        </a-col>
      </a-row>
    </a-row>
    <a-row class="task-history">
      <a-collapse v-model="activeKey">
        <a-collapse-panel key="1" header="Task History">
          <a-table :columns="columns" :data-source="data" size="small">
            <span slot="result" slot-scope="result, record">
              <a
                @click="redirectToFS(result)"
                target="_blank"
                :disabled="record.status !== 'success'"
              >Download</a>
            </span>
            <span slot="status" slot-scope="status">
              <a-tag :color="formatColor(status)">{{ status.toUpperCase() }}</a-tag>
            </span>
          </a-table>
          <a-icon slot="extra" type="delete" @click="removeHistory" />
        </a-collapse-panel>
      </a-collapse>
    </a-row>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'
import moment from 'moment'
import filter from 'lodash.filter'
import flatMap from 'lodash.flatmap'
import PopupFileBrowser from '@/views/filemanager/PopupFileBrowser'
import { initTServiceHost } from '@/config/defaultSettings'

const columns = [
  {
    dataIndex: 'filename',
    key: 'filename',
    title: 'File Name'
  },
  {
    title: 'Created Time',
    dataIndex: 'createdTime',
    key: 'createdTime',
    align: 'center'
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    width: '100px',
    align: 'center'
  },
  {
    title: 'Expression Table',
    dataIndex: 'output_file',
    key: 'output_file',
    scopedSlots: { customRender: 'result' },
    width: '200px',
    align: 'center'
  },
  {
    title: 'MultiQC',
    dataIndex: 'report',
    key: 'report',
    scopedSlots: { customRender: 'result' },
    width: '100px',
    align: 'center'
  }
]

export default {
  components: {
    PageView,
    VueMarkdown,
    PopupFileBrowser
  },
  data() {
    return {
      appName: 'merge-rnaseq-exp',
      helpLink: 'https://nordata-cdn.oss-cn-shanghai.aliyuncs.com/clinico-omics/merge-rnaseq-exp.md',
      helpMsg: 'No Help Documentation.',
      data: [],
      options: {},
      columns,
      parameters: {},
      activeKey: ['1'],
      fileBrowserActive: false,
      tServiceHost: initTServiceHost(),
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  mounted() {
    this.timer = setInterval(this.updateTasks, 10000)
  },
  beforeRouteLeave(to, from, next) {
    next()
    if (this.timer) {
      console.log('Clear the updateTasks timer.')
      clearInterval(this.timer)
      this.timer = null
    }
  },
  watch: {
    data: {
      handler(newData, oldData) {
        console.log('Data Updated!', newData, oldData)
        if (newData.length > 0) {
          localStorage.setItem('merge-rnaseq-exp-history', JSON.stringify(this.data))
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    confirmSelectFiles(filePathList) {
      this.fileBrowserActive = false
      const fields = {}
      fields['filepath'] = filePathList[0]

      this.options['filepath'] = flatMap(filePathList, o => ({ value: o, text: o }))
      this.form.setFieldsValue(fields)
      console.log('Selected Files: ', fields, 'filepath', filePathList)
    },
    cancelSelectFiles() {
      this.fileBrowserActive = false
    },
    selectDirectory() {
      this.fileBrowserActive = true
    },
    redirectToFS(result) {
      const minioLink = 'minio://tservice/' + result
      this.$router.push({
        name: 'file-manager',
        query: { path: minioLink, refreshKey: JSON.stringify(Date.now()) }
      })
    },
    formatParameters(values) {
      const parameters = JSON.parse(JSON.stringify(values))
      const fields = ['enable_multiqc']
      fields.forEach(o => {
        if (parameters[o]) {
          if (parameters[o] == 'true') {
            parameters[o] = true
          } else {
            parameters[o] = false
          }
        }
      })

      return parameters
    },
    removeHistory(event) {
      localStorage.setItem('merge-rnaseq-exp-history', '[]')
      this.loadHistory()
      this.$message.success('Remove History Successfully.')
      event.stopPropagation()
    },
    update() {
      this.$nextTick(() => {
        Prism.highlightAll()
      })
    },
    loadHelpMsg() {
      const helpLink = this.helpLink
      this.$http({
        url: helpLink,
        method: 'get',
        params: {}
      })
        .then(content => {
          this.helpMsg = content
          console.log('loadHelpMsg: ', content)
        })
        .catch(error => {
          this.helpMsg = 'No help document.'
          console.log('loadHelpMsg Error: ', error)
        })
    },
    formatColor(status) {
      if (status == 'success') {
        return '#87d068'
      } else if (status == 'running') {
        return '#108ee9'
      } else {
        return '#f50'
      }
    },
    updateTasks() {
      const runningTasks = filter(this.data, o => {
        return o.status === 'running'
      })

      runningTasks.forEach(task => {
        this.updateTask(task, resp => {
          const idx = this.data.findIndex(obj => obj.log == task.log)
          console.log('updateTask: ', task, resp, idx, resp.status.toUpperCase())
          if (resp.status.toUpperCase() == 'SUCCESS') {
            this.data[idx].status = 'success'
          } else if (resp.status.toUpperCase() == 'ERROR') {
            this.data[idx].status = 'error'
          }
        })
      })
    },
    updateTask(task, callback) {
      this.$http({
        url: this.tServiceHost + '/' + task.log,
        method: 'get'
      })
        .then(resp => {
          callback(resp)
        })
        .catch(error => {
          console.log('updateTask: ', error)
        })
    },
    handleConvert(file) {
      const history = JSON.parse(localStorage.getItem('merge-rnaseq-exp-history'))
      var mergeExpHistory = history !== null ? history : []

      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)

          this.parameters = this.formatParameters(values)
          console.log('handleConvert: ', this.parameters)

          this.$http({
            url: this.tServiceHost + '/api/tool/merge-rnaseq-exp',
            method: 'post',
            data: {
              ...this.parameters
            }
          })
            .then(resp => {
              this.$message.success('Submit successfully.')

              file['filename'] = this.parameters['filepath']
              file['createdTime'] = moment().toString()
              file['output_file'] = resp['output_file']
              file['report'] = resp['report']
              file['log'] = resp['log_url']
              file['status'] = 'running'
              mergeExpHistory.splice(0, 0, file)
              localStorage.setItem('merge-rnaseq-exp-history', JSON.stringify(mergeExpHistory))
              this.loadHistory()
            })
            .catch(error => {
              file['filename'] = this.parameters['filepath']
              file['report'] = null
              file['log'] = null
              file['output_file'] = null
              file['status'] = 'error'
              mergeExpHistory.splice(0, 0, file)
              localStorage.setItem('merge-rnaseq-exp-history', JSON.stringify(mergeExpHistory))
              console.log('Error: ', error)
              this.$message.error('Convert failed.')
            })
        }
      })
    },
    loadHistory() {
      const history = JSON.parse(localStorage.getItem('merge-rnaseq-exp-history'))
      this.data = history !== null ? history : []
    }
  },
  created() {
    this.loadHistory()
    this.loadHelpMsg()
  }
}
</script>

<style lang="less" scoped>
.tool-page {
  width: 100%;
  margin-left: 0px !important;
  margin-right: 0px !important;
  border: 1px solid #d9d9d9;
  border-radius: 3px;

  .page-header {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    display: flex;
    align-items: center;
    height: 48px;
    background-color: #fff;
    border-bottom: 1px solid #d9d9d9;

    .title {
      padding-left: 10px;
      font-size: 15px;
      font-weight: 500;
      color: #000000d9;
      display: flex;
      justify-content: flex-start;
    }

    .btn-group {
      padding-right: 10px;
      display: flex;
      justify-content: flex-end;
    }
  }

  .tool-form {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding: 20px 10px;
    background-color: #fff;

    .ant-col {
      height: 100%;
    }

    .ant-form-item {
      margin-bottom: 10px;
      width: 100%;
    }

    .ant-form {
      padding-right: 20px;
      margin-top: -5px;
      display: flex;
      flex-direction: row;
      width: 100%;
      flex-wrap: wrap;
    }

    .help-doc {
      overflow: scroll;
      text-align: justify;
      height: 180px;
      border-radius: 3px;
      border: 1px solid #e8e8e8;

      .markdown-viewer {
        border-radius: 3px;
        padding: 10px;
        background-color: #fff;
      }
    }
  }
}
</style>

<style lang="less">
.task-history {
  width: 100%;

  .ant-collapse {
    margin-top: 10px;

    .ant-collapse-content > .ant-collapse-content-box {
      padding: 0px 0px;
    }

    .ant-table-small {
      border: unset;
      border-radius: 0px;
    }
  }
}
</style>