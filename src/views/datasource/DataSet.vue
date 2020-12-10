<template>
  <a-row class="dataset-container">
    <a-table
      :row-selection="rowSelection"
      :data-source="data"
      :columns="columns"
      :scroll="{y: scrollHeight}"
      :pagination="false"
    >
      <span
        slot="action"
        v-if="mode !== 'selection'"
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
      </template>
    </a-table>
  </a-row>
</template>

<script>
import { mapActions } from 'vuex'
import uniqBy from 'lodash.uniqby'
import filter from 'lodash.filter'

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
      default: 'dataset',  // selection or dataset
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
      selectedRowKeys: [],
      columns: [
        {
          title: '',
          width: 30,
          key: 'action',
          scopedSlots: { customRender: 'action' }
        },
        {
          title: 'File Name',
          dataIndex: 'fileName',
          align: 'center',
          key: 'fileName',
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
          }
        },
        {
          title: 'Library',
          align: 'center',
          dataIndex: 'library',
          key: 'library',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) =>
            record.library
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
          title: 'Project',
          width: 100,
          align: 'center',
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
          align: 'center',
          dataIndex: 'fileSize',
          key: 'fileSize'
        }
      ],
      rowSelection() {
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            this.selectedRowKeys = selectedRowKeys
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

              this.selectedRowKeys = this.getFilePath(selectedItems)
            }

            this.selectedRows = this.selectedRows.concat(selectedItems)
            this.selectedRows = uniqBy(this.filterByArray(this.selectedRows, this.selectedRowKeys), 'path')

            this.$emit('file-select', this.selectedRows)
            console.log('File selection: ', selectedRows, selectedItems, this.selectedRows, this.selectedRowKeys)
          }
        }
      }
    }
  },
  computed: {
    data() {
      return this.$store.getters.currentDataSet
    },
    scrollHeight() {
      if (this.height) {
        return this.height
      } else {
        return 500
      }
    }
  },
  methods: {
    ...mapActions({
      removeRecord: 'RemoveRecord',
      saveCurrentDataSet: 'SaveCurrentDataSet'
    }),
    filterByArray(items, keys) {
      return filter(items, o => {
        return keys.includes(o.path)
      })
    },
    deleteRecord(record) {
      this.removeRecord(record)
      this.$message.warn(`Removed ${record.key} from the Current Dataset.`, 3)
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
    setTimeout(() => {
      this.saveCurrentDataSet()
    }, 5000)
  },
  created() {
    this.selectedRowKeys = this.selected
  }
}
</script>
<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>