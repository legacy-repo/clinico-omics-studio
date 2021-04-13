<template>
  <a-row class="results-container">
    <a-icon
      @click="close"
      theme="filled"
      style="font-size: 16px; position: absolute; top: 5px; right: 5px; z-index: 1;"
      type="close-circle"
    />
    <a-table
      :row-selection="rowSelection"
      :data-source="data"
      :columns="filteredColumns"
      :scroll="{y: scrollHeight}"
      :pagination="false"
    >
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
        >{{ $t('workflow.results.search') }}</a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">{{ $t('workflow.results.reset') }}</a-button>
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
            <a @click="doCopy(record.path)" v-if="column.dataIndex == 'fileName'">{{ text }}</a>
            <a @click="doCopy(text)" v-else>{{ text }}</a>
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
      <span
        slot="action"
        slot-scope="text, record"
        @click="redirectFS(record.path)"
        style="cursor: pointer"
      >
        <a-icon type="eye" />
      </span>
    </a-table>
    <a-button
      style="margin-top: 5px; float: right; z-index: 1;"
      :disabled="!workflowRoot"
      @click="redirectFS(workflowRoot)"
    >{{ $t('workflow.results.accessWorkingDirectory') }} ({{ `${data.length} files` }})</a-button>
  </a-row>
</template>

<script>
import uniqBy from 'lodash.uniqby'
import filter from 'lodash.filter'

export default {
  props: {
    workflowRoot: {
      type: String,
      default: null,
      required: false
    },
    data: {
      type: Array,
      required: true
    },
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
      default: 'results', // selection or results
      required: false
    },
    selected: {
      required: false,
      default: () => [],
      type: Array
    },
    height: {
      required: false,
      default: 400,
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
          title: this.$t('workflow.results.fileName'),
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
          title: this.$t('workflow.results.fileIndex'),
          dataIndex: 'name',
          align: 'center',
          key: 'name',
          visible: true,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.name
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
          title: this.$t('workflow.results.project'),
          align: 'center',
          width: 150,
          visible: true,
          dataIndex: 'project',
          key: 'project'
        },
        {
          title: this.$t('workflow.results.jobName'),
          align: 'center',
          width: 150,
          visible: true,
          dataIndex: 'jobName',
          key: 'jobName',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.jobName
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
          title: this.$t('workflow.results.fileType'),
          dataIndex: 'fileType',
          width: 150,
          align: 'center',
          key: 'fileType',
          visible: true,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.fileType
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
          title: '',
          align: 'center',
          width: 50,
          key: 'action',
          visible: this.mode === 'results' ? true : false,
          scopedSlots: { customRender: 'action' }
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
          console.log(
            'File selection: ',
            selectedRows,
            selectedItems,
            this.selectedRows,
            this.rowSelection.selectedRowKeys
          )
        }
      }
    }
  },
  computed: {
    scrollHeight() {
      if (this.height) {
        return this.height
      } else {
        return 300
      }
    },
    filteredColumns() {
      return filter(this.columns, o => {
        return o.visible
      })
    }
  },
  methods: {
    close() {
      this.$emit('close')
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
    redirectFS(path) {
      this.$router.push({
        name: 'file-manager',
        query: { path: path, refreshKey: JSON.stringify(Date.now()) }
      })
    },
    filterByArray(items, keys) {
      return filter(items, o => {
        return keys.includes(o.path)
      })
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
  created() {
    if (this.mode === 'selection') {
      this.rowSelection.selectedRowKeys = this.selected
    } else {
      this.rowSelection = null
    }
  }
}
</script>
<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>