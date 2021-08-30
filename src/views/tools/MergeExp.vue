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
          <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" layout="horizontal">
            <a-form-item label="Data">
              <a-button @click="selectDirectory" style="margin-bottom: 5px">
                <a-icon type="plus" />Select Directory
              </a-button>
              <a-select
                placeholder="Select the Directory"
                disabled
                v-decorator="['filepath', { rules: [{ required: true, message: 'Please select directory!' }] }]"
              >
                <a-select-option v-for="d in options['filepath']" :key="d.value">{{ d.text }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Enable MultiQC">
              <a-select
                v-decorator="[
                  'enable_multiqc',
                  { initialValue: 'true', rules: [{ required: true, message: 'Whether to enable multiqc?' }] },
                ]"
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
          <a-table
            :columns="filteredColumns"
            :pagination="pagination"
            :loading="loading"
            :data-source="data"
            size="small"
          >
            <span slot="result" slot-scope="result, record">
              <a
                @click="redirectToFS(result)"
                target="_blank"
                :disabled="record.status !== 'success' || result === 'unknown'"
                >Download</a
              >
            </span>
            <span slot="status" slot-scope="status">
              <a-tag :color="formatColor(status)">{{ status.toUpperCase() }}</a-tag>
            </span>
          </a-table>
        </a-collapse-panel>
      </a-collapse>
    </a-row>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import VueMarkdown from 'vue-markdown'
import moment from 'moment'
import Prism from 'prismjs'
import filter from 'lodash.filter'
import flatMap from 'lodash.flatmap'
import orderBy from 'lodash.orderby'
import map from 'lodash.map'
import PopupFileBrowser from '@/views/filemanager/PopupFileBrowser'
import { initTServiceHost } from '@/config/defaultSettings'

export const formatDateTime = function(datetime) {
  if (datetime && datetime > 0) {
    return moment(datetime)
      .utcOffset('+08:00')
      .format('YYYY-MM-DD HH:mm')
  } else {
    return '0000-00-00 00:00'
  }
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    visible: false
    // scopedSlots: { customRender: 'link' }
  },
  {
    title: 'Source',
    dataIndex: 'filepath',
    key: 'filepath',
    align: 'center',
    visible: true
    // scopedSlots: { customRender: 'link' }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    align: 'center',
    visible: false
  },
  {
    title: 'Plugin Name',
    dataIndex: 'plugin_name',
    key: 'plugin_name',
    align: 'center',
    visible: false
  },
  {
    title: 'Plugin Type',
    dataIndex: 'plugin_type',
    key: 'plugin_type',
    align: 'center',
    visible: false
  },
  {
    title: 'Plugin Version',
    dataIndex: 'plugin_version',
    key: 'plugin_version',
    align: 'center',
    visible: false
  },
  {
    title: 'Created At',
    dataIndex: 'started_time',
    key: 'started_time',
    align: 'center',
    visible: true
  },
  {
    title: 'Finished At',
    dataIndex: 'finished_time',
    key: 'finished_time',
    align: 'center',
    visible: true
  },
  {
    title: 'Count Table',
    dataIndex: 'count_file',
    key: 'count_file',
    scopedSlots: { customRender: 'result' },
    visible: true,
    align: 'center'
  },
  {
    title: 'Expression Table',
    dataIndex: 'fpkm_file',
    key: 'fpkm_file',
    scopedSlots: { customRender: 'result' },
    visible: true,
    align: 'center'
  },
  {
    title: 'MultiQC',
    dataIndex: 'report',
    key: 'report',
    scopedSlots: { customRender: 'result' },
    visible: true,
    align: 'center'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' },
    visible: true
  },
  {
    title: 'Action',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
    align: 'center',
    visible: false
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
      form: this.$form.createForm(this, { name: 'coordinated' }),
      loading: false,
      pagination: {
        pageSizeOptions: ['10', '30', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.pagination.current = page
          this.pagination.pageSize = pageSize
          this.getTasks(this.pagination.current, this.pagination.pageSize)
        },
        onShowSizeChange: (current, pageSize) => {
          this.pagination.current = current
          this.pagination.pageSize = pageSize
          this.getTasks(this.pagination.current, this.pagination.pageSize)
        }
      }
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getTasks(this.pagination.current, this.pagination.pageSize)
    }, 10000)
  },
  computed: {
    filteredColumns: function() {
      return filter(this.columns, item => {
        return item.visible
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    next()
    if (this.timer) {
      console.log('Clear the updateTasks timer.')
      clearInterval(this.timer)
      this.timer = null
    }
  },
  beforeDestroy() {
    if (this.timer) {
      console.log('Clear the refresh timer.')
      clearInterval(this.timer)
      this.timer = null
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
      const minioLink = 'minio://tservice' + result
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
    getTasks(page, pageSize) {
      this.loading = true
      const baseUrl = `${initTServiceHost()}/api/tasks`
      this.$http
        .get(baseUrl, {
          params: {
            page: page,
            page_size: pageSize,
            plugin_name: 'merge-rnaseq-expression'
          }
        })
        .then(response => {
          this.pagination.total = response.total
          this.pagination.pageSize = response.page_size
          this.pagination.current = response.page
          console.log('Get Tasks: ', response)
          this.data = orderBy(this.formatRecords(response.data), 'started_time', 'desc')
          this.loading = false
        })
        .catch(error => {
          console.log('Get Tasks Error: ', error)
          this.data = []
          this.loading = false
        })
    },
    formatRecords(records) {
      return map(records, record => {
        const payload = record.payload
        let status = 'running'
        if (record.status === 'Finished') {
          status = 'success'
        } else if (record.status === 'Failed') {
          status = 'error'
        }

        const files = record.response.files
        const filepath = record.payload.filepath

        return {
          ...record,
          status: status,
          filepath: filepath,
          report: files.length === 3 ? files[0] : 'unknown',
          fpkm_file: files.length === 3 ? files[1] : 'unknown',
          count_file: files.length === 3 ? files[2] : 'unknown',
          finished_time: formatDateTime(record.finished_time),
          started_time: formatDateTime(record.started_time)
        }
      })
    },
    handleConvert(file) {
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
              this.getTasks(this.pagination.current, this.pagination.pageSize)
            })
            .catch(error => {
              console.log('Error: ', error)
              this.$message.error('Convert failed.')
            })
        }
      })
    }
  },
  created() {
    this.getTasks(this.pagination.current, this.pagination.pageSize)
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