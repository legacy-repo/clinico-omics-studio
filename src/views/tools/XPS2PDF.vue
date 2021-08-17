<template>
  <page-view
    title="XPS to PDF"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <a-row class="tool-page" :gutter="16">
      <a-col :xl="18" :lg="16" :md="14" :sm="24" :xs="24" class="tool-form">
        <a-row>
          <a-button
            type="primary"
            style="float: right; margin-bottom: 10px;"
            @click="handleUpload"
            :disabled="fileList.length === 0"
            :loading="uploading"
          >{{ $t('tools.xps2pdf.convert') }}</a-button>
        </a-row>
        <a-upload-dragger
          name="file"
          :multiple="true"
          :remove="handleRemove"
          :before-upload="beforeUpload"
          :fileList="fileList"
          accept="application/vnd.ms-xpsdocument, application/oxps"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">{{ $t('tools.xps2pdf.uploadText') }}</p>
          <p class="ant-upload-hint">
            {{ $t('tools.xps2pdf.uploadHint') }}
          </p>
        </a-upload-dragger>
        <a-collapse v-model="activeKey">
          <a-collapse-panel key="1" :header="$t('tools.xps2pdf.taskHistory')">
            <a-table :columns="columns" :data-source="data" size="small">
              <span slot="pdf" slot-scope="pdf, record">
                <a
                  :href="tServiceHost + '/' + pdf"
                  target="_blank"
                  :disabled="record.status !== 'success'"
                >{{ $t('tools.xps2pdf.download') }}</a>
              </span>
              <span slot="zip" slot-scope="zip, record">
                <a
                  :href="tServiceHost + '/' + zip"
                  target="_blank"
                  :disabled="record.status !== 'success'"
                >{{ $t('tools.xps2pdf.download') }}</a>
              </span>
              <span slot="status" slot-scope="status">
                <a-tag
                  :color="formatColor(status)"
                >{{ status.toUpperCase() }}</a-tag>
              </span>
            </a-table>
            <a-icon slot="extra" type="delete" @click="removeHistory" />
          </a-collapse-panel>
        </a-collapse>
      </a-col>
      <a-col :xl="6" :lg="8" :md="10" :sm="24" :xs="24">
        <vue-markdown :source="helpMsg" @rendered="update" class="markdown-viewer"></vue-markdown>
      </a-col>
    </a-row>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'
import moment from 'moment'
import { initTServiceHost } from '@/config/defaultSettings'

export default {
  components: {
    PageView,
    VueMarkdown
  },
  data () {
    return {
      appName: 'xps2pdf',
      helpLink: 'https://nordata-cdn.oss-cn-shanghai.aliyuncs.com/clinico-omics/xps2pdf.md',
      helpMsg: this.$t('tools.xps2pdf.helpMsg'),
      data: [],
      fileList: [],
      uploading: false,
      activeKey: ['1'],
      tServiceHost: initTServiceHost(),
      columns: [
        {
          dataIndex: 'filename',
          key: 'filename',
          title: this.$t('tools.xps2pdf.fileName')
        },
        {
          title: this.$t('tools.xps2pdf.createdTime'),
          dataIndex: 'createdTime',
          key: 'createdTime'
        },
        {
          title: this.$t('tools.xps2pdf.status'),
          key: 'status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          width: '100px'
        },
        {
          title: this.$t('tools.xps2pdf.pdfFile'),
          dataIndex: 'pdf',
          key: 'pdf',
          scopedSlots: { customRender: 'pdf' },
          width: '100px'
        },
        {
          title: this.$t('tools.xps2pdf.zipFile'),
          dataIndex: 'zip',
          key: 'zip',
          scopedSlots: { customRender: 'zip' },
          width: '100px'
        }
      ]
    }
  },
  methods: {
    removeHistory (event) {
      localStorage.setItem('xps2pdf-history', '[]')
      this.loadHistory()
      this.$message.success(this.$t('removeHistorySuccessfully'))
      event.stopPropagation()
    },
    formatColor(status) {
      if (status == 'success') {
        return '#87d068'
      } else if (status == 'running') {
        return '#108ee9'
      } else {
        return '#f50'
      }
    },
    update () {
      this.$nextTick(() => {
        Prism.highlightAll()
      })
    },
    loadHelpMsg () {
      const helpLink = this.helpLink
      this.$http({
        url: helpLink,
        method: 'get',
        params: {}
      }).then(content => {
        this.helpMsg = content
        console.log('loadHelpMsg: ', content)
      }).catch(error => {
        this.helpMsg = this.$t('tools.xps2pdf.helpMsg')
        console.log('loadHelpMsg Error: ', error)
      })
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload (file) {
      if (!file.name.match(/.*.xps/)) {
        this.$message.warn(this.$t('onlyXpsFormat'))
        return false
      }

      this.fileList = [...this.fileList, file]
      this.fileType = 'application/vnd.ms-xpsdocument'
      return false
    },
    handleConvert (file) {
      const history = JSON.parse(localStorage.getItem('xps2pdf-history'))
      var xps2pdfHistory = history !== null ? history : []

      this.$http({
        url: this.tServiceHost + '/api/tool/xps2pdf',
        method: 'post',
        data: {
          filepath: file.filepath
        }
      })
        .then(resp => {
          this.uploading = false
          this.$message.success(this.$t('tools.xps2pdf.convertSuccessfully'))

          file['pdf'] = resp['pdf_url']
          file['zip'] = resp['zip_url']
          file['log'] = resp['log_url']
          file['status'] = 'success'
          xps2pdfHistory.splice(0, 0, file)
          localStorage.setItem('xps2pdf-history', JSON.stringify(xps2pdfHistory))
          this.loadHistory()
        })
        .catch(error => {
          file['pdf'] = null
          file['zip'] = null
          file['log'] = null
          file['status'] = 'error'
          xps2pdfHistory.splice(0, 0, file)
          localStorage.setItem('xps2pdf-history', JSON.stringify(xps2pdfHistory))
          this.uploading = false
          console.log('Error: ', error)
          this.$message.error(this.$t('tools.xps2pdf.convertFailed'))
        })
    },
    handleUpload () {
      const { fileList } = this
      const formData = new FormData()
      for (var i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        // Here we create unique key 'files[i]' in our response dict
        formData.append('files', file)
      }

      this.uploading = true

      console.log('handleUpload: ', fileList)

      // You can use any AJAX library you like
      this.$http({
        url: this.tServiceHost + '/api/upload',
        method: 'post',
        processData: false,
        data: formData
      })
        .then(resp => {
          this.fileList = []

          const file = {
            filename: fileList[0].name + ' et al.',
            createdTime: moment().toString(),
            key: moment().toString(),
            filepath: resp['upload_path']
          }
          this.handleConvert(file)
        })
        .catch(error => {
          this.uploading = false
          console.log('Error: ', error)
          this.$message.error(this.$t('tools.xps2pdf.convertFailed'))
        })
    },
    loadHistory () {
      const history = JSON.parse(localStorage.getItem('xps2pdf-history'))
      this.data = history !== null ? history : []
    }
  },
  created () {
    this.loadHistory()
    this.loadHelpMsg()
  }
}
</script>

<style lang="less">
.tool-page {
  width: 100%;
  margin-left: 0px !important;
  margin-right: 0px !important;

  .tool-form {
    padding: 10px;
    background-color: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    min-height: 500px;

    .ant-form-item {
      margin-bottom: 10px;
    }

    .ant-collapse {
      margin-top: 10px;

      .ant-collapse-content > .ant-collapse-content-box {
        padding: 0px 0px;
      }

      .ant-table-small {
        border: unset;
        border-radius: 0px;
      }
    }

    .ant-form {
      margin-top: 10px;
    }
  }

  .markdown-viewer {
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    padding: 10px;
    background-color: #fff;
    min-height: 500px;
  }
}
</style>
