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
        <a-dropdown slot="extra" v-if="viewerType === 'PATHOLOGY'">
          <a-menu slot="overlay" class="extra-actions">
            <a-menu-item key="1">
              <a-button type="link" disabled>
                <a-icon style="font-size: 16px" theme="filled" type="play-circle" />
                PIK3CA_Mutation
              </a-button>
            </a-menu-item>
            <a-menu-item key="2">
              <a-button type="link">
                <a-icon style="font-size: 16px" theme="outlined" type="play-circle" />
                BLIS
              </a-button>
            </a-menu-item>
            <a-menu-item key="3">
              <a-button type="link">
                <a-icon style="font-size: 16px" theme="outlined" type="play-circle" />
                IM
              </a-button>
            </a-menu-item>
            <a-menu-item key="3">
              <a-button type="link">
                <a-icon style="font-size: 16px" theme="outlined" type="play-circle" />
                LAR
              </a-button>
            </a-menu-item>
            <a-menu-item key="3">
              <a-button type="link">
                <a-icon style="font-size: 16px" theme="outlined" type="play-circle" />
                MES
              </a-button>
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            <a-icon type="block" style="font-size: 18px" />
            Highlight Patches
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </a-collapse-panel>
      <a-collapse-panel key="pathology-model" v-if="viewerType === 'PATHOLOGY'" header="Pathology Model">
        <pathology-model
          :data="pathologyPrediction"
          :imageId="instanceId"
        ></pathology-model>
        <a-dropdown slot="extra">
          <a-menu slot="overlay" class="extra-actions">
            <a-menu-item key="1">
              <a-button type="link" disabled>
                <a-icon style="font-size: 16px" theme="filled" type="play-circle" />
                PIK3CA_Mutation
              </a-button>
            </a-menu-item>
            <a-menu-item key="2">
              <a-button type="link">
                <a-icon style="font-size: 16px" theme="outlined" type="play-circle" />
                BLIS
              </a-button>
            </a-menu-item>
            <a-menu-item key="3">
              <a-button type="link">
                <a-icon style="font-size: 16px" theme="outlined" type="play-circle" />
                IM
              </a-button>
            </a-menu-item>
            <a-menu-item key="3">
              <a-button type="link">
                <a-icon style="font-size: 16px" theme="outlined" type="play-circle" />
                LAR
              </a-button>
            </a-menu-item>
            <a-menu-item key="3">
              <a-button type="link">
                <a-icon style="font-size: 16px" theme="outlined" type="play-circle" />
                MES
              </a-button>
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            <a-icon type="codepen-circle" style="font-size: 18px" />
            Prediction Models
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </a-collapse-panel>
    </a-collapse>
  </a-row>
</template>

<script>
import v from 'voca'
import FileViewer from '@/components/FileViewer'
import { mapActions } from 'vuex'
import { initBaseURL } from '@/config/defaultSettings'
import PathologyModel from './PathologyModel'

export default {
  components: {
    FileViewer,
    PathologyModel
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
      pathologyPrediction: [],
      activeKey: ['file-viewer', 'pathology-model']
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
    this.getCollection({ filePath: this.recordId, defaultCollection: this.project })
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
        }
      })
      .catch(error => {
        console.log(`No Such Record(${error}): `, this.recordId, this.project)
      })

    this.$http.get('https://nordata-cdn.oss-cn-shanghai.aliyuncs.com/pathology-prediction.json').then(response => {
      console.log('Record: ', response)
      this.pathologyPrediction = response
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

  .ant-collapse-extra {
    margin-top: -5px;
  }
}

.extra-actions {
  .ant-dropdown-menu-item {
    padding: 0px;
  }

  .ant-btn:hover {
    border-color: #fff;
  }
}
</style>