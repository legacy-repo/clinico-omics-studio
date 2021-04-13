<template>
  <div class="json-viewer-container">
    <a-row class="json-header">
      <a-button-group>
        <a-button block @click="downloadFile(body, 'sample')">{{ $t('workflow.stepForm.argumentJson.download') }}</a-button>
      </a-button-group>
      <h3 class="title">{{ $t('workflow.stepForm.argumentJson.jobParameters') }}</h3>
    </a-row>
    <vue-json-pretty class="json-viewer" :data="body"></vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'

export default {
  name: 'ArgumentJson',
  props: {
    header: {
      required: true,
      type: Array
    },
    body: {
      required: false,
      type: Object,
      default: () => Object()
    }
  },
  data () {
    return {}
  },
  methods: {
    downloadFile (exportObj, exportName) {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj))
      const downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', dataStr)
      downloadAnchorNode.setAttribute('download', exportName + '.json')
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    }
  },
  components: {
    VueJsonPretty
  }
}
</script>

<style lang="less" scoped>
.json-viewer-container {
  height: 100%;

  .json-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 8px;

    .title {
      margin-top: 3px;
      margin-bottom: 0px;
    }

    .ant-btn-group {
      position: absolute;
      left: 0px;
      width: 100px;
      display: flex;
    }
  }

  .json-viewer {
    overflow: scroll;
    border: 1px solid #eeee;
    border-radius: 5px;
    padding: 30px;
    max-height: 400px;
    background-color: #f5f5f5;
  }
}
</style>
