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
      <a-form-item label="Remote Directory" v-if="directoryMode">
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
      <a-form-item label="Started Time" prop="createdTime" ref="createdTime">
        <a-date-picker
          name="createdTime"
          style="width: 100%"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          v-decorator="['startedTime', {initialValue: now}]"
        />
      </a-form-item>
      <a-form-item label="Report">
        <a-select
          placeholder="Select the report"
          v-decorator="['reportTool', {rules: [{required: true, message: 'Please select report tool!'}]}]"
        >
          <a-select-option v-for="tool in reportTools" :key="tool.value">{{ tool.text }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Description">
        <a-textarea
          rows="4"
          placeholder="Please input description"
          v-decorator="['description', {rules: [{required: true, message: 'Please input report description'}]}]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 23 }">
        <a-button type="primary" html-type="submit" style="float: right; width: 100px;">Submit</a-button>
      </a-form-item>
    </a-form>
    <popup-file-browser
      filterType="/"
      @select-files="confirmSelectFiles"
      @cancel-select-files="cancelSelectFiles"
      v-if="fileBrowserActive"
    ></popup-file-browser>
  </div>
</template>

<script>
import moment from 'moment'
import flatMap from 'lodash.flatmap'
import PopupFileBrowser from '@/views/filemanager/PopupFileBrowser'

export default {
  components: {
    PopupFileBrowser
  },
  props: {
    directoryMode: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      now: moment(),
      fileBrowserActive: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      options: {},
      reportTools: [
        {
          text: 'Quartet DNA-Seq Report',
          value: 'quartet-dnaseq-report'
        }
      ]
    }
  },
  methods: {
    hideConfigPanel() {
      this.visible = !this.visible
    },
    selectDirectory() {
      this.fileBrowserActive = true
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
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  },
  created() {}
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
  margin-top: 20px;

  .ant-form-item {
    margin-bottom: 15px;

    .ant-btn {
      width: 100%;
    }
  }
}
</style>