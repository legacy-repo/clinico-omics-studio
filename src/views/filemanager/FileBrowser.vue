<template>
  <div class="file-list" ref="fileBrowser">
    <a-card :bordered="false" :class="{ standalone: standalone }" :style="{height: (height + 100) + 'px'}">
      <a-col slot="title" :lg="11" :md="11" :sm="24" :xs="24">
        <a-select :value="bucketName" style="width: 200px" @change="selectBucket">
          <a-select-option v-for="bucket in buckets" :key="bucket">
            {{ bucket }}
          </a-select-option>
        </a-select>
        <a-button @click="switchUploadPanel" v-if="standalone"><a-icon type="upload"/>Upload</a-button>
        <a-button @click="switchFolderDialog" v-if="standalone"><a-icon type="folder-add"/>Add Folder</a-button>
        <a-button @click="refresh"><a-icon type="cloud-sync"/>Refresh</a-button>
      </a-col>
      <a-col slot="title" :lg="13" :md="13" :sm="24" :xs="24">
        <a-select show-search :value="currentPath" @change="onSearch" style="width: calc(100% - 276px);">
          <a-select-option v-for="address in addressList" :key="address">
            {{ address }}
          </a-select-option>
        </a-select>
        <a-button style="line-height: unset; margin-top: 0px; padding: 0px 10px;" @click="handleBookmark">
          <a-icon type="star" :theme="theme" />
        </a-button>
        <a-input-search placeholder="Enter a file name prefix" allowClear style="width: 230px;" @search="onSearch" />
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
            <a @click="redirectPath(item, index, pathList)"><span>{{ item }}</span></a>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <span style="font-size: 14px; font-weight: 400; position: absolute; top: 0; right: 0;" v-if="hasSelected">
          {{ `Selected ${selectedRowKeys.length} items` }}
        </span>
      </a-row>
      <a-table
        :loading="loading"
        :pagination="pagination"
        :columns="columns"
        rowKey="path"
        :scroll="{y: height - 100}"
        :data-source="data"
        :row-selection="{ ...rowSelection, selectedRowKeys: selectedRowKeys }">
        <span slot="name" slot-scope="text, record">
          <a @click="switchDetailsPanel(record)" v-if="record.storageClass">{{ formatFileName(text) }}</a>
          <a @click="enterDirecotry(record)" v-else>{{ formatFileName(text) }}</a>
        </span>
        <span slot="icon" slot-scope="text, record">
          <a-icon type="file" :style="{fontSize: '20px'}" v-if="record.storageClass" />
          <a-icon type="folder-open" theme="filled" :style="{fontSize: '20px', color: '#ffcb01'}" v-else />
        </span>
        <span slot="size" slot-scope="text, record">{{ formatBytes(text) }}</span>
        <span slot="action" slot-scope="text, record" v-if="record.storageClass">
          <a style="margin-right: 10px;" @click="switchDetailsPanel(record)">Details</a>
          <a class="ant-dropdown-link" disabled> More <a-icon type="down" /> </a>
        </span>
      </a-table>
    </a-card>
    <!-- Popup Windows -->
    <a-drawer
      class="upload-panel"
      title="Upload"
      placement="right"
      :closable="true"
      width="600"
      :visible="uploadPanelVisible"
      :maskClosable="false"
      @close="closeUploadPanel"
    >
      <a-row>
        <span class="label">Upload To:</span>
        <a-tooltip placement="top">
          <template slot="title">
            <a @click="doCopy(currentPath)">Copy Link</a>
          </template>
          <a-input :value="currentPath" allow-clear disabled/>
        </a-tooltip>
      </a-row>
      <a-row>
        <span class="label">Upload:</span>
        <a-upload-dragger
          :remove="handleRemove"
          :multiple="true"
          :customRequest="uploadFile"
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
      @close="closeDetailsPanel"
    >
      <a-row class="preview">
        <pre v-if="previewContent" class="content">
          <code>{{ previewContent }}</code>
        </pre>
        <span v-else>Not Support to Preview</span>
      </a-row>
      <a-row v-if="recordDetail" class="object-details">
        <a-row class="detail-item" :gutter="gutter">
          <a-col :span="labelSpan" class="label">File Name</a-col>
          <a-col :span="24 - labelSpan">{{ recordDetail.name }}</a-col>
        </a-row>
        <a-row class="detail-item" :gutter="gutter">
          <a-col :span="labelSpan" class="label">ETag</a-col>
          <a-col :span="24 - labelSpan">{{ recordDetail.etag.replace(/"/g, "") }}</a-col>
        </a-row>
        <a-row class="detail-item" :gutter="gutter">
          <a-col :span="labelSpan" class="label">URL</a-col>
          <a-col :span="24 - labelSpan">
            <a-textarea :value="downloadUrl" :rows="8" />
            <a-row>
              <a @click="downloadFile(downloadUrl)">Download</a>
              <span style="margin: 0px 10px;">|</span>
              <a @click="doCopy(downloadUrl)">Copy URL</a>
            </a-row>
          </a-col>
        </a-row>
      </a-row>
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
import VueMarkdown from 'vue-markdown'
import axios from 'axios'
import filter from 'lodash.filter'
import flatMap from 'lodash.flatmap'

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

export default {
  name: 'FileList',
  components: {
    VueMarkdown
  },
  props: {
    standalone: {
      required: false,
      default: true,
      type: Boolean
    },
    allowMultiSelection: {
      required: false,
      default: true,
      type: Boolean
    },
    selected: {
      required: false,
      default: () => [],
      type: Array
    },
    height: {
      required: false,
      default: 540,
      type: Number
    },
    filterType: {
      required: false,
      default: '.*',
      type: String
    }
  },
  data () {
    return {
      columns,
      selectedRowKeys: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          this.selectedRowKeys = selectedRowKeys
        },
        onSelect: (record, selected, selectedRows) => {
          const selectedItems = this.filterByType(selectedRows, this.filterType)

          if (selectedItems.length !== selectedRows.length) {
            this.$message.warn('Only support ' + this.filterType + ' files')
            this.selectedRowKeys = this.getFilePath(selectedItems)
          }

          this.$emit('file-select', selectedItems)
          console.log('File selection: ', selectedRows, selectedItems, this.selectedRowKeys)
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows)
        },
        getCheckboxProps: record => ({
          props: {
            disabled: this.standalone && !record.storageClass, // Column configuration not to be checked
            name: record.name
          }
        }),
        type: this.allowMultiSelection ? 'checkbox' : 'radio',
        hideDefaultSelections: true,
        selections: [
          {
            key: 'none',
            text: 'Unselect All Rows',
            onSelect: () => {
              this.selectedRowKeys = []
            }
          },
          {
            key: 'all-rows',
            text: 'Select All Rows',
            onSelect: () => {
              this.selectedRowKeys = this.getFilePath(this.data)
            }
          }
        ]
      },
      // Folder
      folderDialog: this.$form.createForm(this, { name: 'folder-dialog' }),
      folderNameRule,
      folderDialogVisible: false,
      // Record
      fileList: {}, // for canceling upload request
      uploadPanelVisible: false,
      detailsPanelVisible: false,
      recordDetail: null,
      downloadUrl: '',
      previewContent: '',
      contentType: '', // for preview
      gutter: 16,
      labelSpan: 4,
      // Key Variables
      data: [],
      buckets: [],
      bucketName: '',
      currentPath: '',
      pathList: [],
      addressList: [],
      // Others
      savedBookmark: false,
      loading: false,
      pagination: {
        size: 'small',
        pageSizeOptions: ['30', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 30,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.searchObjects(this.bucketName, page, pageSize, this.getPrefix(this.pathList, ''))
        },
        onShowSizeChange: (current, pageSize) => {
          this.searchObjects(this.bucketName, 1, pageSize, this.getPrefix(this.pathList, ''))
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getBuckets: 'GetBuckets',
      getObjects: 'GetObjects',
      makeDirectory: 'MakeDirectory',
      makeUploadUrl: 'MakeUploadUrl',
      makeDownloadUrl: 'MakeDownloadUrl',
      getObjectMeta: 'GetObjectMeta',
      uploadObject: 'UploadObject'
    }),
    getFilePath (files) {
      return flatMap(files, (o) => o.path)
    },
    filterByType (files, fileType) {
      console.log(files, fileType)
      const pattern = new RegExp(fileType)
      return filter(files, function (o) { return o.name.length > 0 && pattern.test(o.name) })
    },
    loadBookmarks () {
      const addressList = JSON.parse(localStorage.getItem('datains_BOOKMARKS'))
      if (addressList) {
        this.addressList = addressList
      } else {
        this.addressList = []
      }

      if (this.addressList.indexOf(this.currentPath) >= 0) {
        this.savedBookmark = true
      } else {
        this.savedBookmark = false
      }

      console.log('loadBookmarks: ', this.savedBookmark, this.addressList, this.currentPath)
    },
    handleBookmark () {
      let allBookmarks = JSON.parse(localStorage.getItem('datains_BOOKMARKS'))
      if (!allBookmarks) {
        allBookmarks = []
      }

      if (!this.savedBookmark) {
        allBookmarks.push(this.currentPath)
      } else {
        const index = allBookmarks.indexOf(this.currentPath)
        if (index > -1) {
          allBookmarks.splice(index, 1)
        }
      }

      localStorage.setItem('datains_BOOKMARKS', JSON.stringify(allBookmarks))
      this.loadBookmarks()
    },
    onSearch (searchStr) {
      console.log('onSearch: ', searchStr)
      if (searchStr) {
        const parsedList = searchStr.match(/.*:\/\/([a-zA-Z0-9\-._:]+)\/(.*)/)
        if (parsedList) {
          // Search with oss://|s3:// link
          this.bucketName = parsedList[1]
          const pathList = this.trimSlash(parsedList[2]).split('/')
          this.redirect(pathList)
          return
        }
      }

      // Search in current directory
      this.prefix = this.getPrefix(this.pathList, searchStr)
      this.searchObjects(this.bucketName, this.pagination.current, this.pagination.pageSize, this.prefix)        
    },
    selectBucket (value) {
      // Reset File Browser
      this.bucketName = value
      this.redirectHome()
    },
    doCopy (text) {
      this.$copyText(text).then(message => {
        console.log('copy', message)
        this.$message.success('Copied')
      }).catch(err => {
        console.log('copy.err', err)
        this.$message.error('Failed')
      })
    },
    downloadFile (link) {
      const downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', link)
      downloadAnchorNode.setAttribute('target', '_blank')
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    },
    getDownloadUrl () {
      this.makeDownloadUrl({
        name: this.bucketName,
        key: this.recordDetail.name
      }).then(response => {
        this.downloadUrl = response.download_url
      }).catch(error => {
        this.$message.error('Unknown Error!')
        console.log('getDownloadUrl: ', error)
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
      const prefix = this.getPrefix(this.pathList, '')
      this.searchObjects(this.bucketName, this.pagination.current, this.pagination.pageSize, prefix)
    },
    redirectHome () {
      this.redirect([])
    },
    redirectPath (item, index, pathList) {
      this.redirect(pathList.slice(0, index + 1))
    },
    redirect (pathList) {
      this.pathList = pathList
      const prefix = this.getPrefix(pathList, '')
      this.searchObjects(this.bucketName, this.pagination.current, this.pagination.pageSize, prefix)
    },
    searchObjects (bucketName, page, pageSize, prefix) {
      this.loading = true
      this.getObjects({
        'name': bucketName,
        'page': page,
        'pageSize': pageSize,
        'prefix': prefix
      }).then(response => {
        this.currentPath = response.location
        this.data = response.data
        this.pagination.total = response.total
        this.pagination.current = response.page
        this.pagination.pageSize = response.pageSize
        this.loadBookmarks()
        this.loading = false
      }).catch(error => {
        console.log('searchObjects: ', error)
        this.loading = false
      })
    },
    switchUploadPanel () {
      this.uploadPanelVisible = !this.uploadPanelVisible
    },
    closeUploadPanel () {
      this.refresh()
      this.switchUploadPanel()
      this.fileList = {}
    },
    switchDetailsPanel (record) {
      this.detailsPanelVisible = !this.detailsPanelVisible
      this.recordDetail = record
    },
    closeDetailsPanel () {
      this.detailsPanelVisible = false
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
      this.searchObjects(this.bucketName, this.pagination.current, this.pagination.pageSize, this.getPrefix(this.pathList, ''))
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
    getPrefix (pathList, searchStr) {
      // this.pathList.join('/') + '/': Prefix need a slash when you are a directory
      // When need to list directory, searchStr must be an empty string
      const prefix = pathList.join('/') + '/' + searchStr
      if (prefix === '/') {
        return null
      } else {
        return prefix
      }
    },
    handleRemove (file) {
      const request = this.fileList[this.getPrefix(this.pathList, file.name)]
      request.cancel('Canceling Upload.')
      this.refresh()
    },
    uploadFile ({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials
    }) {
      console.log('uploadFiles: ', file)
      this.makeUploadUrl({
        name: this.bucketName,
        key: this.getPrefix(this.pathList, file.name)
      }).then(response => {
        const request = axios.CancelToken.source()
        this.fileList[this.getPrefix(this.pathList, file.name)] = request
        const action = response.upload_url
        const formData = new FormData()
        if (data) {
          Object.keys(data).forEach(key => {
            formData.append(key, data[key])
          })
        }
        formData.append(filename, file)

        axios({
          url: action,
          method: 'put',
          data: file,
          processData: false,
          contentType: false,
          onUploadProgress: ({ total, loaded }) => {
            console.log('onUploadProgress: ', total, loaded, Math.round(loaded / total * 100).toFixed(2))
            onProgress({ percent: Math.round(loaded / total * 100) }, file)
          },
          cancelToken: request.token
        })
          .then(({ data: response }) => {
            console.log('Upload Files: ', response, file)
            onSuccess(response, file)
          })
          .catch(error => {
            console.log('Upload Files (Error): ', error)
            onError(error)
          })

        return {
          abort () {
            console.log('upload progress is aborted.')
          }
        }
      }).catch(error => {
        console.log('getUploadUrl: ', error)
      })
    }
  },
  watch: {
    recordDetail: function () {
      // Reset
      this.previewContent = ''

      this.getDownloadUrl()
      this.getObjectMeta({
        name: this.bucketName,
        key: this.recordDetail.name
      }).then(response => {
        this.contentType = response.contentType

        // 1048576 = 1024 * 1024 = 1MB
        if (this.recordDetail.size < 1048576) {
          this.$http.get(this.downloadUrl).then(response => {
            this.previewContent = response
          })
        }
      })
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    },
    theme () {
      return this.savedBookmark ? 'filled' : 'outlined'
    }
  },
  created () {
    // Restore Selected
    if (!this.standalone) {
      this.selectedRowKeys = this.selected
    }

    this.getBuckets()
      .then(response => {
        this.buckets = response.data
        if (this.buckets.length > 0) {
          this.bucketName = this.buckets[0]
          this.redirectHome()
        }
      })
      .catch(error => {
        this.buckets = []
        this.bucketName = 'Not Found'
        this.$message.error('Unknown Error!')
        console.log('getBuckets: ', error)
      })
  }
}
</script>

<style lang="less">
@import (reference) "~@/components/index.less";

@header-top: 5px;
@header-left: @header-top;
@header-bottom: @header-top;

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

  .ant-card {
    .ant-card-head, .ant-card-body {
      padding: 0px 16px 0px;
    }

    .ant-card-head {
      min-height: unset;

      .ant-card-head-title {
        padding: @header-top 0px @header-bottom 0px;

        .ant-col > * {
          margin-left: @header-left;
        }

        .ant-col > *:first-child {
          margin-left: 0px;
        }

        .ant-btn, .ant-input-search, .ant-select {
          margin-top: @header-top;
        }
      }
    }

    .ant-card-body {
      .control-header {
        margin: @header-top 0px;

        .ant-breadcrumb-link:hover {
          cursor: pointer;
          color: @primary-color;
        }
      }

      .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
        padding: 12px 16px;
      }
    }

    .standalone {
      .ant-card-body {
        min-height: 540px;
      }
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

.object-details {
  .detail-item {
    margin-bottom: 10px;

    .label {
      text-align: right;
    }
  }
}

.preview {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 10px;

  .content {
    width: 100%;
    height: calc(100% - 40px);
    text-align: left;
    display: flex;
    justify-content: left;
    align-items: left;
    margin: 20px;
    overflow: scroll;
  }
}
</style>
