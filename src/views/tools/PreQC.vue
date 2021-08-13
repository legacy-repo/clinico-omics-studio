<template>
  <page-view
    title="PreQC Pack for FASTQ File"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <a-row class="preqc-pack">
      <div class="mask-window" v-if="fileBrowserActive"></div>
      <popup-file-browser
        filterType="\.*$"
        :multiple="true"
        :selected="selected"
        @select-files="confirmSelectFiles"
        @cancel-select-files="cancelSelectFiles"
        v-if="fileBrowserActive"
      ></popup-file-browser>
      <a-collapse :activeKey="activeKey">
        <a-collapse-panel key="1" header="Config Panel">
          <a-col class="input-area">
            <a-row class="action-header">
              <a-col :span="16">
                <label style="display: inline-block">
                  {{ inputLabel }}&nbsp;
                  <a @click="loadExample" style="margin-left: 5px">{{ 'Load Example' }}</a>
                </label>
              </a-col>
              <a-col :span="8">
                <a-button @click="selectFiles" style="float: right"> <a-icon type="plus" />Select Files </a-button>
              </a-col>
            </a-row>
            <a-row style="padding-top: 10px">
              <a-textarea
                :class="{ error: error }"
                :placeholder="placeholder"
                allowClear
                @change="changeLinks"
                :value="links"
                :rows="6"
              />
              <span v-show="errorMsg.length > 0" :class="{ error: error }">{{ errorMsg }}</span>
            </a-row>
          </a-col>
          <a-button
            slot="extra"
            :disabled="items.length === 0 || disabled"
            @click="handleClick"
            size="small"
            type="primary"
            icon="poweroff"
          >
            Analyze
          </a-button>
        </a-collapse-panel>
      </a-collapse>
      <query-table namespace="preqc" rowKey="filepath"></query-table>
    </a-row>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import uniqBy from 'lodash.uniqby'
import QueryTable from './QueryTable'
import { mapActions, mapMutations, mapState } from 'vuex'
import PopupFileBrowser from '@/views/filemanager/PopupFileBrowser'

export default {
  components: {
    PopupFileBrowser,
    PageView,
    QueryTable
  },
  props: {},
  data() {
    return {
      activeKey: ['1'],
      example:
        'oss://choppy-app-example-data/RNAseq/production_example_data/sample5_R1.fq.gz,028a9952446d0470ee48de9b92140f82',
      inputLabel: 'Please Input OSS Links >>>',
      errorMsg: '',
      error: false,
      placeholder: 'Load example or input your data.',
      links: '',
      disabled: false,
      fileBrowserActive: false,
      selected: []
    }
  },
  computed: {
    ...mapState('preqc', ['items', 'columns'])
  },
  watch: {
    links(newValue, oldValue) {
      console.log('Links Updated: ', oldValue, newValue)
      this.validateSync(this.links)
    }
  },
  methods: {
    ...mapActions('preqc', ['getItem']),
    ...mapMutations('preqc', ['setItems']),
    confirmSelectFiles(filePathList) {
      this.fileBrowserActive = false
      console.log('Selected Files: ', filePathList)
      this.selected = filePathList
      this.links = filePathList.join('\n')
    },
    cancelSelectFiles() {
      this.fileBrowserActive = false
    },
    selectFiles() {
      this.fileBrowserActive = true
    },
    loadExample() {
      this.links = this.example
    },
    changeLinks(e) {
      this.links = e.target.value
    },
    validateInput(value) {
      // TODO: Performance?
      let records = this.makeRecords(value)
      let errorMsg = ''
      let error = false
      if (value.length === 0) {
        errorMsg = 'Please input your data!'
        error = true
      } else if (!/oss:\/\/[a-zA-Z0-9 \-/_.]+(,[a-zA-Z0-9]+)?$/.test(value)) {
        errorMsg = 'The first column shoud be an oss link, the second column need to be a md5sum.'
        error = true
      } else if (value.split('\n').length > 100) {
        errorMsg = 'The number of rows shoud not be more than 100.'
        error = true
      } else if (uniqBy(records, 'filepath').length !== records.length) {
        errorMsg = 'Duplicated OSS Link'
        error = true
      } else {
        errorMsg = ''
        error = false
      }

      return {
        error: error,
        errorMsg: errorMsg
      }
    },
    validateSync(links) {
      const { error, errorMsg } = this.validateInput(links)
      // We need to reset/set error status
      this.error = error
      this.errorMsg = errorMsg
      // Reset disabled status
      this.disabled = false

      if (error) {
        this.updateToTable()
      } else {
        this.updateToTable(this.links)
      }

      console.log('PreQC: ', links)
    },
    updateToTable(links) {
      if (links) {
        const records = this.makeRecords(links)
        this.setItems(records)
      } else {
        this.setItems([])
      }
    },
    basename(path) {
      return path.split('/').reverse()[0]
    },
    makeRecords(value) {
      const records = []
      value.split(/\n/).forEach(row => {
        const rowList = row.split(',')
        const filepath = rowList[0].trim()
        records.push({
          name: this.basename(filepath),
          filepath: filepath,
          expected_md5sum: rowList.length > 1 ? rowList[1].trim() : ''
        })
      })

      return records
    },
    handleClick() {
      this.items.forEach(item => {
        this.getItem(item)
      })
      this.disabled = true
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.preqc-pack {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  // min-height: 525px;

  .action-header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .file-manager-container {
    top: 10%;
  }
}
</style>

<style lang="less">
.preqc-pack {
  .error {
    color: #f56c6c;

    textarea {
      border-color: #f56c6c;
    }
  }
}
</style>
