<template>
  <a-row class="record-container">
    <a-row class="info">
      <a-col :sm="24" :xs="24" :md="12" :lg="12" class="file-info">
        <a-row class="title" style="padding-left: 0px;">
          <span>File Properties</span>
          <a-button
            style="float: right; height: 18px; padding-right: 0px;"
            type="link"
            icon="info-circle"
            @click="showDetails(recordId)"
          >Details</a-button>
        </a-row>
        <a-row v-for="(value, key) in fileRecord" :key="key" class="content">
          <a-col :sm="8" :xs="24" class="key">{{ formatKey(key) }}</a-col>
          <a-tooltip placement="topLeft">
            <template slot="title">
              <span>{{ value }}</span>
            </template>
            <a-col :sm="16" :xs="24" class="value">{{ value }}</a-col>
          </a-tooltip>
        </a-row>
      </a-col>
      <a-col :sm="24" :xs="24" :md="12" :lg="12" class="data-info">
        <a-row class="title">Data Information</a-row>
        <a-row v-for="(value, key) in dataRecord" :key="key" class="content">
          <a-col :sm="8" :xs="24" class="key">{{ formatKey(key) }}</a-col>
          <a-tooltip placement="topLeft">
            <template slot="title">
              <span>{{ value }}</span>
            </template>
            <a-col :sm="16" :xs="24" class="value">{{ value }}</a-col>
          </a-tooltip>
        </a-row>
      </a-col>
    </a-row>
    <file-viewer
      :title="title"
      :instanceId="instanceId"
      :viewerType="viewerType"
      :baseUrl="baseUrl"
    ></file-viewer>
  </a-row>
</template>

<script>
import v from 'voca'
import FileViewer from '@/components/FileViewer'
import { mapActions } from 'vuex'
import { initBaseURL } from '@/config/defaultSettings'

export default {
  components: {
    FileViewer
  },
  props: {
    recordId: {
      type: String,
      required: true
    },
    project: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      instanceId: '', // e.g. FUSCCTNBC185
      baseUrl: '', // http://10.157.72.54/pathology or http://10.157.72.54/dicom
      viewerType: '', // PATHOLOGY or DICOM
      title: '', // Pathology Viewer or DICOM Viewer
      record: {}
    }
  },
  computed: {
    fileRecord() {
      return (({ fileName, projectId, md5sum, dataFormat, fileSize }) => ({
        fileName,
        projectId,
        md5sum,
        dataFormat,
        fileSize
      }))(this.record)
    },
    dataRecord() {
      return (({ dataCategory, dataType, experimental_strategy, read_group_platform }) => ({
        dataCategory,
        dataType,
        experimental_strategy,
        read_group_platform
      }))(this.record)
    }
  },
  methods: {
    ...mapActions({
      getCollection: 'GetCollection'
    }),
    showDetails(link) {
      this.$router.push({
        name: 'file-manager',
        query: { path: link, refreshKey: JSON.stringify(Date.now()) }
      })
    },
    formatKey(key) {
      const formattedKey = key.replace(/([A-Z])/g, ' $1')
      return v.titleCase(formattedKey.split('_').join(' '))
    }
  },
  created() {
    this.getCollection({ filePath: this.recordId, defaultCollection: this.project })
      .then(response => {
        this.record = response
        if (this.record.dataFormat == 'NDPI') {
          this.instanceId = this.record.patientId
          this.baseUrl = `${initBaseURL()}/attachments/pathology`
          this.viewerType = 'PATHOLOGY'
          this.title = 'Pathology Viewer'
        } else if (this.record.dataFormat == 'NIFTI') {
          this.instanceId = this.record.patientId
          this.baseUrl = `${initBaseURL()}/attachments/dicom`
          this.viewerType = 'DICOM'
          this.title = 'DICOM Viewer'
        } else {
          this.title = 'File Viewer'
        }
      })
      .catch(error => {
        console.log(`No Such Record(${error}): `, this.recordId, this.project)
      })
  }
}
</script>

<style lang="less" scoped>
.record-container {
  // width: 100%;
  margin: 0px 80px;
  min-height: 300px;
  border-radius: 5px;

  .file-viewer {
    height: 550px;
    width: 100%;
  }

  .info {
    display: flex;
    flex-direction: row;
    margin: 10px 0px;
    border-radius: 5px;

    .title {
      font-size: 16px;
      margin-bottom: 10px;
      color: #6b6262;
      border-bottom: 1px solid #d9d9d9;
    }

    .file-info {
      margin-right: 10px;
    }

    .file-info,
    .data-info {
      width: calc(50% - 5px);
      background-color: #fff;
      // font-size: 16px;
      border-radius: 5px;

      .key {
        // font-weight: 450;
      }

      .value {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .ant-row {
        padding: 5px 10px;
        margin: 5px 10px;
      }

      .content.ant-row:nth-child(even) {
        // 利用css选择器，偶数列增加背景色
        background: #e8f4ff;
      }
    }
  }
}
</style>