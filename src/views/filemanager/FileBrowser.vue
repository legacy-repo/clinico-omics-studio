<template>
  <div class="file-list" :key="refreshKey">
    <a-card
      :bordered="false"
      :class="{ standalone: standalone }"
      :style="[standalone ? { 'height': '91vh' } : { 'height': 'unset' }]"
    >
      <a-col slot="title" :lg="12" :md="12" :sm="24" :xs="24">
        <a-select :value="service" style="width: 80px" @change="selectService">
          <a-select-option
            v-for="item in services"
            :key="item"
            :value="item"
          >{{ translateName(item) }}</a-select-option>
        </a-select>
        <a-select :value="bucketName" style="width: 200px" @change="selectBucket">
          <a-select-option v-for="bucket in buckets" :key="bucket">{{ bucket }}</a-select-option>
        </a-select>
        <a-button @click="switchUploadPanel" v-if="standalone" disabled>
          <a-icon type="upload" />Upload
        </a-button>
        <a-button @click="switchFolderDialog" v-if="standalone" disabled>
          <a-icon type="folder-add" />Add Folder
        </a-button>
        <a-button @click="refresh">
          <a-icon type="cloud-sync" />Refresh
        </a-button>
      </a-col>
      <a-col slot="title" :lg="12" :md="12" :sm="24" :xs="24">
        <a-select
          show-search
          :value="currentPath"
          @search="onSearch"
          style="width: calc(100% - 276px);"
        >
          <a-select-option v-for="address in addressList" :key="address">
            <a-tooltip>
              <template slot="title">{{ address }}</template>
              {{ address }}
            </a-tooltip>
          </a-select-option>
        </a-select>
        <a-button
          style="line-height: unset; margin-top: 0px; padding: 0px 10px;"
          @click="handleBookmark"
        >
          <a-icon type="star" :theme="theme" />
        </a-button>
        <a-input-search
          placeholder="Enter a link or a prefix of file name"
          allowClear
          style="width: 230px;"
          @search="onSearch"
        />
      </a-col>
      <a-row class="control-header">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <a @click="redirectHome()">
              <a-icon type="user" style="margin-right: 3px;" />
              <span>Home</span>
            </a>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-for="(item, index) in pathList" :key="index">
            <a-tooltip>
              <template slot="title">
                <a @click="doCopy(concatPathList(pathList, index))">Copy Link</a>
              </template>
              <a @click="redirectPath(item, index, pathList)">
                <span>{{ item }}</span>
              </a>
            </a-tooltip>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </a-row>
      <a-table
        :loading="loading"
        :pagination="pagination"
        :columns="columns"
        rowKey="path"
        :class="{ 'standalone-browser': height === 0 }"
        :customRow="customRow"
        :scroll="{y: height - 100}"
        :data-source="data"
        :row-selection="{ ...rowSelection, selectedRowKeys: selectedRowKeys }"
      >
        <span slot="icon" slot-scope="text, record">
          <a-icon type="file" :style="{fontSize: '20px'}" v-if="record.storageClass" />
          <a-icon
            type="folder-open"
            theme="filled"
            :style="{fontSize: '20px', color: '#ffcb01'}"
            v-else
          />
        </span>
        <span slot="size" slot-scope="text, record">{{ formatBytes(text) }}</span>
        <span slot="action" slot-scope="text, record" v-if="record.storageClass">
          <a style="margin-right: 10px;" @click="switchDetailsPanel(record)">Details</a>
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              More
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="preview">
                <a @click="previewFile(record)">Preview</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="delete" disabled>Delete</a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          style="padding: 8px"
        >
          <a-input
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          >Search</a-button>
          <a-button
            ref="resetBtn"
            size="small"
            style="width: 90px"
            @click="() => handleReset(clearFilters)"
          >Reset</a-button>
        </div>
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <template slot="customRender" slot-scope="text, record, index, column">
          <a-tooltip placement="top" :mouseEnterDelay="0.3">
            <template slot="title">
              <a @click="doCopy(formatFileName(record.path))">{{ formatFileName(text) }}</a>
            </template>
            <a @click="onClickName(record)">
              <template
                v-for="(fragment, i) in formatFileName(text).toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
              >
                <mark
                  v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                  :key="i"
                  class="highlight"
                >{{ fragment }}</mark>
                <template v-else>{{ fragment }}</template>
              </template>
            </a>
          </a-tooltip>
        </template>
      </a-table>
    </a-card>
    <!-- Popup Windows -->
    <a-modal
      class="chart-modal"
      :title="'Chart Studio for ' + chartName"
      style="top: 20px;"
      :visible="chartStudioVisible"
      :footer="null"
      @cancel="() => hideChartStudio()"
    >
      <chart-modal
        @ok="() => hideChartStudio()"
        @cancel="() => hideChartStudio()"
        :chart="chartName"
        :inFileBrowser="true"
        :filepath="filePath"
      ></chart-modal>
    </a-modal>
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
          <a-input :value="currentPath" allow-clear disabled />
        </a-tooltip>
      </a-row>
      <a-row>
        <span class="label">Upload:</span>
        <a-upload-dragger :remove="handleRemove" :multiple="true" :customRequest="uploadFile">
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">Click or drag file to this area to upload</p>
          <p class="ant-upload-hint">A maximum of 100 files can be uploaded at a time.</p>
        </a-upload-dragger>
        <p class="help-text">
          File naming conventions:
          <br />1. A file name can contain only UTF-8 characters.
          <br />2. A file name is case-sensitive.
          <br />3. A file name must be 1 to 1023 bytes in length.
          <br />4. A file name cannot start with a forward slash (/) or consecutive backslashes (\).
          <br />
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
          <a-input allowClear autofocus v-decorator="['folderName', { rules: folderNameRule }]" />
        </a-form-item>
        <a-form-item style="float: right;">
          <a-button type="danger" style="margin-right: 10px;" @click="switchFolderDialog">Cancel</a-button>
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import filter from 'lodash.filter'
import flatMap from 'lodash.flatmap'
import uniqBy from 'lodash.uniqby'
import FileSaver from 'file-saver'
import path from 'path'

import Vue from 'vue'
import Contextmenu from 'vue-contextmenujs'
Vue.use(Contextmenu)

import ChartModal from './ChartModal'

const folderNameRule = [
  { required: true, message: 'Please input your folder name!' },
  { min: 1, max: 63, message: 'Length should be 1 to 63', trigger: 'blur' },
  { pattern: /^[^/]+$/, message: 'Folder name is not valid', trigger: 'blur' }
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
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender'
    },
    onFilter: (value, record) => {
      return record.name
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
    },
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
  name: 'FileBrowser',
  components: {
    ChartModal
  },
  props: {
    refreshKey: {
      required: false,
      default: '',
      type: String
    },
    path: {
      required: false,
      default: '',
      type: String
    },
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
      default: 0,
      type: Number
    },
    filterType: {
      required: false,
      default: '.*',
      type: String
    },
    defaultService: {
      required: false,
      default: 'minio',
      type: String
    },
    enabledContextMenu: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      columns,
      service: null,
      services: [],
      searchText: '',
      selectedRowKeys: [],
      selectedRows: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          this.selectedRowKeys = selectedRowKeys
        },
        onSelect: (record, selected, selectedRows) => {
          console.log("onSelect", record, selected, selectedRows)
          this.filterAndSelect(selectedRows)
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log("onSelectAll", selected, selectedRows, changeRows)
          this.filterAndSelect(selectedRows)
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
      // Chart Studio
      filePath: '',
      currentRecord: null,
      chartStudioVisible: false,
      chartName: '',
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
        showTotal: total => {
          if (this.hasSelected) {
            return `Selected ${this.selectedRowKeys.length} / ${total} items`
          } else {
            return `Total ${total} items`
          }
        },
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.searchObjects(this.bucketName, page, pageSize, this.getPrefix(this.pathList, ''))
        },
        onShowSizeChange: (current, pageSize) => {
          this.searchObjects(this.bucketName, this.defaultPage, pageSize, this.getPrefix(this.pathList, ''))
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getServices: 'GetServices',
      getBuckets: 'GetBuckets',
      getObjects: 'GetObjects',
      makeDirectory: 'MakeDirectory',
      makeUploadUrl: 'MakeUploadUrl',
      makeDownloadUrl: 'MakeDownloadUrl',
      getObjectMeta: 'GetObjectMeta',
      uploadObject: 'UploadObject'
    }),
    filterAndSelect(selectedRows) {
      const selectedItems = this.filterByType(selectedRows, this.filterType)

      if (selectedItems.length !== selectedRows.length) {
        if (this.filterType === '/') {
          this.$message.warn('Only support directory.')
        } else {
          this.$message.warn('Only support ' + this.filterType + ' files')
        }

        this.selectedRowKeys = this.getFilePath(selectedItems)
      }

      this.selectedRows = this.selectedRows.concat(selectedItems)
      this.selectedRows = uniqBy(this.filterByArray(this.selectedRows, this.selectedRowKeys), 'path')

      this.$emit('file-select', this.selectedRows)
      console.log('File selection: ', selectedRows, selectedItems, this.selectedRows, this.selectedRowKeys)
    },
    translateName(item) {
      if (item === 'oss') {
        return 'Aliyun'
      } else if (item === 's3') {
        return 'Amazon'
      } else if (item === 'minio') {
        return 'Local'
      } else {
        return 'Unknown'
      }
    },
    whichFileType(path) {
      if (path.match(/.*.vcf$|.*.vcf.gz$/i)) {
        return 'VCF'
      } else if (path.match(/.*.bam$|.*.bam.gz$/i)) {
        return 'BAM'
      } else if (path.match(/.*.fastq$|.*.fq$|.*.fq.gz$|.*.fastq.gz$/i)) {
        return 'FASTQ'
      } else {
        return 'OTHER'
      }
    },
    async previewFile(record) {
      this.loading = true
      const path = record.path
      const fileType = this.whichFileType(path)

      if (fileType == 'VCF') {
        const responses = await Promise.all([
          this.makeDownloadUrl({ service: this.service, name: this.bucketName, key: record.name }),
          this.makeDownloadUrl({ service: this.service, name: this.bucketName, key: record.name + '.tbi' })
        ])

        console.log('Preview File: ', responses)
        this.loading = false
        this.$router.push({
          name: 'igv',
          query: {
            sampleName: record.name,
            vcfUrl: responses[0].download_url,
            vcfIndexUrl: responses[1].download_url
          }
        })
      } else {
        this.loading = false
        this.$message.info('Preview plugin is comming soon...')
      }
    },
    concatPathList(pathList, index) {
      const subPathList = pathList.slice(0, index + 1)
      const prefix = this.getPrefix(subPathList, '')
      return this.service + '://' + this.bucketName + '/' + prefix
    },
    onChangeCheckBtn() {
      this.checkBtnActive = !this.checkBtnActive
    },
    selectService(serviceName) {
      this.service = serviceName
      this.loadService()
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
    },
    handleReset(clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    onClickName(record) {
      if (record.storageClass) {
        this.switchDetailsPanel(record)
      } else {
        this.enterDirecotry(record)
      }
    },
    filterByArray(items, keys) {
      return filter(items, o => {
        return keys.includes(o.path)
      })
    },
    customRow(record) {
      if (this.enabledContextMenu) {
        return {
          on: {
            contextmenu: e => {
              e.preventDefault()
              this.onContextmenu(record, e)
            }
          }
        }
      } else {
        return {}
      }
    },
    isColumnarFile(path) {
      if (path.match(/.*\.csv$/g)) {
        return true
      } else {
        return false
      }
    },
    isValidSize(size) {
      if (size <= 1024 * 1024) {
        return true
      } else {
        return false
      }
    },
    onContextmenu(record, event) {
      console.log('onContextMenu: ', record, event)
      const disableTraceMenu = !this.isColumnarFile(record.path) || !this.isValidSize(record.size)
      this.$contextmenu({
        items: [
          {
            label: 'File Management',
            divided: true,
            icon: 'iconfont icon-wenjianguanli',
            minWidth: 0,
            children: [
              {
                label: 'Details',
                icon: 'iconfont icon-Details',
                onClick: () => {
                  this.switchDetailsPanel(record)
                }
              }
            ]
          },
          {
            label: 'Trace Your Data',
            icon: 'iconfont icon-DataUsage-1',
            disabled: disableTraceMenu,
            minWidth: 100,
            children: [
              {
                label: 'Box Plot',
                icon: 'iconfont icon-youjiantou_huaban',
                onClick: () => {
                  this.showChartStudio('boxplot-r', record)
                }
              },
              {
                label: 'Stack Barplot',
                icon: 'iconfont icon-youjiantou_huaban',
                onClick: () => {
                  this.showChartStudio('stack-barplot-r', record)
                }
              },
              {
                label: 'Density Plot',
                icon: 'iconfont icon-youjiantou_huaban',
                onClick: () => {
                  this.showChartStudio('density-r', record)
                }
              },
              {
                label: 'Grouped Box Plot',
                icon: 'iconfont icon-youjiantou_huaban',
                onClick: () => {
                  this.showChartStudio('group-boxplot', record)
                }
              },
              {
                label: 'Heatmap',
                icon: 'iconfont icon-youjiantou_huaban',
                onClick: () => {
                  this.showChartStudio('heatmap-r', record)
                }
              },
              {
                label: 'Rocket Plot',
                icon: 'iconfont icon-youjiantou_huaban',
                onClick: () => {
                  this.showChartStudio('rocket-plot-r', record)
                }
              },
              {
                label: 'Scatter Plot',
                icon: 'iconfont icon-youjiantou_huaban',
                onClick: () => {
                  this.showChartStudio('scatter-plot', record)
                }
              },
              {
                label: 'Upset',
                icon: 'iconfont icon-youjiantou_huaban',
                onClick: () => {
                  this.showChartStudio('upset-r', record)
                }
              },
              {
                label: 'Violin Plot',
                icon: 'iconfont icon-youjiantou_huaban',
                onClick: () => {
                  this.showChartStudio('violin-plot-r', record)
                }
              }
            ]
          }
        ],
        event,
        customClass: 'class-a',
        zIndex: 3,
        minWidth: 200
      })
      return false
    },
    getFilePath(files) {
      return flatMap(files, o => o.path)
    },
    filterByType(files, fileType) {
      console.log(files, fileType)
      return filter(files, function(o) {
        if (fileType === '/') {
          return o.name.length > 0 && o.name.match(/.*\//)
        } else {
          const pattern = new RegExp(fileType)
          return o.name.length > 0 && pattern.test(o.name)
        }
      })
    },
    loadServices(func) {
      this.getServices()
        .then(response => {
          console.log('Load Services: ', response)
          this.services = response.services
          console.log('loadServices: ', this.defaultService, this.services)

          if (this.services.indexOf(this.defaultService) > -1) {
            this.service = this.defaultService
          } else {
            this.service = this.services[0]
          }

          if (this.isValidLink(this.path)) {
            // Initialize the service and bucket when redirecting from other place with path.
            const [service, bucketName] = this.parsePath(this.path)
            this.service = service
            this.bucketName = bucketName
          }

          func()
        })
        .catch(error => {
          console.log('Load Services: ', error)
          this.$message.error('Can not load any services.')
        })
    },
    loadService(reloadService) {
      this.getBuckets({ service: this.service })
        .then(response => {
          this.buckets = response.data

          if (this.buckets.length > 0) {
            // Only want to reload Service
            if (!reloadService) {
              if (this.isValidLink(this.path)) {
                if (this.bucketName) {
                  this.onSearch(this.path)
                } else {
                  this.$message.error('No such link.')
                  this.$router.go(-1)
                }
              } else {
                // Invalid path
                this.bucketName = this.buckets[0]
                this.redirectHome()
              }
            }
          } else {
            this.$message.error('No such link.')
          }
        })
        .catch(error => {
          this.buckets = []
          this.bucketName = 'Not Found'
          this.$message.error('Unknown Error!')
          console.log('getBuckets: ', error)
        })
    },
    loadBookmarks() {
      const addressList = filter(JSON.parse(localStorage.getItem('datains_BOOKMARKS')), address => {
        return address.indexOf(this.service) >= 0
      })

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
    handleBookmark() {
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
    isDirectory(link) {
      // e.g. "oss://share-data-temp/R20059380-20201027-LCL3-3-20201027-LCL3-3_combined/" || "oss://share-data-temp"
      if (/.*\/$/.test(link) || /(.*):\/\/([a-zA-Z0-9\-._:]+)$/.test(link)) {
        return true
      } else {
        return false
      }
    },
    parseFile(link) {
      console.log('Parse File: ', link)
      // e.g. "oss://share-data-temp/NARD/R20059380-20201027-LCL3-3-20201027-LCL3-3_combined_R2.fastq.gz"
      let parsedList = link.match(/(.*):\/\/([a-zA-Z0-9\-._:]+)\/(.*)\/([^/]*)$/)
      if (parsedList) {
        // serviceName, bucketName, prefix, fileName
        return parsedList.slice(1)
      }

      // e.g. "oss://share-data-temp/R20059380-20201027-LCL3-3-20201027-LCL3-3_combined_R2.fastq.gz"
      parsedList = link.match(/(.*):\/\/([a-zA-Z0-9\-._:]+)\/([^/]*)$/)
      if (parsedList) {
        // serviceName, bucketName, prefix, fileName
        return [parsedList[1], parsedList[2], '/', parsedList[3]]
      }
    },
    parseDirectory(link) {
      console.log('Parse Directory: ', link)
      // e.g. "oss://share-data-temp/R20059380-20201027-LCL3-3-20201027-LCL3-3_combined/"
      let parsedList = link.match(/(.*):\/\/([a-zA-Z0-9\-._:]+)\/(.*)\/$/)
      if (parsedList) {
        // serviceName, bucketName, prefix, fileName
        return parsedList.slice(1).concat('')
      }

      // e.g. "oss://share-data-temp/"
      parsedList = link.match(/(.*):\/\/([a-zA-Z0-9\-._:]+)\/?$/)
      if (parsedList) {
        // serviceName, bucketName, prefix
        return [parsedList[1], parsedList[2], '']
      }
    },
    parsePath(link) {
      // Directory or File
      if (this.isDirectory(link)) {
        return this.parseDirectory(link)
      } else {
        return this.parseFile(link)
      }
    },
    isValidLink(link) {
      if (/(.*):\/\/(.*)/.test(link)) {
        return true
      } else {
        return false
      }
    },
    onSearch(searchStr) {
      // TODO: How to handle invalid link?
      console.log('onSearch: ', searchStr, this.parsePath(searchStr))
      if (this.isValidLink(searchStr)) {
        // Search with oss://|s3:// link
        const [service, bucketName, prefix, fileName] = this.parsePath(searchStr)
        this.service = service
        this.bucketName = bucketName
        const trimmedPrefix = this.trimSlash(prefix)
        const pathList = trimmedPrefix == '' ? [] : trimmedPrefix.split('/')
        this.redirect(pathList, fileName)
      } else {
        // Search in current directory
        this.prefix = this.getPrefix(this.pathList, searchStr)
        this.searchObjects(this.bucketName, this.defaultPage, this.defaultPageSize, this.prefix)
      }
    },
    selectBucket(value) {
      // Reset File Browser
      this.bucketName = value
      this.redirectHome()
    },
    doCopy(text) {
      this.$copyText(text)
        .then(message => {
          console.log('copy', message)
          this.$message.success('Copied')
        })
        .catch(err => {
          console.log('copy.err', err)
          this.$message.error('Failed')
        })
    },
    downloadFile(link) {
      try {
        let isFileSaverSupported = !!new Blob()
        let fileName = link
          .split('/')
          .pop()
          .split('#')[0]
          .split('?')[0]
        console.log('Support FileSaver?', isFileSaverSupported)
        FileSaver.saveAs(link, fileName)
      } catch (e) {
        this.downloadFileAsLink(link)
      }
    },
    downloadFileAsLink(link) {
      const downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', link)
      downloadAnchorNode.setAttribute('target', '_blank')
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    },
    getDownloadUrl() {
      this.makeDownloadUrl({
        service: this.service,
        name: this.bucketName,
        key: this.recordDetail.name
      })
        .then(response => {
          this.downloadUrl = response.download_url
        })
        .catch(error => {
          this.$message.error('Unknown Error!')
          console.log('getDownloadUrl: ', error)
        })
    },
    switchFolderDialog() {
      this.folderDialogVisible = !this.folderDialogVisible
    },
    handleSubmit(e) {
      e.preventDefault()
      this.folderDialog.validateFields((err, values) => {
        if (!err) {
          const key = this.pathList.join('/') + values.folderName
          this.makeDirectory({
            service: this.service,
            name: this.bucketName,
            key: key
          })
            .then(response => {
              this.switchFolderDialog()
              this.refresh()
            })
            .catch(error => {
              console.log('Cannot create folder.', error)
            })
        }
      })
    },
    existFolder(rule, value, callback) {},
    refresh() {
      const prefix = this.getPrefix(this.pathList, '')
      this.searchObjects(this.bucketName, this.pagination.current, this.pagination.pageSize, prefix)
    },
    redirectHome() {
      this.redirect([])
    },
    redirectPath(item, index, pathList) {
      this.redirect(pathList.slice(0, index + 1))
    },
    redirect(pathList, fileName) {
      this.pathList = pathList
      let prefix = this.getPrefix(pathList, '')

      if (fileName) {
        prefix = this.getPrefix(pathList, fileName)
      }

      // We need to update buckets list when we redirect from a path
      this.loadService(true)
      this.searchObjects(this.bucketName, this.defaultPage, this.defaultPageSize, prefix)
    },
    resetFilters() {
      console.log('resetFilters: ', this.$refs.resetBtn)
      if (this.$refs.resetBtn) {
        this.$refs.resetBtn.handleClick()
      }
    },
    searchObjects(bucketName, page, pageSize, prefix) {
      this.resetFilters()
      this.loading = true
      this.getObjects({
        service: this.service,
        name: bucketName,
        page: page,
        pageSize: pageSize,
        prefix: prefix
      })
        .then(response => {
          // It contains the self, so we need to remove it.
          this.data = filter(response.data, item => {
            return item.path !== response.location
          })

          // No any results
          if (this.data.length > 0) {
            this.currentPath = response.location
          }

          this.pagination.total = response.total
          this.pagination.current = response.page
          this.pagination.pageSize = response.pageSize
          this.loading = false
        })
        .catch(error => {
          this.$message.warning('Not Found / No Permission')
          this.currentPath = this.service + '://' + this.bucketName
          this.data = []
          this.pagination.total = 0
          this.pagination.current = 1
          this.pagination.pageSize = 10
          console.log('searchObjects: ', error)
          this.loading = false
        })
    },
    switchUploadPanel() {
      this.uploadPanelVisible = !this.uploadPanelVisible
    },
    closeUploadPanel() {
      this.refresh()
      this.switchUploadPanel()
      this.fileList = {}
    },
    showChartStudio(chartName, record) {
      console.log('Show Chart Studio: ', chartName, record)
      this.chartName = chartName
      this.chartStudioVisible = !this.chartStudioVisible
      this.currentRecord = record
    },
    hideChartStudio() {
      this.chartStudioVisible = !this.chartStudioVisible
      this.currentRecord = null
    },
    switchDetailsPanel(record) {
      this.detailsPanelVisible = !this.detailsPanelVisible
      this.recordDetail = record
    },
    closeDetailsPanel() {
      this.detailsPanelVisible = false
    },
    trimSlash(str) {
      if (str.match(/.*\/$/)) {
        return str
          .split('/')
          .slice(0, -1)
          .join('/')
      } else {
        return str
      }
    },
    enterDirecotry(record) {
      if (record.name.match(/.*\/.+/)) {
        console.log(this.trimSlash(record.name).split('/'))
        this.pathList = this.trimSlash(record.name).split('/')
      } else {
        this.pathList.push(this.trimSlash(record.name))
      }

      console.log('enterDirectory: ', this.pathList, record)
      // Reset page and pageSize, otherwise it maybe return nothing
      this.searchObjects(this.bucketName, this.defaultPage, this.defaultPageSize, this.getPrefix(this.pathList, ''))
    },
    formatFileName(name) {
      return name.replace(this.pathList.join('/') + '/', '')
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return ''

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },
    getPrefix(pathList, searchStr) {
      if (pathList && pathList.length > 0) {
        return pathList.join('/') + '/' + searchStr
      } else {
        return searchStr
      }
    },
    handleRemove(file) {
      const request = this.fileList[this.getPrefix(this.pathList, file.name)]
      request.cancel('Canceling Upload.')
      this.refresh()
    },
    uploadFile({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) {
      console.log('uploadFiles: ', file)
      this.makeUploadUrl({
        service: this.service,
        name: this.bucketName,
        key: this.getPrefix(this.pathList, file.name)
      })
        .then(response => {
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
              console.log('onUploadProgress: ', total, loaded, Math.round((loaded / total) * 100).toFixed(2))
              onProgress({ percent: Math.round((loaded / total) * 100) }, file)
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
            abort() {
              console.log('upload progress is aborted.')
            }
          }
        })
        .catch(error => {
          console.log('getUploadUrl: ', error)
        })
    },
    initFileService() {
      this.loadBookmarks()
      this.loadServices(this.loadService)
    },
    resetSelections() {
      this.selectedRowKeys = this.selected
    }
  },
  watch: {
    currentRecord: function() {
      if (this.currentRecord && this.currentRecord.path) {
        this.filePath = this.currentRecord.path
      }
    },
    recordDetail: function() {
      // Reset
      this.previewContent = ''

      this.getDownloadUrl()
      this.getObjectMeta({
        service: this.service,
        name: this.bucketName,
        key: this.recordDetail.name
      }).then(response => {
        this.contentType = response.contentType

        // 1048576 = 1024 * 1024 = 1MB
        if (this.recordDetail.size < 1048576) {
          // Authorization header will cause invalid request error, so we need use axios instead of this.$http
          axios.get(this.downloadUrl).then(response => {
            // Sometimes the previewContent will be not shown because the valud is number 0. bool(0) will return false.
            const data = response.data
            if (typeof data == 'number') {
              this.previewContent = JSON.stringify(data)
            } else {
              this.previewContent = data
            }
          })
        }
      })
    },
    selected: function() {
      // TODO: More robust way?
      this.resetSelections()
      if (this.selected.length > 0) {
        // Redirect to the first filepath
        if (this.selected.length === 1) {
          // We need to redirect the parent directory but the directory
          const self = this.trimSlash(this.selected[0])
          this.onSearch(self)
        } else {
          // Need to add / when the path is a directory
          const self = path.dirname(this.selected[0]) + '/'
          this.onSearch(self)        
        }
      }
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    },
    theme() {
      return this.savedBookmark ? 'filled' : 'outlined'
    },
    defaultPage() {
      return 1
    },
    defaultPageSize() {
      return 30
    }
  },
  created() {
    // Restore Selected
    if (!this.standalone) {
      this.resetSelections()
    }

    this.initFileService()
  }
}
</script>

<style lang="less">
@import (reference) '~@/components/index.less';

@header-top: 5px;
@header-left: @header-top;
@header-bottom: @header-top;

.file-list {
  .standalone-browser {
    .ant-table-body {
      max-height: unset !important;
      overflow-y: scroll;
      height: calc(91vh - 180px);
    }
  }

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

  .ant-card {
    .ant-card-head,
    .ant-card-body {
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

        .ant-btn,
        .ant-input-search,
        .ant-select {
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

      .ant-table-thead > tr > th,
      .ant-table-tbody > tr > td {
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

.upload-panel,
details-panel {
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

.chart-modal {
  .ant-modal-body {
    padding: 10px 24px;
  }
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>

<style lang="less">
.ant-table-thead > tr > th .anticon-filter,
.ant-table-thead > tr > th .ant-table-filter-icon {
  right: unset;
}
</style>