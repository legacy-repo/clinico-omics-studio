<template>
  <div class="file-list" ref="fileBrowser">
    <a-card :bordered="false">
      <a-col slot="title" :lg="20" :md="20" :sm="24" :xs="24">
        <a-button @click="switchUploadPanel"><a-icon type="upload"/>Upload</a-button>
        <a-button style="margin-left: 5px;" @click="switchFolderDialog"><a-icon type="folder-add"/>Create Folder</a-button>
        <a-button style="margin-left: 5px;" @click="refresh"><a-icon type="cloud-sync"/>Refresh</a-button>
      </a-col>
      <a-col slot="title" style="display: flex; flex-direction: row; float: right;">
        <a-input-search placeholder="Enter a file name prefix" style="width: 200px;" @search="onSearch" />
      </a-col>
      <a-row class="control-header">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <a @click="redirectHome()">
              <a-icon type="user" style="margin-right: 3px;"/>
              <span>Home</span>
            </a>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-for="(item, index) in pathList" :key="index">
            <a @click="redirect(item, index, pathList)"><span>{{ item }}</span></a>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </a-row>
      <a-table
        :loading="loading"
        :pagination="pagination"
        :columns="columns"
        rowKey="name"
        :data-source="data"
        :row-selection="rowSelection">
        <span slot="name" slot-scope="text, record">
          <a @click="switchDetailsPanel(record)" v-if="record.storageClass">{{ formatFileName(text) }}</a>
          <a @click="enterDirecotry(record)" v-else>{{ formatFileName(text) }}</a>
        </span>
        <span slot="icon" slot-scope="text, record">
          <a-icon type="file" :style="{fontSize: '20px'}" v-if="record.storageClass" />
          <a-icon type="folder-open" theme="filled" :style="{fontSize: '20px', color: '#ffcb01'}" v-else />
        </span>
        <span slot="size" slot-scope="text, record">{{ formatBytes(text) }}</span>
        <span slot="action" slot-scope="text, record">
          <a style="margin-right: 10px;" @click="switchDetailsPanel(record)">Details</a>
          <a class="ant-dropdown-link" disabled> More <a-icon type="down" /> </a>
        </span>
      </a-table>
    </a-card>
    <a-drawer
      class="upload-panel"
      title="Upload"
      placement="right"
      :closable="true"
      width="600"
      :visible="uploadPanelVisible"
      :maskClosable="false"
      :wrap-style="{ position: 'absolute' }"
      @close="switchUploadPanel"
    >
      <a-row>
        <span class="label">Upload To:</span>
        <a-tooltip placement="top">
          <template slot="title">
            <a @click="doCopy">Copy Link</a>
          </template>
          <a-input :value="currentPath" allow-clear disabled/>
        </a-tooltip>
      </a-row>
      <a-row>
        <span class="label">Upload:</span>
        <a-upload-dragger
          name="file"
          :multiple="true"
          :action="currentPath"
          @change="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p class="ant-upload-hint">
            A maximum of 100 files can be uploaded at a time.
          </p>
        </a-upload-dragger>
        <p class="help-text">
          File naming conventions:<br>
          1. A file name can contain only UTF-8 characters.<br>
          2. A file name is case-sensitive.<br>
          3. A file name must be 1 to 1023 bytes in length.<br>
          4. A file name cannot start with a forward slash (/) or consecutive backslashes (\).<br>
        </p>
      </a-row>
    </a-drawer>
    <a-drawer
      class="details-panel"
      title="File Details"
      placement="right"
      :closable="true"
      width="600"
      :visible="detailsPanelVisible"
      :maskClosable="true"
      :wrap-style="{ position: 'absolute' }"
      @close="switchDetailsPanel"
    >

    </a-drawer>
    <div class="mask-window" v-if="folderDialogVisible"></div>
    <a-row v-if="folderDialogVisible" class="folder-dialog">
      <a-form :form="folderDialog" @submit="handleSubmit">
        <a-form-item label="Folder Name">
          <a-input allowClear autoFocus v-decorator="['folderName', { rules: folderNameRule }]"/>
        </a-form-item>
        <a-form-item style="float: right;">
          <a-button type="danger" style="margin-right: 10px;" @click="switchFolderDialog">
            Cancel
          </a-button>
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </a-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const folderNameRule = [
  { required: true, message: 'Please input your folder name!' },
  { min: 1, max: 63, message: 'Length should be 1 to 63', trigger: 'blur' },
  { pattern: /^[a-zA-Z_]+[0-9a-zA-Z]+$/, message: 'Project name is not valid, only support [a-z0-9A-Z_]', trigger: 'blur' },
  // { validator: this.existFolder, trigger: 'blur' }
]

const columns = [
  {
    title: '',
    dataIndex: 'icon',
    align: 'center',
    scopedSlots: { customRender: 'icon' },
    width: 50
  },
  {
    title: 'File Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    ellipsis: true
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
    scopedSlots: { customRender: 'size' },
    align: 'right',
    width: 150
  },
  {
    title: 'Storage Class',
    dataIndex: 'storageClass',
    key: 'storageClass',
    align: 'center',
    width: 150
  },
  {
    title: 'Updated At',
    dataIndex: 'modified',
    key: 'modified',
    align: 'center',
    width: 160
  },
  {
    title: 'Action',
    dataIndex: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' },
    width: 150
  }
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}

export default {
  name: 'FileList',
  data () {
    return {
      columns,
      rowSelection,
      folderDialog: this.$form.createForm(this, { name: 'folder-dialog' }),
      folderNameRule,
      folderDialogVisible: false,
      uploadPanelVisible: false,
      detailsPanelVisible: false,
      recordDetail: null,
      pathList: [],
      currentPath: '',
      loading: false,
      bucketName: 'test',
      prefix: undefined,
      pagination: {
        pageSizeOptions: ['30', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 30,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.searchObjects(this.bucketName, page, pageSize, this.prefix)
        },
        onShowSizeChange: (current, pageSize) => {
          this.searchObjects(this.bucketName, 1, pageSize, this.prefix)
        }
      },
      data: []
    }
  },
  methods: {
    ...mapActions({
      getBuckets: 'GetBuckets',
      getObjects: 'GetObjects',
      makeDirectory: 'MakeDirectory',
      makeUploadUrl: 'MakeUploadUrl'
    }),
    doCopy () {
      this.$copyText(this.currentPath).then(message => {
        console.log('copy', message)
        this.$message.success('复制完毕')
      }).catch(err => {
        console.log('copy.err', err)
        this.$message.error('复制失败')
      })
    },
    getUploadUrl () {
      const key = this.pathList.join('/')

      this.makeUploadUrl({
        name: this.bucketName,
        key: key
      }).then(response => {
        this.currentPath = response.upload_url
      }).catch(error => {
        this.$message.error('Unknown Error!')
        console.log('getUploadUrl: ', error)
      })
    },
    switchFolderDialog () {
      this.folderDialogVisible = !this.folderDialogVisible
    },
    handleSubmit (e) {
      e.preventDefault()
      this.folderDialog.validateFields((err, values) => {
        if (!err) {
          const key = this.pathList.join('/') + values.folderName
          this.makeDirectory({
            'name': this.bucketName,
            'key': key
          }).then(response => {
            this.switchFolderDialog()
            this.refresh()
          }).catch(error => {
            console.log('Cannot create folder.', error)
          })
        }
      })
    },
    existFolder (rule, value, callback) {

    },
    refresh () {
      let prefix = null
      if (this.pathList.length > 0) {
        prefix = this.pathList.join('/') + '/'
      }

      this.searchObjects(this.bucketName, this.pagination.current, this.pagination.pageSize, prefix)
    },
    redirectHome () {
      this.pathList = []
      this.searchObjects(this.bucketName, this.pagination.current, this.pagination.pageSize)
    },
    redirect (item, index, pathList) {
      this.pathList = pathList.slice(0, index + 1)
      console.log('redirect: ', this.pathList, index)
      this.searchObjects(this.bucketName, this.pagination.current, this.pagination.pageSize, this.pathList.join('/') + '/')
    },
    searchObjects (bucketName, page, pageSize, prefix) {
      this.loading = true
      this.getObjects({
        'name': bucketName,
        'page': page,
        'pageSize': pageSize,
        'prefix': prefix
      }).then(response => {
        this.data = response.data
        this.pagination.total = response.total
        this.pagination.current = response.page
        this.pagination.pageSize = response.pageSize
        setTimeout(() => {
          this.loading = false
        }, 300)
      }).catch(error => {
        console.log('searchObjects: ', error)
        this.loading = false
      })
    },
    switchUploadPanel () {
      const key = this.pathList.join('/')

      if (key !== '') {
        this.currentPath = key
      } else {
        this.currentPath = '/'
      }
      this.uploadPanelVisible = !this.uploadPanelVisible
    },
    switchDetailsPanel (record) {
      this.detailsPanelVisible = !this.detailsPanelVisible
      this.recordDetail = record
    },
    trimSlash (str) {
      if (str.match(/.*\/$/)) {
        return str.split('/').slice(0, -1).join('/')
      } else {
        return str
      }
    },
    enterDirecotry (record) {
      if (record.name.match(/.*\/.+/)) {
        console.log(this.trimSlash(record.name).split('/'))
        this.pathList = this.trimSlash(record.name).split('/')
      } else {
        this.pathList.push(this.trimSlash(record.name))
      }

      console.log('enterDirectory: ', this.pathList, record)
      // this.pathList.join('/') + '/': Prefix need a slash when you are a directory
      this.searchObjects(this.bucketName, this.pagination.current, this.pagination.pageSize, this.pathList.join('/') + '/')
    },
    formatFileName (name) {
      return name.replace(this.pathList.join('/') + '/', '')
    },
    formatBytes (bytes, decimals = 2) {
      if (bytes === 0) return ''

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },
    onSearch (searchStr) {

    },
    uploadFiles () {

    },
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    handleBlur () {
      console.log('blur')
    },
    handleFocus () {
      console.log('focus')
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    getColor (status) {
      if (status === 'modified') {
        return '#f50'
      } else if (status === 'unchanged') {
        return '#87d068'
      }
    }
  },
  created () {
    this.searchObjects(this.bucketName, this.pagination.current, this.pagination.pageSize, this.prefix)
  }
}
</script>

<style lang="less">
@import (reference) "~@/components/index.less";

.file-list {
  .folder-dialog {
    position: absolute;
    width: 400px;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -75px;
    z-index: 1000;
    padding: 0px 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    background-color: #fff;

    .ant-form-item {
      margin-bottom: 5px;
    }
  }

  .mask-window {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.2;
  }

  .ant-card-head-title {
    padding: 0px 0px 10px 0px;

    .ant-btn, .ant-input-search {
      margin-top: 10px;
    }
  }

  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
    padding: 12px 16px;
  }

  .ant-card {
    .ant-card-body {
      min-height: 540px;
      padding: 0px 24px 10px;
    }
  }

  .ant-list-item {
    flex-wrap: wrap;
  }

  .list-content {
    display: flex;
    flex-direction: row;
  }

  .ant-list-item-meta, .list-content-item {
    margin-top: 5px;
  }

  .ant-list-item-action {
    margin-left: 0px;
    float: right;
  }

  .list-content-item {
    color: rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    font-size: 14px;
    margin-right: 40px;

    .ant-tag {
      margin-bottom: 5px;
    }

    span {
      line-height: 20px;
    }

    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }

  .control-header {
    margin: 10px 0px;

    .ant-breadcrumb-link:hover {
      cursor: pointer;
      color: @primary-color;
    }
  }
}

.upload-panel, details-panel {
  .ant-drawer-body {
    padding: 12px 24px;

    .label {
      line-height: 3;
      font-weight: 600;
    }

    .ant-row {
      margin-bottom: 10px;
    }

    .help-text {
      border: 1px solid #eee;
      padding: 10px;
      margin-top: 10px;
      border-radius: 5px;
    }
  }
}
</style>
