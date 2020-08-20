<template>
  <a-row class="file-manager-container">
    <file-browser
      @file-select="onFileSelect"
      :standalone="false"
      :height="400"
      :allowMultiSelection="multiple"
      :filterType="filterType"
    ></file-browser>
    <a-button-group>
      <a-button @click="cancelSelectFiles()">Cancel</a-button>
      <a-button @click="confirmSelectFiles()">Confirm</a-button>
    </a-button-group>
  </a-row>
</template>

<script>
import FileBrowser from './FileBrowser'
import flatMap from 'lodash.flatmap'

export default {
  components: {
    FileBrowser
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    filterType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      files: []
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
  z-index: 1001;

  .ant-btn-group {
    margin-top: 5px;
    float: right;
  }
}
</style>