<template>
  <page-view title="Pathology AI Model" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <a-table
      class="pathology-model-container"
      :columns="columns"
      :data-source="data"
      rowKey="file_name"
      @expand="expandRecord"
    >
      <a slot="link" slot-scope="text, record" @click="loadModelResults(record, showRecord)">
        {{ text }}
      </a>
      <span slot="operation" slot-scope="text, record">
        <a-button @click="showModal" style="margin-right: 10px;" icon="bulb">Prediction</a-button>
        <a-button @click="loadModelResults(record, showRecord)" icon="eye" type="primary">View</a-button>
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
      <template v-slot:expandedRowRender="record">
        <a-table
          :columns="innerColumns"
          :loading="loading"
          :data-source="innerData"
          :pagination="false"
          rowKey="modelName"
          class="inner-table"
        >
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
            <a-tag color="#d0d0d0" v-if="text === 'Unknown'">
              {{ text }}
            </a-tag>
          </span>
          <span slot="operation" slot-scope="text, record" class="table-operation">
            <a @click="loadModelResults(record, showRecord)" :disabled="text !== 'Success' || true">View</a>
          </span>
        </a-table>
      </template>
    </a-table>
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
          <file-viewer :instanceId="instanceId" viewerType="PATHOLOGY" :baseUrl="baseUrl"></file-viewer>
          <a-dropdown slot="extra">
            <a-menu slot="overlay" class="extra-actions">
              <a-menu-item key="1">
                <a-button type="link" disabled>
                  <a-icon style="font-size: 16px" theme="filled" type="play-circle" />
                  Left vs. Right
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
    <a-modal
      class="prediction-modal"
      title="Choose Model(s)"
      :width="450"
      :visible="visible"
      @ok="prediction"
      @cancel="hideModal"
    >
      <a-checkbox-group :options="modelOptions" />
    </a-modal>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import { getCollections } from '@/api/manage'
import PathologyMixins from '@/mixins/pathology'
import PathologyModel from './PathologyModel'
import FileViewer from '@/components/FileViewer'
import map from 'lodash.map'
import filter from 'lodash.filter'
import orderBy from 'lodash.orderby'
import { initBaseURL } from '@/config/defaultSettings'

const columns = [
  {
    title: 'File Name',
    dataIndex: 'file_name',
    key: 'file_name',
    align: 'left',
    scopedSlots: { customRender: 'link' }
  },
  {
    title: 'Patient ID',
    dataIndex: 'patient_id',
    key: 'patient_id',
    align: 'center'
  },
  {
    title: 'Disease Type',
    dataIndex: 'disease_type',
    key: 'disease_type',
    align: 'center'
  },
  {
    title: 'Primary Site',
    dataIndex: 'primary_site',
    key: 'primary_site',
    align: 'center'
  },
  {
    title: 'Data Format',
    dataIndex: 'data_format',
    key: 'data_format',
    align: 'center'
  },
  {
    title: 'Data Category',
    dataIndex: 'data_category',
    key: 'data_category',
    align: 'center'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: 'Action',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
    align: 'center'
  }
]

const innerColumns = [
  { title: 'Model Name', dataIndex: 'modelName', key: 'modelName' },
  { title: 'Description', align: 'center', dataIndex: 'description', key: 'description' },
  { title: 'Status', align: 'center', dataIndex: 'status', key: 'status', scopedSlots: { customRender: 'status' } },
  { title: 'Report', key: 'action', dataIndex: 'status', scopedSlots: { customRender: 'operation' } }
]

const initialInnerData = [
  {
    modelName: 'PIK3CA_Mutation',
    description: 'PIK3CA Mutation Model',
    status: ''
  },
  {
    modelName: 'BLIS',
    description: 'Basal-like Immunosuppressed Model',
    status: ''
  },
  {
    modelName: 'IM',
    description: 'Immunomodulatory Model',
    status: ''
  },
  {
    modelName: 'LAR',
    description: 'Luminal Androgen Receptor (LAR) Model',
    status: ''
  },
  {
    modelName: 'MES',
    description: 'Mesenchymal (MES) Model',
    status: ''
  }
]

export default {
  components: {
    PageView,
    FileViewer,
    PathologyModel
  },
  mixins: [PathologyMixins],
  data() {
    return {
      columns,
      innerColumns,
      defaultCollection: 'tcoa',
      data: [],
      innerData: JSON.parse(JSON.stringify(initialInnerData)),
      modelOptions: [
        { label: 'PIK3CA Mutation Model', value: 'PIK3CA_Mutation' },
        { label: 'Basal-like Immunosuppressed Model', value: 'BLIS' },
        { label: 'Immunomodulatory Model', value: 'IM' },
        { label: 'Luminal Androgen Receptor (LAR) Model', value: 'LAR' },
        { label: 'Mesenchymal (MES) Model', value: 'MES' }
      ],
      activeKey: ['file-viewer', 'pathology-model'],
      pathologyPrediction: [],
      instanceId: '',
      baseUrl: '',
      loading: false,
      visible: false,
      panelVisible: false
    }
  },
  methods: {
    getCollections,
    showRecord() {
      this.panelVisible = true
    },
    hideRecord() {
      this.panelVisible = false
    },
    showModal() {
      this.visible = true
    },
    hideModal() {
      this.visible = false
    },
    prediction(models) {
      this.$message.warning('Prediction AI Server is Down, Please Contact the Administrator.')
      this.hideModal()
    },
    getPathologyCollections() {
      const parameter = {
        page: 1,
        per_page: 1000
      }

      const payload = {
        type: 'rule',
        query: {
          variable: 'data_format',
          operator: '=',
          value: 'NDPI'
        }
      }

      this.getCollections(this.defaultCollection, parameter, payload)
        .then(response => {
          if (response.total > 0) {
            this.data = orderBy(response.data, 'file_name')
          } else {
            this.data = []
          }
        })
        .catch(error => {
          console.log('Get Pathology Collections: ', error)
        })
    },
    resetInnerData(innerData) {
      // TODO: Update InnerData Immediately?
      return initialInnerData
    },
    expandRecord(expand, record) {
      if (expand) {
        this.loading = true
        this.loadModelResults(record, () => {
          this.loading = false
        })
      }
    },
    loadModelResults(record, callback) {
      // FileViewer
      this.instanceId = record.patient_id
      this.baseUrl = `${initBaseURL()}/attachments/pathology`

      // Pathology Model
      const models = map(this.innerData, 'modelName')
      this.innerData = this.resetInnerData(this.innerData)
      this.batchLoad(record.patient_id, models)
        .then(results => {
          this.pathologyPrediction = []
          const pathologyPredictionStatus = []
          for (let idx in models) {
            const modelName = models[idx]
            const prediction = filter(this.innerData, prediction => {
              return prediction.modelName === modelName
            })

            if (prediction.length > 0 && results[idx]) {
              pathologyPredictionStatus.push({
                modelName: modelName,
                description: prediction[0].description,
                status: 'Success'
              })

              this.pathologyPrediction.push(results[idx])
              console.log('Batch Load: ', results[idx])
            } else {
              pathologyPredictionStatus.push({
                modelName: modelName,
                description: prediction[0].description,
                status: 'Unknown'
              })
            }
          }

          this.innerData = pathologyPredictionStatus
          console.log('fetchModels: ', results, pathologyPredictionStatus)
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
    this.getPathologyCollections()
  }
}
</script>

<style lang="less">
.pathology-model-container {
  width: 100%;
  height: 100%;
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
}
</style>
