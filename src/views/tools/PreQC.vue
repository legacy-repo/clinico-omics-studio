<template>
  <page-view
    title="PreQC Pack for FASTQ File"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <a-row class="preqc-pack">
      <a-collapse :activeKey="activeKey">
        <a-collapse-panel key="1" header="Config Panel">
          <a-col class="input-area">
            <label style="display: inline-block">
              {{ inputLabel }}&nbsp;
              <a @click="loadExample" style="margin-left: 5px">{{ 'Load Example' }}</a>
            </label>
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
import QueryTable from './QueryTable'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {
    PageView,
    QueryTable
  },
  props: {},
  data() {
    return {
      activeKey: ['1'],
      example: 'oss://test/test.fq.gz',
      inputLabel: 'Please Input OSS Links >>>',
      errorMsg: '',
      error: false,
      placeholder: 'Load example or input your data.',
      links: '',
      disabled: false
    }
  },
  computed: {
    ...mapState('preqc', ['items', 'columns'])
  },
  methods: {
    ...mapActions('preqc', ['getItem']),
    ...mapMutations('preqc', ['setItems']),
    validateInput(value) {
      let errorMsg = ''
      let error = false
      if (value.length === 0) {
        errorMsg = 'Please input your data!'
        error = true
      } else if (!/oss:\/\/[a-zA-Z0-9 \-/_.]+(,[a-zA-Z0-9]+)?$/.test(value)) {
        errorMsg = 'The first column shoud be an oss link, the second column need to be a md5sum.'
        error = true
      } else if (value.split('\n').length > 10) {
        errorMsg = 'The number of rows shoud not be more than 10.'
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
    loadExample() {
      this.links = this.example
      this.validateSync(this.links)
    },
    changeLinks(e) {
      this.links = e.target.value
      this.validateSync(this.links)
    },
    validateSync(links) {
      const { error, errorMsg } = this.validateInput(links)
      // We need to reset/set error status
      this.error = error
      this.errorMsg = errorMsg

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
      this.disabled = !this.disabled
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
