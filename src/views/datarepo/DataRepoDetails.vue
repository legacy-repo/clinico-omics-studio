<template>
  <div class="data-repo">
    <a-card :bordered="false">
      <a-col slot="title" :lg="12" :md="12" :sm="24" :xs="24">
        <a-popover placement="bottom" style="min-width: 260px">
          <template slot="content">
            <a-timeline class="json-popover" :reverse="false">
              <a-timeline-item @click="loadVersion('Current Workspace')">
                <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px" />
                Current Workspace...
              </a-timeline-item>
              <a-timeline-item color="green" @click="loadVersion(item.id)" :key="item.id" v-for="item in versions">
                <a-row class="version-item">
                  <span class="title">{{ item.time }}</span>
                  <p class="content" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden">
                    {{ item.id }}
                  </p>
                  <p class="content">{{ item.message }}</p>
                </a-row>
              </a-timeline-item>
            </a-timeline>
          </template>
          <a-button>
            <a-icon type="history" />
            {{ totalVersions }} Versions <a-divider type="vertical" /> {{ dataVersion }}
          </a-button>
        </a-popover>
        <a-button type="danger" style="margin-left: 5px" @click="showModal" :disabled="!isDirty">
          <a-icon type="file-done" />New Version
        </a-button>
        <a-modal
          title="Do you want to make a new version?"
          class="comment-box"
          v-model="visible"
          @ok="submitNewVersion"
          okText="Submit"
          cancelText="Cancel"
        >
          <a-textarea
            v-model="commentValue"
            placeholder="Comment the current version."
            :autoSize="{ minRows: 3, maxRows: 5 }"
          />
        </a-modal>
      </a-col>
      <a-col slot="title" style="display: flex; flex-direction: row; float: right">
        <a-button type="danger" style="margin-right: 5px" :disabled="dataVersion == 'Current Workspace'">
          <a-icon type="undo" />Restore
        </a-button>
        <a-upload
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :headers="headers"
          @change="uploadFiles"
        >
          <a-button :disabled="latestVersion !== dataVersion"><a-icon type="upload" />Upload</a-button>
        </a-upload>
      </a-col>

      <a-row class="control-header">
        <a-col :lg="12" :md="12" :sm="24" :xs="24" style="display: flex">
          <a-breadcrumb style="margin-right: 15px">
            <a-breadcrumb-item href="">
              <span @click.stop="returnHome" style="cursive: pointer">
                <a-icon type="home" />
                <span style="margin-left: 5px">Data Repo</span>
              </span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>{{ repoName }}</a-breadcrumb-item>
          </a-breadcrumb>
          <a-badge showZero :count="totalFiles" :numberStyle="{ backgroundColor: '#52c41a' }" />
        </a-col>
        <a-col :lg="12" :md="12" :sm="24" :xs="24">
          <div style="float: right">
            <a-select placeholder="Which Service" style="width: 180px; margin-right: 5px" @change="handleChange">
              <a-select-option value="jack">Metadata Quality Review</a-select-option>
              <a-select-option value="lucy">Omics Data Commons</a-select-option>
              <a-select-option value="disabled" disabled>Data Fusion</a-select-option>
            </a-select>
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>Current directory is dirty, so you can't publish.</span>
              </template>
              <a-button type="primary" :disabled="isDirty"><a-icon type="cloud-upload" />Publish</a-button>
            </a-tooltip>
          </div>
        </a-col>
      </a-row>

      <a-list size="small" :loading="loading">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-col :lg="6" :md="6" :sm="24" :xs="24">
            <a-list-item-meta>
              <a-popover slot="avatar" placement="right">
                <template slot="content">
                  <vue-json-pretty class="json-popover" :data="item"></vue-json-pretty>
                </template>
                <file-lock-logo type="file" class="file-logo" v-if="item.type" />
                <folder-lock-logo type="folder" class="folder-logo" v-else />
              </a-popover>
              <a slot="title" @click="onLoadFile(item.name, item.type)">{{ item.name }}</a>
              <a-tag :color="getColor(item.status)" slot="description">{{ item.status }}</a-tag>
            </a-list-item-meta>
          </a-col>
          <a-col class="list-content" :lg="14" :md="14" :sm="24" :xs="24">
            <div class="list-content-item">
              <span>Created</span>
              <p>{{ formatDateTime(item.created) }}</p>
            </div>
            <div class="list-content-item">
              <span>Modified</span>
              <p>{{ formatDateTime(item.modified) }}</p>
            </div>
            <div class="list-content-item">
              <span>Size</span>
              <p>{{ item.size }}</p>
            </div>
            <div class="list-content-item">
              <span>MD5 CheckSum</span>
              <p>{{ item.md5sum }}</p>
            </div>
          </a-col>
          <div slot="actions">
            <a @click="onLoadFile(item.name)">View</a>
            &nbsp;
            <a @click="onDownloadFile(item.name)">Download</a>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { fileLockLogo, folderLockLogo } from '@/core/icons'
import VueJsonPretty from 'vue-json-pretty'
import { mapActions } from 'vuex'
import orderBy from 'lodash.orderby'
import moment from 'moment'

export default {
  props: {},
  data() {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      isDirty: true,
      dataVersion: 'Current Workspace',
      latestVersion: 'ffff',
      commentValue: '',
      visible: false,
      totalVersions: 0,
      totalFiles: 0,
      data: [
        {
          name: 'datafile',
          size: 0,
          isFile: false,
          modified: 1585924514000,
          created: '2020-04-03T14:35:08Z',
          type: null,
          status: 'unchanged',
          location: '/Users/choppy/Downloads/vcf',
          md5sum: 'ec5b89dc49c433a9521a13928c032120'
        }
      ],
      versions: [],
      loading: false
    }
  },
  components: {
    fileLockLogo,
    folderLockLogo,
    VueJsonPretty
  },
  watch: {
    dataVersion(newValue, oldValue) {
      console.log('Data Version Changed: ', newValue, oldValue)
      if (newValue !== 'Current Workspace') {
        this.searchRepoFiles(this.repoName, newValue)
      } else {
        this.searchRepoFiles(this.repoName, this.latestVersion)
      }
    }
  },
  computed: {
    repoName() {
      return this.$route.params.repoName
    }
  },
  methods: {
    ...mapActions({ getRepoVersion: 'GetRepoVersion', getRepoFiles: 'GetRepoFiles' }),
    showModal() {
      if (this.latestVersion === this.dataVersion || this.dataVersion === 'Current Workspace') {
        this.visible = true
      } else {
        this.$message.warning('You can make a new version based on the latest version.')
      }
    },
    submitNewVersion() {
      if (this.commentValue.length === 0) {
        this.$message.warning("Comment can't be empty.")
      } else {
        // TODO: Create a new version
        this.visible = false
      }
    },
    formatDateTime(datetime) {
      if (datetime) {
        return moment(datetime).format('YYYY-MM-DD HH:mm')
      } else {
        return ''
      }
    },
    uploadFiles() {},
    loadVersion(id) {
      if (id !== 'Current Workspace') {
        this.dataVersion = id
        this.isDirty = false
      } else {
        this.dataVersion = 'Current Workspace'
        this.isDirty = true
      }
    },
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    handleBlur() {
      console.log('blur')
    },
    handleFocus() {
      console.log('focus')
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    getColor(status) {
      if (status === 'modified') {
        return '#f50'
      } else if (status === 'unchanged') {
        return '#87d068'
      }
    },
    searchGit(page, pageSize, status) {},
    onLoadFile(name, ftype) {},
    returnHome() {
      console.log('Return Home')
      this.$router.push({
        name: 'data-repo-management'
      })
    },
    searchRepoVersion(name) {
      this.getRepoVersion(name)
        .then(response => {
          this.versions = response
          this.totalVersions = this.versions.length
          if (this.totalVersions > 0) {
            this.latestVersion = this.versions[0].id
            this.searchRepoFiles(name, this.latestVersion)
          }
          console.log('Search Repo Version: ', response)
        })
        .catch(error => {
          console.log('Search Repo Version Error: ', error)
        })
    },
    searchRepoFiles(name, version, subpath) {
      this.loading = true
      this.getRepoFiles({
        name: name,
        commitId: version,
        subpath: subpath
      })
        .then(response => {
          this.data = orderBy(response, 'isFile')
          this.totalFiles = this.data.length
          console.log('Search Repo Files: ', response)
          this.loading = false
        })
        .catch(error => {
          this.data = []
          console.log('Search Repo Files Error: ', error)
          this.loading = false
        })
    }
  },
  created() {
    this.searchRepoVersion(this.repoName)
  }
}
</script>

<style lang="less">
.data-repo {
  .ant-card-head-title {
    padding-top: 0px;

    .ant-btn {
      margin-top: 16px;
    }
  }

  .ant-btn-danger:focus,
  .ant-btn-danger:hover {
    color: #fff !important;
    border-color: #ff4e50 !important;
  }

  .ant-list-item {
    flex-wrap: wrap;
  }

  .list-content {
    display: flex;
    flex-direction: row;
  }

  .ant-list-item-meta,
  .list-content-item {
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
    .ant-col {
      margin-top: 10px;
    }
  }
}

.json-popover {
  margin-top: 10px;
  max-width: 280px;
  min-width: 240px;
  max-height: 300px;
  padding: 5px;
  overflow: scroll;

  .ant-timeline-item {
    cursor: pointer;

    .version-item {
      .title {
        font-size: 15px;
        font-weight: 500;
      }

      .content {
        font-size: 14px;
        font-weight: 400;
        color: #00000073;
        margin-bottom: 0px;
      }
    }
  }

  .ant-timeline-item-last {
    padding-bottom: 0px;
  }

  .ant-timeline-item-last > .ant-timeline-item-content {
    min-height: unset;
  }
}

.json-popover::-webkit-scrollbar {
  width: 0 !important;
}

.file-logo,
.folder-logo {
  margin-top: 5px;
  font-size: 16px;
  padding: 4px;
  width: 45px;
  height: 45px;
  vertical-align: middle;
}

.data-repo .ant-card-body {
  padding: 0px 24px 10px;
}

.comment-box {
  top: 25%;

  .ant-modal-body {
    padding: 0px 24px 10px;
  }

  .ant-modal-header,
  .ant-modal-footer {
    border: unset;
  }
}
</style>
