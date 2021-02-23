<template>
  <a-row class="file-manager-container">
    <a-tabs :default-active-key="defaultActiveKey">
      <a-tab-pane key="file-browser">
        <span slot="tab">
          <a-icon type="cloud" />FileBrowser
        </span>
        <file-browser
          @file-select="onFileSelect"
          :standalone="false"
          :selected="selected"
          :height="400"
          :allowMultiSelection="multiple"
          :filterType="filterType"
        ></file-browser>
      </a-tab-pane>
      <a-tab-pane key="dataset">
        <span slot="tab">
          <a-icon type="experiment" />Custom DataSet
        </span>
        <data-set
          mode="selection"
          @file-select="onFileSelect"
          :selected="selected"
          :height="400"
          :allowMultiSelection="multiple"
          :filterType="filterType"
        ></data-set>
      </a-tab-pane>
    </a-tabs>
    <a-button-group>
      <a-button @click="cancelSelectFiles()">Cancel</a-button>
      <a-button @click="confirmSelectFiles()">Confirm</a-button>
    </a-button-group>
  </a-row>
</template>

<script>
import FileBrowser from './FileBrowser'
import flatMap from 'lodash.flatmap'
import DataSet from '@/views/datasource/DataSet'

export default {
  components: {
    FileBrowser: () => import('@/views/filemanager/FileBrowser'),
    DataSet: () => import('@/views/datasource/DataSet')
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    filterType: {
      type: String,
      default: ''
    },
    selected: {
      required: false,
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      files: []
    }
  },
  computed: {
    defaultActiveKey() {
      return 'file-browser'
    }
  },
  watch: {
    selected: {
      handler: function (newVal, oldVal) {
        if (newVal.length > 0) {
          this.files = newVal
        }
      },
      deep: true
    }
  },
  methods: {
    getPath(file) {
      return file.path
    },
    getFilePathLst(files) {
      const filePaths = flatMap(files, this.getPath)
      return filePaths
    },
    onFileSelect(files) {
      console.log('onFileSelect: ', files, this.filterType)
      this.files = files
    },
    cancelSelectFiles() {
      this.$emit('cancel-select-files')
    },
    confirmSelectFiles() {
      const filePathList = this.getFilePathLst(this.files)
      this.$emit('select-files', filePathList)
    }
  }
}
</script>

<style lang="less" scoped>
.file-manager-container {
  position: absolute;
  width: 1000px;
  top: 30%;
  left: 50%;
  margin-top: -150px;
  margin-left: -500px;
  z-index: 1000;

  .file-list {
    border: 1px solid #d3d3d3;
    border-radius: 5px;
  }

  .ant-btn-group {
    margin-top: 5px;
    float: right;
  }
}
</style>

<style lang="less">
.file-manager-container {
  .ant-tabs-bar {
    background-color: #fff;
    margin: 0px 0px 3px;
    border-radius: 3px;
    border-bottom: unset;

    .ant-tabs-ink-bar-animated {
      display: none !important;
    }
  }
}
</style>