<template>
  <div class="import-form-container">
    <div class="title">Load Data</div>
    <a-row class="control-panel">
      <span>Use first row as column headers &nbsp;</span>
      <a-switch default-checked>
        <a-icon slot="checkedChildren" type="check" />
        <a-icon slot="unCheckedChildren" type="close" />
      </a-switch>
    </a-row>
    <a-tabs type="card">
      <a-tab-pane key="1" tab="Browser">
        <a-row class="import-box">
          <a-button @click="showFileBrowser">Browser Remote Files</a-button>
          <a-row>Supported file types: CSV, TSV</a-row>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" tab="By URL">
        <a-row class="import-box">
          <a-input-search
            placeholder="Input your data with URL"
            :value="externalURL"
            style="width: 80%;"
            enter-button="Load"
            @search="onSearch"
          />
          <span>HTTPS only. Supported file types: CSV, TSV.</span>
          <br />
          <span style="margin-bottom: 10px;">Example external data URL</span>
          <a-tooltip placement="top">
            <template slot="title">
              <a @click="doCopy(exampleLink)">Copy Link</a>
            </template>
            <a-tag>{{ exampleLink }}</a-tag>
          </a-tooltip>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Examples">
        <a-row class="import-box"></a-row>
      </a-tab-pane>
    </a-tabs>
    <popup-file-browser
      filterType=".*.csv|.*.tsv"
      @select-files="confirmSelectFiles"
      @cancel-select-files="cancelSelectFiles"
      v-if="fileBrowserActive"
    ></popup-file-browser>
  </div>
</template>

<script>
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
      fileBrowserActive: false,
      externalURL: '',
      exampleLink: 'https://raw.githubusercontent.com/plotly/datasets/master/iris.csv'
    }
  },
  methods: {
    hideConfigPanel() {
      this.visible = !this.visible
    },
    showFileBrowser() {
      this.fileBrowserActive = true
    },
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
    doCopy(text) {
      this.externalURL = text
      this.$copyText(text)
        .then(message => {
          console.log('copy', message)
          this.$message.success('Copy Successful')
        })
        .catch(err => {
          console.log('copy.err', err)
          this.$message.error('Copy Failed')
        })
    },
    onSearch(text) {
      console.log('onSearch: ', text)
    }
  },
  created() {}
}
</script>

<style lang="less">
.import-form-container {
  .ant-tabs-bar {
    margin: 0 0 10px 0;
  }

  .title {
    padding: 15px;
    font-size: 16px;
    border-bottom: 1px solid #d6d6d6;
  }

  .control-panel {
    margin: 20px 0px;
  }

  .import-box {
    width: 100%;
    height: 300px;
    border: 1px dashed #d6d6d6;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ant-input {
      margin-bottom: 10px;
    }

    .ant-btn {
      margin-bottom: 20px;
    }

    .ant-tag {
      font-size: 13px;
      padding: 5px;
    }
  }
}
</style>