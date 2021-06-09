<template>
  <page-view title="Personal Genome Interpreter" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <template slot="action">
      <a-button type="primary" @click="onCreateModels">Run PGI</a-button>
    </template>
    <a-table
      class="pgi-task-container"
      :columns="filteredColumns"
      :loading="taskLoading"
      :data-source="data"
      :pagination="pagination"
      rowKey="taskName"
    >
      <a slot="link" slot-scope="text, record" @click="loadTaskResults(record)">
        {{ text }}
      </a>
      <span slot="operation" slot-scope="text, record">
        <a-button @click="loadTaskResults(record)" icon="eye" type="primary" style="margin-right: 5px;">Check</a-button>
        <a-button :disabled="isChecked(record.checkedAt)" icon="safety-certificate">Report</a-button>
      </span>
      <span slot="tag" slot-scope="text" v-if="text && text.split(',')">
        <a-tag v-for="tag in text.split(',')" :key="tag">
          {{ tag }}
        </a-tag>
      </span>
      <span slot="status" slot-scope="text">
        <a-tag color="#87d068" v-if="text.value === 'success'">
          {{ text.label }}
        </a-tag>
        <a-tag color="#f50" v-if="text.value === 'error'">
          {{ text.label }}
        </a-tag>
        <a-tag color="#2db7f5" v-if="text.value === 'default'">
          {{ text.label }}
        </a-tag>
        <a-tag color="#108ee9" v-if="text.value === 'running'">
          {{ text.label }}
        </a-tag>
      </span>
    </a-table>
    <a-drawer 
      class="task-uploader" 
      title="Run Personal Genome Interpreter" 
      width="600" 
      placement="right" 
      @close="hideSubmitPanel"
      :maskClosable="false"
      :destroyOnClose="true"
      :visible="submitPanelVisible"
    >
      <task-submitter @close="hideSubmitPanel"></task-submitter>
    </a-drawer>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import TaskResult from './TaskResult'
import TaskSubmitter from './TaskSubmitter'
import filter from 'lodash.filter'
import { formatDateTime } from './utils'
import { initTServiceHost } from '@/config/defaultSettings'

const columns = [
  {
    title: 'Task ID',
    dataIndex: 'taskName',
    key: 'taskName',
    align: 'center',
    visible: true,
    scopedSlots: { customRender: 'link' }
  },
  {
    title: 'Patient',
    dataIndex: 'patientId',
    key: 'patientId',
    align: 'center',
    visible: true,
  },
  {
    title: 'Disease',
    dataIndex: 'diseaseType',
    key: 'diseaseType',
    visible: true,
    align: 'center'
  },
  {
    title: 'Models',
    dataIndex: 'modelName',
    key: 'modelName',
    align: 'center',
    visible: true,
    scopedSlots: { customRender: 'tag' }
  },
  {
    title: 'KnowledgeDB',
    dataIndex: 'knowledgeDBVersion',
    key: 'knowledgeDBVersion',
    align: 'center',
    visible: true,
  },
  {
    title: 'Positive?',
    dataIndex: 'isPositive',
    key: 'isPositive',
    align: 'center',
    scopedSlots: { customRender: 'status' },
    visible: false,
  },
  {
    title: 'Created At',
    dataIndex: 'startedAt',
    key: 'startedAt',
    align: 'center',
    visible: true,
  },
  {
    title: 'Checked At',
    dataIndex: 'checkedAt',
    key: 'checkedAt',
    align: 'center',
    visible: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' },
    visible: true,
  },
  {
    title: 'Action',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
    align: 'center',
    visible: true,
  }
]

const record = {
  report_name: '1900272',
  project_id: '',
  app_name: 'pgi-20210531',
  description: {
    patient_id: '1900272',
    disease_type: 'Brease Cancer',
    model_name: 'SNV,CNV,SV',
    is_positive: true
  },
  started_time: 1622472096900,
  report_path: 'download/29d04140-c72a-11eb-82b1-05e0b9220e3b/vcf.db',
  report_type: 'PGI',
  status: 'Started',
  log: ''
}

export default {
  components: {
    PageView,
    TaskResult,
    TaskSubmitter
  },
  props: {
    apiEndpoint: {
      type: String,
      required: false,
      default: initTServiceHost()
    },
    listTaskPrefix: {
      type: String,
      required: false,
      default: '/api/reports'
    },
    createTaskPrefix: {
      type: String,
      required: false,
      default: '/api/reports'
    }
  },
  data() {
    return {
      columns,
      data: [],
      taskLoading: false,
      submitPanelVisible: false,
      pagination: {
        pageSizeOptions: ['10', '30', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        total: 1,
        current: 1,
        onChange: (page, pageSize) => {
          this.pagination.current = page
          this.pagination.pageSize = pageSize
          this.getTaskCollections(this.pagination.current, this.pagination.pageSize)
        },
        onShowSizeChange: (current, pageSize) => {
          this.pagination.current = current
          this.pagination.pageSize = pageSize
          this.getTaskCollections(this.pagination.current, this.pagination.pageSize)
        }
      }
    }
  },
  computed: {
    filteredColumns: function() {
      return filter(this.columns, item => {
        return item.visible
      })
    }
  },
  methods: {
    onCreateModels() {
      this.submitPanelVisible = true
    },
    hideSubmitPanel() {
      this.submitPanelVisible = false
    },
    loadTaskResults() {

    },
    isChecked(checkAt) {
      return checkAt === '0000-00-00 00:00' ? true : false
    },
    formatDateTime(datetime) {
      if (datetime && datetime > 0) {
        return moment(datetime)
          .utcOffset('+08:00')
          .format('YYYY-MM-DD HH:mm')
      } else {
        return '0000-00-00 00:00'
      }
    },
    formatPayload(payload) {
      return {
        patientId: payload.patient_id,
        diseaseType: payload.disease_type,
        modelName: payload.model_name,
        isPositive: payload.is_positive ? {
          label: 'YES',
          value: 'success'
        } : {
          label: 'NO',
          value: 'default'
        }
      }
    },
    formatStatus(record) {
      if (record.status === 'Finished') {
        return {
          label: 'Success',
          value: 'success'
        }
      } else if (record.status === 'Archived') {
        return {
          label: 'Archived',
          value: 'default'
        }
      } else if (record.status === 'Failed') {
        return {
          label: 'Failed',
          value: 'error'
        }
      } else {
        return {
          label: 'Running',
          value: 'running'
        }
      }
    },
    formatRecords(records) {
      const newRecords = []
      for (const record of records) {
        newRecords.push({
          id: record.id,
          taskName: record.report_name,
          projectId: record.projectId,
          knowledgeDBVersion: record.app_name,  // PGI + Version
          taskType: record.report_type,
          taskUrl: record.report_path,
          startedAt: formatDateTime(record.started_time),
          finishedAt: formatDateTime(record.finished_time),
          checkedAt: formatDateTime(record.checked_time),
          archivedAt: formatDateTime(record.archived_time),
          status: this.formatStatus(record),
          ...this.formatPayload(record.description)
        })
      }

      return newRecords
    },
    getTaskCollections(page, perPage) {
      this.taskLoading = true
      this.$http.get(this.apiEndpoint + this.listTaskPrefix, {
        params: {
          page: page,
          per_page: perPage,
          report_type: 'PGI'          
        }
      })
      .then(response => {
        // this.pagination.total = response.total
        this.pagination.total = 1
        this.pagination.current = response.page
        this.pagination.pageSize = response.per_page
        // this.data = this.formatRecords(response.data)
        this.data = this.formatRecords([record])
        this.$message.success('Refresh successfully!')
        this.taskLoading = false
      })
    }
  },
  created() {
    this.getTaskCollections(this.pagination.current, this.pagination.pageSize)
  }
}
</script>

<style lang="less">
.pgi-task-container {
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

.pgi-task-list-drawer {
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

  .task-image-viewer {
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
