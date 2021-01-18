<template>
  <page-view
    title="Mutational signature analysis for low statistics SNV data"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <a-row class="tool-page" :gutter="16">
      <a-row class="page-header">
        <a-col :span="12" class="title">Parameters</a-col>
        <a-col :span="12" class="btn-group">
          <a-button
            type="primary"
            style="margin-right: 5px;"
            @click="handleUpload"
            :disabled="fileList.length === 0"
            :loading="uploading"
          >Run</a-button>
          <a-button type="primary" @click="showHelp">Help</a-button>
        </a-col>
      </a-row>
      <a-row class="tool-form">
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="File Type">
              <a-select
                v-decorator="['filetype', { initialValue: 'maf', rules: [{ required: true, message: 'Please select a file type!' }]}]"
                placeholder="Select a option"
              >
                <a-select-option value="maf">MAF</a-select-option>
                <a-select-option value="vcf">VCF</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Tumor Type">
              <a-select
                v-decorator="['tumor_type', { initialValue: 'breast', rules: [{ required: true, message: 'Please select a tumor type!' }]}]"
                placeholder="Select a option"
              >
                <a-select-option
                  v-for="item in orderedTumorTypeList"
                  :key="item.key"
                  :value="item.key"
                >
                  <a-tooltip>
                    <template slot="title">{{ item.value }}</template>
                    {{ item.value }}
                  </a-tooltip>
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Data Type">
              <a-select
                v-decorator="['data', { initialValue: 'seqcap', rules: [{ required: true, message: 'Please select a file type!' }]}]"
                placeholder="Select a option"
              >
                <a-select-option
                  v-for="item in orderedDataTypeList"
                  :key="item.key"
                  :value="item.key"
                >
                  <a-tooltip>
                    <template slot="title">{{ item.value }}</template>
                    {{ item.value }}
                  </a-tooltip>
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Do Assign">
              <a-select
                v-decorator="['do_assign', { initialValue: 'true', rules: [{ required: true, message: 'Please select a file type!' }]}]"
                placeholder="Select a option"
              >
                <a-select-option value="true">True</a-select-option>
                <a-select-option value="false">False</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Do MVA">
              <a-select
                v-decorator="['do_mva', { initialValue: 'true', rules: [{ required: true, message: 'Please select a file type!' }]}]"
                placeholder="Select a option"
              >
                <a-select-option value="true">True</a-select-option>
                <a-select-option value="false">False</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Lite Format">
              <a-select
                v-decorator="['lite_format', { initialValue: 'true', rules: [{ required: true, message: 'Please select a file type!' }]}]"
                placeholder="Select a option"
              >
                <a-select-option value="true">True</a-select-option>
                <a-select-option value="false">False</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Check MSI">
              <a-select
                v-decorator="['check_msi', { initialValue: 'true', rules: [{ required: true, message: 'Please select a file type!' }]}]"
                placeholder="Select a option"
              >
                <a-select-option value="true">True</a-select-option>
                <a-select-option value="false">False</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
          <a-upload-dragger
            name="file"
            :multiple="false"
            :remove="handleRemove"
            :before-upload="beforeUpload"
            :fileList="fileList"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">Click this area to upload</p>
            <p class="ant-upload-hint">Support for a single VCF file or MAF file upload.</p>
          </a-upload-dragger>
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
              <a-tag :color="status === 'success' ? 'green' : 'volcano'">{{ status.toUpperCase() }}</a-tag>
            </span>
          </a-table>
          <a-icon slot="extra" type="delete" @click="removeHistory" />
        </a-collapse-panel>
      </a-collapse>
      <a-drawer
        title="Help Documentation"
        placement="right"
        width="500"
        :closable="true"
        :visible="helpVisible"
        @close="onClose"
      >
        <vue-markdown :source="helpMsg" @rendered="update" class="markdown-viewer"></vue-markdown>
      </a-drawer>
    </a-row>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'
import moment from 'moment'
import orderBy from 'lodash.orderby'
import filter from 'lodash.filter'
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
    title: 'Result',
    dataIndex: 'result',
    key: 'result',
    scopedSlots: { customRender: 'result' },
    width: '100px',
    align: 'center'
  }
]

const dataTypeList = [
  { key: 'seqcap', value: 'Whole Exome Sequencing 37 Mb' },
  { key: 'msk', value: 'MSK-IMPACT 410 Genes' },
  { key: 'seqcap_probe', value: 'Whole Exome Sequencing 64 Mb' },
  { key: 'wgs', value: 'Whole Genome Sequencing' }
]

const orderedDataTypeList = orderBy(dataTypeList, 'value', 'aes')

const tumorTypeList = [
  // Tumor types with tuned MVA models
  { key: 'bladder', value: 'Urothelial Bladder Cancer' },
  { key: 'breast', value: 'Breast Cancer' },
  { key: 'eso', value: 'Oesophageal Carcinoma' },
  { key: 'ewing', value: 'Ewing Sarcoma' },
  { key: 'lms', value: 'Leiomyosarcoma' },
  { key: 'medullo', value: 'Medulloblastoma' },
  { key: 'osteo', value: 'Osteosarcoma' },
  { key: 'ovary', value: 'Ovarian Cancer' },
  { key: 'panc_ad', value: 'Pancreas Adenocarcinoma' },
  { key: 'panc_en', value: 'Pancreas Neuroendocrine' },
  { key: 'prost', value: 'Prostate Adenocarcinoma' },
  { key: 'stomach', value: 'Stomach Adenocarcinoma' },
  { key: 'uterus', value: 'Uterine corpus endometrial carcinoma' },
  // Tumor types without tuned MVA models but with references calculated based on WGS
  { key: 'biliary', value: 'Biliary Tract Cancer' },
  { key: 'cervix', value: 'Cervical Cancer' },
  { key: 'crc', value: 'Colorectal Adenocarcinoma' },
  { key: 'glioma', value: 'Glioblastoma' },
  { key: 'head', value: 'Head and Neck Cancer' },
  { key: 'leuk', value: 'Leukemia' },
  { key: 'lung', value: 'Lung Adenocarcinoma' },
  { key: 'lymph', value: 'Lymphoma' },
  { key: 'thyroid', value: 'Thyroid Cancer' }
]

const orderedTumorTypeList = orderBy(tumorTypeList, 'value', 'aes')

export default {
  components: {
    PageView,
    VueMarkdown
  },
  data() {
    return {
      appName: 'sigma',
      helpLink: 'https://nordata-cdn.oss-cn-shanghai.aliyuncs.com/clinico-omics/sigma.md',
      helpVisible: false,
      helpMsg: 'No Help Documentation.',
      data: [],
      orderedDataTypeList,
      orderedTumorTypeList,
      columns,
      fileList: [],
      parameters: {},
      uploading: false,
      activeKey: ['1'],
      tServiceHost: initTServiceHost(),
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  mounted() {
    this.timer = setInterval(this.updateTasks, 10000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  watch: {
    data: {
      handler(newData, oldData) {
        console.log('Data Updated!', newData, oldData)
        if (newData.length > 0) {
          localStorage.setItem('sigma-history', JSON.stringify(this.data))
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    redirectToFS(result) {
      const minioLink = 'minio://tservice/' + result
      this.$router.push({
        name: 'file-manager',
        query: { path: minioLink }
      })
    },
    formatParameters(values) {
      const parameters = JSON.parse(JSON.stringify(values))
      const fields = ['check_msi', 'lite_format', 'do_mva', 'do_assign']
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
    showHelp() {
      this.helpVisible = true
    },
    onClose() {
      this.helpVisible = false
    },
    removeHistory(event) {
      localStorage.setItem('sigma-history', '[]')
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
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload(file) {
      if (!file.name.match(/.*.maf|.*.vcf/)) {
        this.$message.warn('Only support MAF/VCF format.')
        return false
      }

      this.fileList = [...this.fileList, file]
      return false
    },
    updateTasks() {
      const runningTasks = filter(this.data, o => {
        return o.status === 'running'
      })

      runningTasks.forEach(task => {
        this.updateTask(task, resp => {
          console.log('updateTask: ', task, resp)
          const idx = this.data.findIndex(obj => obj.log == task.log)
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
      const history = JSON.parse(localStorage.getItem('sigma-history'))
      var sigmaHistory = history !== null ? history : []

      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }

        this.parameters = this.formatParameters(values)
        console.log('handleConvert: ', file.filepath, this.parameters)

        this.$http({
          url: this.tServiceHost + '/api/tool/sigma',
          method: 'post',
          data: {
            filepath: file.filepath,
            parameters: this.parameters
          }
        })
          .then(resp => {
            this.uploading = false
            this.$message.success('Submit successfully.')

            file['result'] = resp['output_file']
            file['log'] = resp['log_url']
            file['status'] = 'running'
            sigmaHistory.splice(0, 0, file)
            localStorage.setItem('sigma-history', JSON.stringify(sigmaHistory))
            this.loadHistory()
          })
          .catch(error => {
            file['result'] = null
            file['log'] = null
            file['status'] = 'error'
            sigmaHistory.splice(0, 0, file)
            localStorage.setItem('sigma-history', JSON.stringify(sigmaHistory))
            this.uploading = false
            console.log('Error: ', error)
            this.$message.error('Convert failed.')
          })
      })
    },
    handleUpload() {
      const { fileList } = this
      const formData = new FormData()
      for (var i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        // Here we create unique key 'files[i]' in our response dict
        formData.append('files', file)
      }

      this.uploading = true

      console.log('handleUpload: ', fileList)

      // You can use any AJAX library you like
      this.$http({
        url: this.tServiceHost + '/api/upload',
        method: 'post',
        processData: false,
        data: formData
      })
        .then(resp => {
          this.fileList = []

          const file = {
            filename: fileList[0].name,
            createdTime: moment().toString(),
            key: moment().toString(),
            filepath: resp['upload_path'] + '/' + fileList[0].name
          }
          this.handleConvert(file)
        })
        .catch(error => {
          this.uploading = false
          console.log('Error: ', error)
          this.$message.error('Convert failed.')
        })
    },
    loadHistory() {
      const history = JSON.parse(localStorage.getItem('sigma-history'))
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
      width: 50%;
    }

    .ant-form {
      padding-right: 20px;
      margin-top: -5px;
      display: flex;
      flex-direction: row;
      width: 100%;
      flex-wrap: wrap;
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

  .markdown-viewer {
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    padding: 10px;
    background-color: #fff;
    min-height: 500px;
  }
}

.tool-form {
  .ant-upload {
    height: calc(100% - 42px);
  }
}
</style>