<template>
  <page-view title="Pathology AI Model" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <a-table class="pathology-model-container" :columns="columns" :data-source="data" @expand="loadModelResults">
      <a slot="link" slot-scope="text, record" @click="redirectToRecord(record.file_path, defaultCollection)">{{
        text
      }}</a>
      <a slot="operation" slot-scope="text" @click="showModal">Prediction</a>
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
        <a-table :columns="innerColumns" :data-source="innerData" :pagination="false" class="inner-table">
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
          <span slot="operation" slot-scope="text" class="table-operation">
            <a @click="redirectToRecord(record.file_path, defaultCollection)" :disabled="text !== 'Success'">View</a>
          </span>
        </a-table>
      </template>
    </a-table>
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
import map from 'lodash.map'
import filter from 'lodash.filter'
import orderBy from 'lodash.orderby'

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

export default {
  components: {
    PageView
  },
  mixins: [PathologyMixins],
  data() {
    return {
      columns,
      innerColumns,
      defaultCollection: 'tcoa',
      data: [],
      innerData: [
        {
          modelName: 'PIK3CA_Mutation',
          description: 'PIK3CA Mutation Model',
          status: 'Success'
        },
        {
          modelName: 'BLIS',
          description: 'Basal-like Immunosuppressed Model',
          status: 'Success'
        },
        {
          modelName: 'IM',
          description: 'Immunomodulatory Model',
          status: 'Success'
        },
        {
          modelName: 'LAR',
          description: 'Luminal Androgen Receptor (LAR) Model',
          status: 'Success'
        },
        {
          modelName: 'MES',
          description: 'Mesenchymal (MES) Model',
          status: 'Success'
        }
      ],
      modelOptions: [
        { label: 'PIK3CA Mutation Model', value: 'PIK3CA_Mutation' },
        { label: 'Basal-like Immunosuppressed Model', value: 'BLIS' },
        { label: 'Immunomodulatory Model', value: 'IM' },
        { label: 'Luminal Androgen Receptor (LAR) Model', value: 'LAR' },
        { label: 'Mesenchymal (MES) Model', value: 'MES' }
      ],
      visible: false
    }
  },
  methods: {
    getCollections,
    redirectToRecord(recordId, project) {
      this.$router.push({
        name: 'record-viewer',
        query: {
          recordId: recordId,
          project: project
        }
      })
    },
    showModal() {
      this.visible = true
    },
    hideModal() {
      this.visible = false
    },
    prediction(models) {},
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
    loadModelResults(expanded, record) {
      if (expanded) {
        const models = map(this.innerData, 'modelName')
        this.batchLoad(record.patient_id, models)
          .then(results => {
            const pathologyPrediction = []
            for (let idx in models) {
              const modelName = models[idx]
              const prediction = filter(this.innerData, prediction => {
                return prediction.modelName === modelName
              })

              if (prediction.length > 0 && results[idx]) {
                pathologyPrediction.push({
                  modelName: modelName,
                  description: prediction[0].description,
                  status: 'Success'
                })
                console.log('Batch Load: ', results[idx])
              } else {
                pathologyPrediction.push({
                  modelName: modelName,
                  description: prediction[0].description,
                  status: 'Unknown'
                })                
              }
            }

            this.innerData = pathologyPrediction
            console.log('fetchModels: ', results, pathologyPrediction)
          })
          .catch(error => {
            console.log('fetchModels Error: ', error)
          })
      }
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
</style>
