<template>
  <a-row class="dataset-container">
    <a-table
      :row-selection="rowSelection"
      :data-source="data"
      :columns="filteredColumns"
      :scroll="{y: scrollHeight}"
      :pagination="false"
    >
      <span
        slot="action"
        slot-scope="text, record"
        @click="deleteRecord(record)"
        style="cursor: pointer"
      >
        <a-icon type="delete" />
      </span>
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => (searchInput = c)"
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
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">Reset</a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
        <a-tooltip placement="topLeft" :mouseEnterDelay="0.3">
          <template slot="title">
            <a @click="doCopy(record.path)">{{ text }}</a>
          </template>
          <span v-if="searchText && searchedColumn === column.dataIndex">
            <template
              v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
            >
              <mark
                v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                :key="i"
                class="highlight"
              >{{ fragment }}</mark>
              <template v-else>{{ fragment }}</template>
            </template>
          </span>
          <template v-else>{{ text }}</template>
        </a-tooltip>
      </template>
    </a-table>
    <a-row class="float-element">
      <a-button icon="download" type="primary" @click="downloadAsJSON(data, 'downloadDataSet')" :disabled="disabled">
        JSON ({{ numOfRecords }})
      </a-button>
      <a-button icon="download" type="primary" @click="downloadAsCSV(data, 'downloadDataSet', ['_id'])" :disabled="disabled">
        CSV ({{ numOfRecords }})
      </a-button>
      <a id="downloadDataSet" v-show="false"></a>
    </a-row>
  </a-row>
</template>

<script>
import { mapActions } from 'vuex'
import uniqBy from 'lodash.uniqby'
import filter from 'lodash.filter'
import { downloadAsCSV, downloadAsJSON } from '@/views/utils'

export default {
  props: {
    allowMultiSelection: {
      type: Boolean,
      default: true,
      required: false
    },
    filterType: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'dataset', // selection or dataset
      required: false
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
    }
  },
  data() {
    return {
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      columns: [
        {
          title: '',
          width: 30,
          key: 'action',
          visible: this.mode === 'dataset' ? true : false,
          scopedSlots: { customRender: 'action' }
        },
        {
          title: 'File Name',
          dataIndex: 'fileName',
          align: 'center',
          key: 'fileName',
          visible: true,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.fileName
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          },
          ellipsis: true
        },
        {
          title: 'Project',
          width: 120,
          align: 'center',
          visible: true,
          dataIndex: 'project',
          key: 'project',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.project
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: 'Data Category',
          width: 150,
          align: 'center',
          visible: true,
          dataIndex: 'dataCategory',
          key: 'dataCategory',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.dataCategory
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: 'Data Format',
          align: 'center',
          width: 150,
          visible: true,
          dataIndex: 'dataFormat',
          key: 'dataFormat',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.dataFormat
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              })
            }
          }
        },
        {
          title: 'File Size',
          width: 100,
          visible: true,
          align: 'center',
          dataIndex: 'fileSize',
          key: 'fileSize'
        }
      ],
      selectedRows: [],
      rowSelection: {
        selectedRowKeys: [],
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          this.rowSelection.selectedRowKeys = selectedRowKeys
        },
        type: this.allowMultiSelection ? 'checkbox' : 'radio',
        onSelect: (record, selected, selectedRows) => {
          const selectedItems = this.filterByType(selectedRows, this.filterType)

          if (selectedItems.length !== selectedRows.length) {
            if (this.filterType === '/') {
              this.$message.warn('Only support directory.')
            } else {
              this.$message.warn('Only support ' + this.filterType + ' files')
            }

            this.rowSelection.selectedRowKeys = this.getFilePath(selectedItems)
          }

          this.selectedRows = this.selectedRows.concat(selectedItems)
          this.selectedRows = uniqBy(this.filterByArray(this.selectedRows, this.rowSelection.selectedRowKeys), 'path')

          this.$emit('file-select', this.selectedRows)
          console.log('File selection: ', selectedRows, selectedItems, this.selectedRows, this.rowSelection.selectedRowKeys)
        }
      },
    }
  },
  computed: {
    data() {
      return this.$store.getters.currentDataSet
    },
    numOfRecords() {
      return this.$store.getters.currentDataSet.length
    },
    disabled() {
      return this.$store.getters.currentDataSet.length === 0
    },
    scrollHeight() {
      if (this.height) {
        return this.height
      } else {
        return 500
      }
    },
    filteredColumns() {
      return filter(this.columns, o => {
        return o.visible
      })
    }
  },
  methods: {
    ...mapActions({
      saveCurrentDataSet: 'SaveCurrentDataSet'
    }),
    downloadAsCSV,
    downloadAsJSON,
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
    filterByArray(items, keys) {
      return filter(items, o => {
        return keys.includes(o.path)
      })
    },
    deleteRecord(record) {
      this.$store.commit('POP_RECORD', record)
      this.$message.warn(`Removed ${record.key} from the Current Dataset.`, 3)
      this.saveCurrentDataSet()
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },
    handleReset(clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    filterByType(records, fileType) {
      console.log(records, fileType)
      return filter(records, function(o) {
        if (fileType === '/') {
          return o.fileName.length > 0 && o.fileName.match(/.*\//)
        } else {
          const pattern = new RegExp(fileType)
          return o.fileName.length > 0 && pattern.test(o.fileName)
        }
      })
    },
    getFilePath(record) {
      return record.path
    }
  },
  mounted() {
    // TODO: Remove the code? No need to save for a period of time
    // setTimeout(() => {
    //   this.saveCurrentDataSet()
    // }, 5000)
  },
  created() {
    if (this.mode === 'selection') {
      this.rowSelection.selectedRowKeys = this.selected
    } else {
      this.rowSelection = null
    }
  }
}
</script>

<style lang="less" scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}

.dataset-container {
  .float-element {
    position: absolute;
    top: -45px;
    right: 50px;

    .ant-btn {
      margin-right: 5px;
    }
  }
}
</style>