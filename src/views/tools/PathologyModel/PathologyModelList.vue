<template>
  <page-view title="Pathology AI Model" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <template slot="action">
      <a-button type="primary" @click="onCreateModels">Run Models</a-button>
    </template>
    <a-table
      class="pathology-model-container"
      :columns="filteredColumns"
      :loading="pathologyLoading"
      :data-source="data"
      :pagination="pagination"
      rowKey="task_name"
    >
      <a slot="link" slot-scope="text, record" @click="loadModelResults(record, showRecord)">
        {{ text }}
      </a>
      <span slot="operation" slot-scope="text, record">
        <a-button @click="loadModelResults(record, showRecord)" icon="eye" type="primary" style="margin-right: 5px;">Result</a-button>
        <a-button @click="getRecord(record.file_name)" icon="api">Connection</a-button>
      </span>
      <span slot="status" slot-scope="text">
        <a-tag color="#87d068" v-if="text === 'Success'">
          {{ text }}
        </a-tag>
        <a-tag color="#f50" v-if="text === 'Error'">
          {{ text }}
        </a-tag>
        <a-tag color="#108ee9" v-if="text === 'Running'">
          {{ text }}
        </a-tag>
      </span>
    </a-table>
    <a-drawer 
      class="pathology-uploader" 
      title="Run Models" 
      width="600" 
      placement="right" 
      @close="hideSubmitPanel"
      :maskClosable="false"
      :destroyOnClose="true"
      :visible="submitPanelVisible"
    >
      <model-submitter @close="hideSubmitPanel"></model-submitter>
    </a-drawer>
    <a-drawer
      class="pathology-model-list-drawer"
      title="Pathology Image"
      width="1000"
      placement="right"
      :visible="panelVisible"
      @close="hideRecord"
    >
      <a-collapse v-model="activeKey">
        <a-collapse-panel key="file-viewer" header="Pathology Visualizer">
          <a-dropdown slot="extra">
            <a-menu slot="overlay" class="extra-actions">
              <a-menu-item key="1">
                <!-- <a-button type="link" @click="downloadHeatmap(instanceId, currentModel)">
                  <a-icon style="font-size: 16px" theme="filled" type="play-circle" />
                  Download Heatmap
                </a-button> -->
                <a-checkbox @change="showHeatmap">
                  Floating in the Right Sidebar
                </a-checkbox>
              </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              <a-icon type="block" style="font-size: 18px" />
              Spatially Resolved Prediction Result
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <a-row class="pathology-image-viewer">
            <file-viewer :instanceId="instanceId" viewerType="PATHOLOGY" :baseUrl="baseUrl"></file-viewer>
            <img :src="getHeatmapUrl(instanceId, currentModel)" v-if="currentModel && heatmapVisible" class="heatmap" />
          </a-row>
        </a-collapse-panel>
        <a-collapse-panel key="pathology-model" header="Pathology Model">
          <pathology-model
            v-if="pathologyPrediction.length > 0"
            :data="pathologyPrediction"
            :imageId="instanceId"
          ></pathology-model>
          <a-empty v-else class="empty-container" />
        </a-collapse-panel>
      </a-collapse>
    </a-drawer>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import { mapActions, mapGetters } from 'vuex'
import PathologyMixins from '@/mixins/pathology'
import PathologyModel from './PathologyModel'
import ModelSubmitter from './ModelSubmitter'
import FileViewer from '@/components/FileViewer'
import filter from 'lodash.filter'
import FileSaver from 'file-saver'
import { initBaseURL } from '@/config/defaultSettings'

const columns = [
  {
    title: 'File Name',
    dataIndex: 'file_name',
    key: 'file_name',
    align: 'center',
    visible: true,
    scopedSlots: { customRender: 'link' }
  },
  {
    title: 'Model Name',
    dataIndex: 'model_name',
    key: 'model_name',
    align: 'center',
    visible: true,
  },
  {
    title: 'Patient ID',
    dataIndex: 'patient_id',
    key: 'patient_id',
    align: 'center',
    visible: false,
  },
  {
    title: 'Disease Type',
    dataIndex: 'disease_type',
    key: 'disease_type',
    align: 'center',
    visible: true,
  },
  {
    title: 'Primary Site',
    dataIndex: 'primary_site',
    key: 'primary_site',
    visible: false,
    align: 'center'
  },
  {
    title: 'Data Format',
    dataIndex: 'data_format',
    key: 'data_format',
    align: 'center',
    visible: true,
  },
  {
    title: 'Data Category',
    dataIndex: 'data_category',
    key: 'data_category',
    align: 'center',
    visible: true,
  },
  {
    title: 'Created At',
    dataIndex: 'started_time',
    key: 'started_time',
    align: 'center',
    visible: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' },
    visible: false,
  },
  {
    title: 'Action',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
    align: 'center',
    visible: true,
  }
]

export default {
  components: {
    PageView,
    FileViewer,
    PathologyModel,
    ModelSubmitter
  },
  mixins: [PathologyMixins],
  data() {
    return {
      columns,
      data: [],
      activeKey: ['file-viewer', 'pathology-model'],
      pathologyPrediction: [],
      instanceId: '',
      currentModel: '',
      baseUrl: '',
      loading: false,
      pathologyLoading: false,
      visible: false,
      panelVisible: false,
      heatmapVisible: false,
      submitPanelVisible: false,
      modelOptions: [
        { label: 'PIK3CA Mutation Model', value: 'PIK3CA_Mutation' },
        { label: 'Basal-like Immunosuppressed Model', value: 'BLIS' },
        { label: 'Immunomodulatory Model', value: 'IM' },
        { label: 'Luminal Androgen Receptor (LAR) Model', value: 'LAR' },
        { label: 'Mesenchymal (MES) Model', value: 'MES' }
      ],
      pagination: {
        pageSizeOptions: ['10', '30', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.pagination.current = page
          this.pagination.pageSize = pageSize
          this.getPathologyCollections(this.pagination.current, this.pagination.pageSize)
        },
        onShowSizeChange: (current, pageSize) => {
          this.pagination.current = current
          this.pagination.pageSize = pageSize
          this.getPathologyCollections(this.pagination.current, this.pagination.pageSize)
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      defaultCollection: 'defaultCollection'
    }),
    filteredColumns: function() {
      return filter(this.columns, item => {
        return item.visible
      })
    }
  },
  methods: {
    ...mapActions({
      getReportList: 'GetReportList',
      getCollection: 'GetCollection'
    }),
    showHeatmap() {
      this.heatmapVisible = !this.heatmapVisible
    },
    onCreateModels() {
      this.submitPanelVisible = true
    },
    getHeatmapUrl(instanceId, modelType) {
      return `${initBaseURL()}/attachments/pathology/${instanceId}_models/${modelType}/${instanceId}_heatmap.png`
    },
    downloadHeatmap(instanceId, modelType) {
      const imageUrl = `${initBaseURL()}/attachments/pathology/${instanceId}_models/${modelType}/${instanceId}_heatmap.png`
      FileSaver.saveAs(imageUrl, `${instanceId}_heatmap.png`)
    },
    showRecord() {
      this.panelVisible = true
    },
    hideRecord() {
      this.panelVisible = false
    },
    hideSubmitPanel(){
      this.submitPanelVisible = false
      this.getPathologyCollections(this.pagination.current, this.pagination.pageSize)
    },
    formatRecords(records) {
      const data = []
      records.forEach(record => {
          data.push({
            ...JSON.parse(record.description),
            model_name: record.appName,
            task_name: record.title,
            started_time: record.startedAt,
            status: record.taskStatus
          })
      })

      return data
    },
    redirectToRecord(path) {
      this.$router.push({
        name: 'record-viewer',
        query: {
          recordId: path,
          project: this.defaultCollection
        }
      })
    },
    getRecord(fileName) {
      this.getCollection({ key: 'datafile_id', value: fileName, defaultCollection: this.defaultCollection })
        .then(response => {
          console.log('Record: ', response)
          this.redirectToRecord(response.path)
        })
        .catch(error => {
          this.$message.warn('No such record in Omics Data Commons.')
          console.log(`No Such Record(${error}): `)
        })
    },
    getPathologyCollections(page, perPage) {
      this.pathologyLoading = true
      this.getReportList({
        page: page,
        per_page: perPage,
        status: 'Started',
        report_type: 'PathologyModel'
      }).then(response => {
        this.pagination.total = response.total
        this.pagination.current = response.page
        this.pagination.pageSize = response.perPage
        this.data = this.formatRecords(response.data)
        // that.pagination.pageSize = result.perPage
        // that.pagination.total = result.total
        // that.pagination.current = result.page
        this.$message.success('Refresh successfully!')
        this.pathologyLoading = false
      })
    },
    loadModelResults(record, callback) {
      // FileViewer
      this.instanceId = record.patient_id
      this.currentModel = record.model_name
      this.baseUrl = `${initBaseURL()}/attachments/pathology`

      // Pathology Model
      // const models = map(this.modelOptions, 'value')
      const models = [record.model_name]
      this.batchLoad(record.patient_id, models)
        .then(results => {
          this.pathologyPrediction = []
          for (let idx in models) {
            if (results[idx]) {
              this.pathologyPrediction.push(results[idx])
            }
          }

          callback()
        })
        .catch(error => {
          console.log('fetchModels Error: ', error)
          this.pathologyPrediction = []
          callback()
        })
    }
  },
  created() {
    this.getPathologyCollections(this.pagination.current, this.pagination.pageSize)
    setInterval(() => {
      this.data.forEach(record => {
        if (record.status === 'Running') {
          record.status = 'Success'
        }
      })
    }, 10000)
  }
}
</script>

<style lang="less">
.pathology-model-container {
  width: 100%;
  height: 81vh;
  background-color: #fff;

  .ant-pagination {
    margin-right: 5px;
  }

  .inner-table {
    margin: 0px !important;
    border-radius: 5px;
    border: 1px solid #d6d6d6;
  }
}

.prediction-modal {
  .ant-modal-body {
    padding: 16px 24px;
  }
}

.pathology-model-list-drawer {
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0px;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    font-size: 16px;
  }

  .ant-drawer-body {
    padding: 12px;
  }

  .file-viewer {
    height: 450px;
    width: 100%;
  }

  .empty-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 300px;
  }

  .ant-collapse-extra {
    margin-top: -5px;
  }

  .ant-tabs-tab {
    font-size: 16px;
    font-weight: 800;
  }

  .ant-tabs-nav .ant-tabs-tab-active {
    color: #ff0000;
  }

  .extra-actions {
    .ant-dropdown-menu-item {
      padding: 0px;
    }

    .ant-btn:hover {
      border-color: #fff;
    }
  }

  .pathology-image-viewer {
    width: 100%;
    height: 100%;

    .heatmap {
      position: absolute;
      width: 200px;
      right: 5px;
      bottom: 5px;
    }
  }
}
</style>
