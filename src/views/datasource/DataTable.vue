<template>
  <a-row>
    <a-row class="table-operations">
      <a-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
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
          <a-button @click="showMenu">
            <a-icon type="menu" />
          </a-button>
        </a-popover>
        <a-button @click="showSortMenu">
          <a-icon type="sort-ascending" />
        </a-button>
        <a-button @click="downloadAsJSON">JSON</a-button>
        <a-button @click="downloadAsCSV">CSV</a-button>
      </a-col>
      <a-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
        <p class="header-info">Showing {{ first }} - {{ last }} of {{ total }} files</p>
      </a-col>
    </a-row>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="visibleColumns"
      :pagination="pagination"
      :dataSource="data"
      :loading="loading"
      :scroll="{ x: 1000, y: 780 }"
      @change="handleChange"
    />
  </a-row>
</template>

<script>
import filter from 'lodash.filter'
import map from 'lodash.map'
import { mapActions } from 'vuex'

const columns = [
  {
    title: 'Access',
    dataIndex: 'access',
    key: 'access',
    align: 'center',
    visible: false,
    width: 80
  },
  {
    title: 'File Name',
    dataIndex: 'fileName',
    key: 'fileName',
    align: 'center',
    visible: true,
    width: 200
  },
  {
    title: 'Library',
    dataIndex: 'library',
    key: 'library',
    align: 'center',
    visible: true,
    width: 100
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    align: 'center',
    visible: true,
    width: 100
  },
  {
    title: 'Data Category',
    dataIndex: 'dataCategory',
    key: 'dataCategory',
    align: 'center',
    visible: true,
    width: 150
  },
  {
    title: 'Data Format',
    dataIndex: 'dataFormat',
    key: 'dataFormat',
    align: 'center',
    visible: true,
    width: 150
  },
  {
    title: 'File Size',
    dataIndex: 'fileSize',
    key: 'fileSize',
    align: 'center',
    visible: true,
    width: 150
  },
  {
    title: 'Annotations',
    dataIndex: 'annotations',
    key: 'annotations',
    align: 'center',
    visible: false,
    width: 150
  }
]

export default {
  props: {
    queryMap: {
      required: false,
      default: () => Object(),
      type: Object
    },
    queryMapString: {
      required: false,
      default: '',
      type: String
    }
  },
  data() {
    return {
      data: [],
      filterValue: '',
      loading: false,
      menuVisible: false,
      selectedRowKeys: [],
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
          const queryMap = Object.assign(this.queryMap, {
            page: page,
            per_page: pageSize
          })
          this.searchCollections(queryMap)
        },
        onShowSizeChange: (current, pageSize) => {
          const queryMap = Object.assign(this.queryMap, {
            page: 1,
            per_page: pageSize
          })
          this.searchCollections(queryMap)
        }
      }
    }
  },
  computed: {
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
    }
  },
  watch: {
    queryMapString: function(newVal, oldVal) {
      console.log('queryMap Changed: ', newVal, oldVal)
      this.searchCollections(this.queryMap)
    }
  },
  methods: {
    ...mapActions({
      getCollections: 'GetCollections'
    }),
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
    showMenu() {},
    showSortMenu() {},
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleChange(pagination, filters, sorter) {},
    downloadAsJSON() {},
    downloadAsCSV() {},
    setAgeSort() {},
    searchCollections(queryMap) {
      this.loading = true
      this.getCollections(queryMap)
        .then(response => {
          this.data = response.data
          this.pagination.total = response.total
          this.pagination.current = response.page
          this.pagination.pageSize = response.pageSize
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
  created() {
    this.searchCollections(this.queryMap)
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
</style>
