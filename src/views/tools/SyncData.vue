<template>
  <page-view title="Data Syncer" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <template slot="action">
      <a-button type="primary" @click="onSyncData">New Task</a-button>
    </template>
    <a-table
      class="syncdata-container"
      :columns="filteredColumns"
      :loading="syncdataLoading"
      :data-source="data"
      :pagination="pagination"
      rowKey="name"
    >
      <a slot="link" slot-scope="text, record" disabled @click="loadLog(record)">
        {{ text }}
      </a>
      <span slot="operation" slot-scope="text, record">
        <a-button
          @click="loadLog(record)"
          :disabled="record.status !== 'Success'"
          icon="eye"
          type="primary"
          style="margin-right: 5px"
        >
          Log
        </a-button>
      </span>
      <span slot="status" slot-scope="text, record" class="single-tag">
        <a-progress
          type="circle"
          :showInfo="false"
          :percent="record.percentage"
          :width="45"
          v-if="text === 'Started'"
        />
        <a-tag color="#87d068" v-if="text === 'Finished'">
          {{ text }}
        </a-tag>
        <a-tag color="#f50" v-if="text === 'Failed'">
          {{ text }}
        </a-tag>
        <a-tag color="#108ee9" v-if="false && text === 'Started'">
          {{ text }}
        </a-tag>
      </span>
    </a-table>
    <a-modal v-model="modalVisible" title="Sync Data" :footer="null">
      <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" layout="horizontal" @submit="handleOk">
        <a-form-item label="Data Set">
          <a-select
            v-decorator="['dataset', { rules: [{ required: true, message: 'Please select your dataset!' }] }]"
            placeholder="Please select your dataset"
          >
            <a-select-option value="dataset_quartet_genomics"> Quartet Genomics </a-select-option>
            <a-select-option value="dataset_quartet_transcriptomics"> Quartet Transcriptomics </a-select-option>
            <a-select-option value="dataset_quartet_proteomics"> Quartet Proteomics </a-select-option>
            <a-select-option value="dataset_quartet_metabolomics"> Quartet Metabolomics </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :style="{ textAlign: 'right', marginBottom: '0px' }" :wrapper-col="{ span: 24 }">
          <a-button @click="onCancel" style="margin-right: 5px"> Cancel </a-button>
          <a-button type="primary" html-type="submit"> Sync </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-view>
</template>

<script>
import moment from 'moment'
import { PageView } from '@/layouts'
import filter from 'lodash.filter'
import map from 'lodash.map'
import { initTServiceHost } from '@/config/defaultSettings'

export const formatDateTime = function(datetime) {
  if (datetime && datetime > 0) {
    return moment(datetime)
      .utcOffset('+08:00')
      .format('YYYY-MM-DD HH:mm')
  } else {
    return '0000-00-00 00:00'
  }
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    visible: true
    // scopedSlots: { customRender: 'link' }
  },
  {
    title: 'Dataset',
    dataIndex: 'dataset',
    key: 'dataset',
    align: 'center',
    visible: true
    // scopedSlots: { customRender: 'link' }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    align: 'center',
    visible: true
  },
  {
    title: 'Plugin Name',
    dataIndex: 'plugin_name',
    key: 'plugin_name',
    align: 'center',
    visible: true
  },
  {
    title: 'Plugin Type',
    dataIndex: 'plugin_type',
    key: 'plugin_type',
    align: 'center',
    visible: true
  },
  {
    title: 'Plugin Version',
    dataIndex: 'plugin_version',
    key: 'plugin_version',
    visible: true,
    align: 'center'
  },
  {
    title: 'Created At',
    dataIndex: 'started_time',
    key: 'started_time',
    align: 'center',
    visible: true
  },
  {
    title: 'Finished At',
    dataIndex: 'finished_time',
    key: 'finished_time',
    align: 'center',
    visible: true
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' },
    visible: true
  },
  {
    title: 'Action',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
    align: 'center',
    visible: true
  }
]

export default {
  components: {
    PageView
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      columns,
      data: [],
      modalVisible: false,
      syncdataLoading: false,
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
          this.getTasks(this.pagination.current, this.pagination.pageSize)
        },
        onShowSizeChange: (current, pageSize) => {
          this.pagination.current = current
          this.pagination.pageSize = pageSize
          this.getTasks(this.pagination.current, this.pagination.pageSize)
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
    formatRecords(records) {
      return map(records, record => {
        const payload = record.payload
        return {
          ...record,
          dataset: payload ? payload.dataset : 'unknown',
          finished_time: formatDateTime(record.finished_time),
          started_time: formatDateTime(record.started_time)
        }
      })
    },
    onSyncData() {
      this.modalVisible = true
    },
    onCancel() {
      this.modalVisible = false
    },
    handleOk(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const baseUrl = `${initTServiceHost()}/api/tool/syncdata`
          this.$http
            .post(baseUrl, values)
            .then(response => {
              console.log('SyncData: ', response)
              this.$message.success('Submit Successfully.')
              this.getTasks(this.pagination.current, this.pagination.pageSize)
            })
            .catch(error => {
              this.$message.success('Failed, Please Retry Later.')
              console.log('SyncData Error: ', error)
            })
          this.onCancel()
        }
      })
    },
    getTasks(page, pageSize) {
      this.syncdataLoading = true
      const baseUrl = `${initTServiceHost()}/api/tasks`
      this.$http
        .get(baseUrl, {
          params: {
            page: page,
            page_size: pageSize
          }
        })
        .then(response => {
          this.pagination.total = response.total
          this.pagination.pageSize = response.page_size
          this.pagination.current = response.page
          console.log('Get Tasks: ', response)
          this.data = this.formatRecords(response.data)
          this.syncdataLoading = false
        })
        .catch(error => {
          console.log('Get Tasks Error: ', error)
          this.data = []
          this.syncdataLoading = false
        })
    },
    loadLog(record, callback) {
      if (record.status === 'Success') {
        const baseUrl = `${initTServiceHost()}/api/download?filelink=${record.response.log}`

        this.$http
          .get(baseUrl)
          .then(response => {
            this.logMsg = response
          })
          .catch(error => {
            console.log('Fetch Log Error: ', error)
            this.logMsg = ''
          })
      } else {
        this.$message.warn('The task did not finish, and please try again later!')
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getTasks(this.pagination.current, this.pagination.pageSize)
    }, 6000)
  },
  created() {
    this.getTasks(this.pagination.current, this.pagination.pageSize)
  }
}
</script>

<style lang="less">
.syncdata-container {
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

  .single-tag {
    .ant-tag {
      margin-right: 0px;
    }
  }
}

.syncdata-list-drawer {
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
