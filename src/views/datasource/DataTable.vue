<template>
  <a-row>
    <a-row class="table-operations">
      <a-col :xl="16" :lg="16" :md="24" :sm="24" :xs="24">
        <a-popover v-model="menuVisible" trigger="click" placement="bottom">
          <a-input-search
            style="margin-bottom: 10px;"
            slot="content"
            placeholder="Filter Columns"
            allowClear
            @change="onSearch"
          />
          <a-row slot="content">
            <a-col class="column-list">
              <a-checkbox
                v-for="item in filteredColumns"
                :defaultChecked="item.visible"
                :key="item.key"
                @change="onSelectColumn(item.title, $event)"
              >{{ item.title }}</a-checkbox>
            </a-col>
          </a-row>
          <a-button>
            <a-icon type="menu" />
          </a-button>
        </a-popover>
        <a-button @click="showSortMenu" disabled>
          <a-icon type="sort-ascending" />
        </a-button>
        <a-button icon="download" @click="downloadAsJSON">JSON ({{ pagination.total }})</a-button>
        <a-button icon="download" @click="downloadAsCSV">CSV ({{ pagination.total }})</a-button>
        <a-button @click="switchCartTable">
          <a-icon type="experiment" />
          <span>Cart Files &nbsp;</span>
          <a-tag color="#87d068" style="margin: 0px;">{{ recordCounts }}</a-tag>
        </a-button>
      </a-col>
      <a-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
        <p class="header-info">Showing {{ first }} - {{ last }} of {{ total }} files</p>
      </a-col>
    </a-row>
    <a-table
      :row-selection="{ onSelectAll: onSelectAll, onSelect: onSelectRecord, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="visibleColumns"
      :pagination="pagination"
      :dataSource="data"
      :loading="loading"
      :scroll="{ x: 1000, y: 780 }"
    >
      <a slot="fileName" slot-scope="text, record" @click="redirectToRecord(record.path)">{{ text }}</a>
    </a-table>
    <a id="downloadAnchorElem" v-show="false"></a>
    <a-drawer
      title="Cart Files"
      :placement="placement"
      :visible="cartTableActive"
      @close="switchCartTable"
      width="80%"
      class="dataset-panel"
    >
      <data-set></data-set>
    </a-drawer>
  </a-row>
</template>

<script>
import filter from 'lodash.filter'
import map from 'lodash.map'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import DataSet from '@/views/datasource/DataSet'
import { downloadAsCSV, downloadAsJSON } from '@/views/utils'

const columns = [
  {
    title: 'Access',
    dataIndex: 'access',
    key: 'access',
    align: 'center',
    visible: false
  },
  {
    title: 'File Name',
    dataIndex: 'fileName',
    key: 'fileName',
    align: 'center',
    scopedSlots: { customRender: 'fileName' },
    visible: true
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    align: 'center',
    visible: true
  },
  {
    title: 'Data Category',
    dataIndex: 'dataCategory',
    key: 'dataCategory',
    align: 'center',
    visible: true
  },
  {
    title: 'Data Format',
    dataIndex: 'dataFormat',
    key: 'dataFormat',
    align: 'center',
    visible: true
  },
  {
    title: 'File Size',
    dataIndex: 'fileSize',
    key: 'fileSize',
    align: 'center',
    visible: true
  },
  {
    title: 'Annotations',
    dataIndex: 'annotations',
    key: 'annotations',
    align: 'center',
    visible: false
  }
]

export default {
  props: {},
  components: {
    DataSet
  },
  data() {
    return {
      cartTableActive: false,
      placement: 'right',
      data: [],
      filterValue: '',
      loading: false,
      menuVisible: false,
      // selectedRowKeys: [],
      columns,
      pagination: {
        size: 'small',
        pageSizeOptions: ['30', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 30,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.set_page({
            page: page,
            per_page: pageSize
          })
          this.searchCollections()
        },
        onShowSizeChange: (current, pageSize) => {
          this.set_page({
            page: 1,
            per_page: pageSize
          })
          this.searchCollections()
        }
      }
    }
  },
  watch: {
    queryString(newValue, oldValue) {
      console.log('Query Map - Payload: ', newValue, oldValue)
      this.searchCollections()
    },
    defaultCollection(newValue, oldValue) {
      console.log('DefaultCollection: ', newValue, oldValue)
      this.searchCollections()
    },
    $route(to, from) {
      console.log('DataTable(to, from): ', to, from)
      this.saveCurrentDataSet()
    }
  },
  computed: {
    ...mapGetters({
      queryString: 'queryString',
      defaultCollection: 'defaultCollection'
    }),
    selectedRowKeys() {
      return this.$store.getters.selectedRowKeys
    },
    recordCounts() {
      return this.$store.getters.currentDataSet.length
    },
    hasSelected() {
      return this.selectedRowKeys.length > 0
    },
    filteredColumns() {
      return filter(this.columns, record => {
        return record.title.indexOf(this.filterValue) >= 0
      })
    },
    visibleColumns() {
      return filter(this.columns, record => {
        return record.visible === true
      })
    },
    first() {
      return (this.pagination.current - 1) * this.pagination.pageSize + 1
    },
    last() {
      return this.pagination.current * this.pagination.pageSize
    },
    total() {
      return this.pagination.total
    },
    pageSize() {
      return this.pagination.pageSize
    },
    allowDownload() {
      if (this.total <= 10000) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations({
      set_page: 'SET_PAGE'
    }),
    ...mapActions({
      getCollections: 'GetCollections',
      saveCurrentDataSet: 'SaveCurrentDataSet'
    }),
    redirectToRecord(path) {
      this.$router.push({
        name: 'record-viewer',
        query: {
          recordId: path,
          project: this.defaultCollection
        }
      })
    },
    switchCartTable() {
      this.cartTableActive = !this.cartTableActive
    },
    onSelectAll(selected, selectedRows, changeRows) {
      console.log('onSelectAll: ', selected, selectedRows, changeRows)
      if (selected) {
        this.$store.commit('PUSH_RECORDS', changeRows)
        this.$message.success(`Added ${changeRows.length} Records to the Currect Dataset.`, 3)
      } else {
        this.$store.commit('POP_RECORDS', changeRows)
        this.$message.warn(`Removed ${changeRows.length} Records from the Current Dataset.`, 3)        
      }
      this.saveCurrentDataSet()
    },
    onSelectRecord(record, selected, selectedRows) {
      console.log('onSelectRecord: ', record, selected, selectedRows)
      if (selected) {
        this.$store.commit('PUSH_RECORD', record)
        this.$message.success(`Added ${record.key} to the Current Dataset.`, 3)
      } else {
        this.$store.commit('POP_RECORD', record)
        this.$message.warn(`Removed ${record.key} from the Current Dataset.`, 3)
      }
      this.saveCurrentDataSet()
    },
    onSearch(e) {
      this.filterValue = e.target.value
    },
    onSelectColumn(value, event) {
      console.log('onSelectColumn: ', value, event)
      map(this.columns, record => {
        if (record.title === value) {
          record.visible = event.target.checked
        }
      })
    },
    showSortMenu() {},
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      // this.selectedRowKeys = selectedRowKeys
    },
    removeFields(fields, exclude) {
      return fields.filter(x => !exclude.includes(x));
    },
    resetPage() {
      this.set_page({
        page: 1,
        per_page: this.pageSize
      })
    },
    setTotal() {
      this.set_page({
        page: 1,
        per_page: this.total
      })
    },
    downloadAsJSON() {
      this.$message.success('Downloading..., Please don\'t refresh the page.')
      if (this.allowDownload) {
        this.setTotal()
        this.searchCollections(data => {
          downloadAsJSON(data, 'downloadAnchorElem')

          this.resetPage()
        }, true)
      } else {
        this.$message.warn('Please filter before downloading (No more than 10000 records are supported).')
      }
    },
    downloadAsCSV() {
      if (this.allowDownload) {
        this.setTotal()
        this.searchCollections(data => {
          downloadAsCSV(data, 'downloadAnchorElem', ['_id'])

          this.resetPage()
        }, true)
      } else {
        this.$message.warn('Please filter before downloading (No more than 100 records are supported).')
      }
    },
    searchCollections(callback, disableFormat) {
      this.loading = true
      const formatMode = disableFormat ? false : true
      this.getCollections({ formatMode: formatMode })
        .then(response => {
          if (callback) {
            callback(response.data)
          } else {
            this.data = response.data
            this.pagination.total = response.total
            this.pagination.current = response.page
            this.pagination.pageSize = response.pageSize
          }

          setTimeout(() => {
            this.loading = false
          }, 300)
        })
        .catch(error => {
          this.$message.warn('Cannot fetch data, please retry later.')
          console.log('searchCollections Error: ', error)
          this.loading = false
        })
    }
  },
  mounted() {
    // TODO: Remove the code? No need to save for a period of time
    // setTimeout(() => {
    //   this.saveCurrentDataSet()
    // }, 6000)
  },
  created() {
    this.searchCollections()
  }
}
</script>

<style lang="less" scoped>
.table-operations {
  margin-bottom: 5px;
  height: 35px;

  .ant-col {
    height: 100%;

    .header-info {
      font-weight: 500;
      width: 100%;
      text-align: right;
      line-height: 2;
      height: 100%;
    }
  }

  button {
    margin-right: 8px;
  }
}
</style>

<style lang="less">
.column-list {
  display: flex;
  flex-direction: column;

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px;
  }
}

.dataset-panel {
  .ant-drawer-body {
    padding: 0px;
  }
}
</style>
