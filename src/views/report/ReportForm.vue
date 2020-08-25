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
          v-decorator="['name', { rules: [{ required: true, message: 'Please input report name!' }] }]"
        />
      </a-form-item>
      <a-form-item label="Report">
        <a-select
          allowClear
          placeholder="Select the report"
          v-decorator="['reportTool', {initialValue: reportTool, rules: [{required: true, message: 'Please select report tool!'}]}]"
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
        <a-button @click="enterMetadata">
          <a-icon type="plus" />Enter Metadata
        </a-button>
        <vue-json-pretty class="json-viewer" :data="metadata"></vue-json-pretty>
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
      <form-table :data="metadata"></form-table>
    </a-drawer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import flatMap from 'lodash.flatmap'
import map from 'lodash.map'
import filter from 'lodash.filter'
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
      metadata: [{
        library: 'Test',
        group: 'group1',
        sample: 'D5'
      }],
      metadataStatus: null,
      metadataHelpText: ''
    }
  },
  methods: {
    ...mapActions({
      getToolManifest: 'GetToolManifest'
    }),
    hideConfigPanel() {
      this.visible = !this.visible
    },
    selectDirectory() {
      this.fileBrowserActive = true
    },
    enterMetadata() {
      this.formTableActive = true
    },
    selectProjects() {},
    cancelSelectFiles() {
      this.fileBrowserActive = false
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
        if (this.metadata.length === 0) {
          (this.metadataStatus = 'error'), (this.metadataHelpText = 'Please enter metadata!')
        }

        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  },
  created() {
    this.getToolManifest().then(res => {
      const filteredReportTools = filter(res.data, item => {
        return item.category.toUpperCase() === 'REPORT'
      })
      this.reportTools = map(filteredReportTools, tool => ({
        text: tool.title,
        value: tool.shortName
      }))
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