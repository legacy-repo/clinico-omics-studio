<template>
  <div>
    <a-row class="title">Create Report</a-row>
    <a-form
      class="report-form"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 17 }"
      @submit="handleSubmit"
    >
      <a-form-item label="Name">
        <a-input
          placeholder="Please input report name"
          v-decorator="['reportName', { rules: [{ required: true, message: 'Please input report name!' }] }]"
        />
      </a-form-item>
      <a-form-item label="Report">
        <a-select
          allowClear
          @select="selectReportTool"
          placeholder="Select the report"
          v-decorator="['reportTool', {rules: [{required: true, message: 'Please select a report tool!'}]}]"
        >
          <a-select-option v-for="tool in reportTools" :key="tool.value">{{ tool.text }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="Metadata"
        class="metadata"
        :validateStatus="metadataStatus"
        :help="metadataHelpText"
      >
        <a-button @click="enterMetadata" :disabled="!metadataValid">
          <a-icon type="plus" />Enter Metadata
        </a-button>
        <vue-json-pretty class="json-viewer" :data="metadataBody"></vue-json-pretty>
      </a-form-item>
      <a-form-item label="Data" v-if="directoryMode">
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
      <a-form-item label="Projects" v-else>
        <a-button @click="selectProjects">
          <a-icon type="plus" />Select Projects
        </a-button>
        <a-select
          placeholder="Select the Directory"
          disabled
          v-decorator="['filepath', {rules: [{required: true, message: 'Please select directory!'}]}]"
        >
          <a-select-option v-for="d in options['filepath']" :key="d.value">{{ d.text }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Description">
        <a-textarea
          rows="4"
          placeholder="Please input description"
          v-decorator="['description', {rules: [{required: true, message: 'Please input report description'}]}]"
        />
      </a-form-item>
      <a-form-item label="Started Time" prop="createdTime" ref="createdTime">
        <a-date-picker
          name="createdTime"
          style="width: 100%"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          v-decorator="['startedTime', {initialValue: now}]"
        />
      </a-form-item>
      <a-button
        type="primary"
        class="submit-btn"
        html-type="submit"
        style="float: right; width: 100px;"
      >Submit</a-button>
    </a-form>
    <popup-file-browser
      filterType="/"
      @select-files="confirmSelectFiles"
      @cancel-select-files="cancelSelectFiles"
      v-if="fileBrowserActive"
    ></popup-file-browser>
    <a-drawer
      title="Metadata Table"
      placement="right"
      :closable="true"
      :width="600"
      :bodyStyle="{ padding: '0px' }"
      :visible="formTableActive"
      @close="onCloseFormTable"
    >
      <form-table
        :header="metadataHeader"
        :body="metadataBody"
        v-if="forceUpdate == true"
        @save="saveMetadata"
        @cancel="onCloseFormTable"
      ></form-table>
    </a-drawer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import flatMap from 'lodash.flatmap'
import map from 'lodash.map'
import filter from 'lodash.filter'
import zipObject from 'lodash.zipobject'
import PopupFileBrowser from '@/views/filemanager/PopupFileBrowser'
import FormTable from './FormTable'
import VueJsonPretty from 'vue-json-pretty'

export default {
  components: {
    PopupFileBrowser,
    FormTable,
    VueJsonPretty
  },
  props: {
    directoryMode: {
      type: Boolean,
      default: true
    },
    reportTool: {
      type: String,
      default: null,
      required: false
    }
  },
  data() {
    return {
      now: moment(),
      fileBrowserActive: false,
      formTableActive: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      options: {},
      reportTools: [],
      defaultReportTool: {},
      metadataValid: false,
      metadataHeader: [],
      metadataBody: [],
      metadataSchema: {},
      metadataStatus: null,
      metadataHelpText: '',
      forceUpdate: true
    }
  },
  methods: {
    ...mapActions({
      getToolManifest: 'GetToolManifest',
      getToolSchema: 'GetToolSchema',
      submitReport: 'SubmitReport'
    }),
    hideConfigPanel() {
      this.visible = !this.visible
    },
    selectDirectory() {
      this.fileBrowserActive = true
    },
    enterMetadata() {
      this.formTableActive = true
      this.$nextTick(() => {
        this.forceUpdate = true
      })
    },
    selectProjects() {},
    cancelSelectFiles() {
      this.fileBrowserActive = false
    },
    selectReportTool(reportTool) {
      console.log('selectReportTool: ', reportTool)
      this.getToolSchema(reportTool).then(res => {
        const type = res.type
        if (type === 'array') {
          this.metadataHeader = Object.keys(res.items.properties)
          this.metadataValid = true
        } else if (type === 'object') {
          this.metadataHeader = Object.keys(res.properties)
          this.metadataValid = true
        }
        this.metadataBody = []

        this.forceUpdate = false
        this.metadataSchema = res
      })
    },
    saveMetadata(data) {
      console.log('saveMetadata: ', data)
      this.metadataBody = map(data, item => {
        return zipObject(this.metadataHeader, item)
      })
    },
    confirmSelectFiles(filePathList) {
      this.fileBrowserActive = false
      const fields = {}
      fields['filepath'] = filePathList[0]

      this.options['filepath'] = flatMap(filePathList, o => ({ value: o, text: o }))
      this.form.setFieldsValue(fields)
      console.log('Selected Files: ', fields, 'filepath', filePathList)
    },
    onCloseFormTable() {
      this.formTableActive = false
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (this.metadataBody.length === 0) {
          (this.metadataStatus = 'error'), (this.metadataHelpText = 'Please enter metadata!')
        }

        if (!err) {
          values['metadata'] = this.metadataBody
          console.log('Received values of form: ', values)
          this.submitReport(values)
            .then(result => {
              console.log('postReport: ', result)
              this.$message.success('Create Report Successfully.')
              this.$emit('finished', result)
            })
            .catch(error => {
              console.log('postReport: ', error)
              this.$message.error('Unkonwn Error, Please Check Your Input.')
            })
        }
      })
    }
  },
  mounted() {},
  created() {
    this.getToolManifest().then(res => {
      const filteredReportTools = filter(res.data, item => {
        return item.category.toUpperCase() === 'REPORT'
      })
      this.reportTools = map(filteredReportTools, tool => ({
        text: tool.title,
        value: tool.shortName
      }))

      this.defaultReportTool = filter(this.reportTools, item => {
        return item.text === this.reportTool
      })[0]

      if (this.reportTool) {
        this.form.setFieldsValue({
          reportTool: this.reportTool
        })

        this.selectReportTool(this.defaultReportTool.value)
      }
    })
  }
}
</script>

<style lang="less" scoped>
.title {
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom: 1px solid #d6d6d6;
}

.report-form {
  height: 500px;
  overflow: scroll;
  margin: 10px 0px;

  .ant-form-item {
    margin-bottom: 15px;

    .ant-btn {
      width: 100%;
    }
  }

  .json-viewer {
    overflow: scroll;
    border: 1px solid #eeee;
    border-radius: 5px;
    margin-top: 10px;
    padding: 10px;
    max-height: 400px;
    background-color: #f5f5f5;
  }

  .submit-btn {
    position: absolute;
    top: 10px;
    right: 20px;
    width: 80px !important;
  }
}
</style>

<style lang="less">
.report-form {
  .metadata {
    .ant-form-item-children {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>