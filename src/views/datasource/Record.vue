<template>
  <a-row class="record-container">
    <a-row class="info">
      <a-col :sm="24" :xs="24" :md="12" :lg="12" class="file-info">
        <a-row class="title" style="padding-left: 0px">
          <span>File Properties</span>
          <a-button class="details-btn" type="link" icon="info-circle" @click="showDetails(recordId)">
            Details
          </a-button>
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
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="file-viewer" :header="formatTitle(viewerType)">
        <file-viewer :instanceId="instanceId" :viewerType="viewerType" :baseUrl="baseUrl"></file-viewer>
      </a-collapse-panel>
      <a-collapse-panel key="clinical-data" header="Clinical Data">
        <data-portal v-if="instanceId" :minHeight="520" :id="instanceId + '-clinical-data'" :subpath="'/patient/clinicalData?' + parameters"></data-portal>
        <a-empty v-else />
      </a-collapse-panel>
      <a-collapse-panel key="omics-data" header="Omics Data">
        <data-portal v-if="instanceId" :minHeight="1100" :id="instanceId + '-omics-data'" :subpath="'/patient/summary?' + parameters"></data-portal>
        <a-empty v-else />
      </a-collapse-panel>
      <a-collapse-panel key="pathways" header="Pathways" style="display:none;">
        <data-portal v-if="instanceId" :id="instanceId + '-pathways'" :subpath="'/patient/pathways?' + parameters"></data-portal>
        <a-empty v-else />
      </a-collapse-panel>
    </a-collapse>
  </a-row>
</template>

<script>
import v from 'voca'
import FileViewer from '@/components/FileViewer'
import { mapActions, mapGetters } from 'vuex'
import { initBaseURL } from '@/config/defaultSettings'
import DataPortal from '@/views/iframe/DataPortal'

export default {
  components: {
    FileViewer,
    DataPortal
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
      record: {},
      activeKey: ['file-viewer', 'omics-data', 'clinical-data', 'pathways']
    }
  },
  computed: {
    parameters() {
      return `caseId=${this.instanceId}&studyId=FUSCC_BRCA_WSI&hideHeader=true&hideTabHeader=true`
    },
    isAdminGroup() {
      return this.userInfo().groups.includes('admin')
    },
    fileRecord() {
      return (({ fileName, project, md5sum, dataFormat, fileSize }) => ({
        fileName,
        project,
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
    ...mapGetters(['userInfo']),
    formatTitle(viewerType) {
      if (viewerType === 'PATHOLOGY') {
        return 'Pathology Viewer'
      } else if (viewerType === 'DICOM') {
        return 'DICOM Viewer'
      } else {
        return 'File Viewer'
      }
    },
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
    this.getCollection({ key: 'file_path', value: this.recordId, defaultCollection: this.project })
      .then(response => {
        this.record = response
        if (this.record.dataFormat == 'NDPI') {
          this.instanceId = this.record.patientId
          this.baseUrl = `${initBaseURL()}/attachments/pathology`
          this.viewerType = 'PATHOLOGY'
        } else if (this.record.dataFormat == 'NIFTI') {
          this.instanceId = this.record.patientId
          this.baseUrl = `${initBaseURL()}/attachments/dicom`
          this.viewerType = 'DICOM'
        } else if (this.record.patientId) {
          this.instanceId = this.record.patientId
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

    .file-info {
      margin-right: 10px;

      .details-btn {
        float: right;
        height: 18px;
        padding-right: 0px;
      }

      .details-btn:hover {
        border-color: #fff;
      }
    }

    .file-info,
    .data-info {
      width: calc(50% - 5px);
      background-color: #fff;
      font-size: 15px;
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

      .title {
        padding: 10px;
        font-size: 16px;
        margin-bottom: 10px;
        color: #6b6262;
        border-bottom: 1px solid #d9d9d9;
      }
    }
  }
}
</style>

<style lang="less">
.record-container {
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0px;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    font-size: 16px;
  }
}
</style>